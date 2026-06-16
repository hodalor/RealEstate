import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { AgentsContext } from '../../../../libs/contexts/agentsContext';
import { AuthContext } from '../../../../libs/contexts/authContext';
import { toast } from 'react-toastify';
import {
  initializeSocket,
  fetchChats,
  fetchMessages,
  sendMessage,
  markChatAsRead,
  subscribeToNewMessages,
  subscribeToNewChats,
  closeSocket
} from '../../../../libs/services/chatService';

export default function LiveChat() {
  const { loading } = useContext(AuthContext);
  const { agentState } = useContext(AgentsContext);
  
  // State for chat data
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const socketCleanupRef = useRef(null);

  // Initialize socket connection when component mounts
  useEffect(() => {
    if (agentState && agentState.agent && agentState.agent._id) {
      try {
        // Initialize socket with agent ID
        initializeSocket(agentState.agent._id, 'Agent');
        
        // Subscribe to new chats
        const newChatCleanup = subscribeToNewChats((newChat) => {
          setChats(prevChats => {
            // Check if chat already exists
            const exists = prevChats.some(chat => chat.id === newChat.id);
            if (!exists) {
              return [newChat, ...prevChats];
            }
            return prevChats;
          });
          
          toast.info(`New message from ${newChat.user.name}`);
        });
        
        // Cleanup function
        return () => {
          if (newChatCleanup) newChatCleanup();
          if (socketCleanupRef.current) socketCleanupRef.current();
          closeSocket();
        };
      } catch (error) {
        console.error('Socket initialization error:', error);
        setError('Failed to connect to chat server');
      }
    }
  }, [agentState]);
  
  // Fetch chats from API
  useEffect(() => {
    const loadChats = async () => {
      try {
        setIsLoading(true);
        const response = await fetchChats({
          viewerId: agentState?.agent?._id,
          viewerRole: 'Agent',
        });
        if (response.success) {
          setChats(response.data);
        } else {
          setError(response.message || 'Failed to load chats');
        }
      } catch (error) {
        console.error('Error loading chats:', error);
        setError('Failed to load chats. Please try again later.');
        toast.error('Failed to load chats');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadChats();
  }, [agentState]);

  // Fetch messages when active chat changes
  useEffect(() => {
    if (activeChat) {
      setIsLoading(true);
      setError(null);
      
      // Clean up previous subscription
      if (socketCleanupRef.current) {
        socketCleanupRef.current();
      }
      
      const loadMessages = async () => {
        try {
          const response = await fetchMessages(activeChat.id);
          if (response.success) {
            setMessages(response.data);
            
            // Mark chat as read
            await markChatAsRead(activeChat.id);
            
            // Subscribe to new messages for this chat
            socketCleanupRef.current = subscribeToNewMessages(activeChat.id, (newMsg) => {
              setMessages(prevMsgs => [...prevMsgs, newMsg]);
              scrollToBottom();
            });
            
          } else {
            setError(response.message || 'Failed to load messages');
          }
        } catch (error) {
          console.error('Error loading messages:', error);
          setError('Failed to load messages. Please try again later.');
        } finally {
          setIsLoading(false);
          scrollToBottom();
        }
      };
      
      loadMessages();
    }
  }, [activeChat]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;
    
    try {
      const messageData = {
        chatId: activeChat.id,
        senderId: agentState.agent._id,
        text: newMessage,
        timestamp: new Date().toISOString()
      };
      
      // Optimistically add message to UI
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');
      scrollToBottom();
      
      // Send to server
      const response = await sendMessage(messageData);
      if (!response.success) {
        toast.error('Failed to send message');
        // Could remove the optimistic message here if needed
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => 
    chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (chat.lastMessage?.text &&
      chat.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for message groups
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <div className="row clearfix">
      <div className="col-lg-12">
        <div className="card">
          <div className="header">
            <h2><strong>Live</strong> Chat</h2>
          </div>
          <div className="body">
            <div className="chat-app">
              <div className="row">
                {/* Chat List */}
                <div className="col-lg-4 col-md-4 chat-list">
                  <div className="input-group mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search chats..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text"><i className="fa fa-search"></i></span>
                    </div>
                  </div>
                  
                  <div className="chat-list-container">
                    {isLoading && !activeChat ? (
                      <div className="text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : error && !activeChat ? (
                      <div className="alert alert-danger">{error}</div>
                    ) : filteredChats.length === 0 ? (
                      <div className="text-center p-5">
                        <p>No chats found</p>
                      </div>
                    ) : (
                      <ul className="list-unstyled chat-list">
                        {filteredChats.map((chat) => (
                          <li 
                            key={chat.id} 
                            className={`clearfix ${activeChat && activeChat.id === chat.id ? 'active' : ''}`}
                            onClick={() => setActiveChat(chat)}
                          >
                            <img 
                              src={chat.user.avatar || '../assets/images/user.png'} 
                              alt="avatar" 
                            />
                            <div className="about">
                              <div className="name">{chat.user.name}</div>
                              <div className="status">
                                {chat.lastMessage?.text && (
                                  <span>
                                    {chat.lastMessage.text.substring(0, 20)}
                                    {chat.lastMessage.text.length > 20 ? '...' : ''}
                                  </span>
                                )}
                                {chat.lastMessageTime && (
                                  <small className="float-right">{formatTime(chat.lastMessageTime)}</small>
                                )}
                              </div>
                            </div>
                            {chat.unreadCount > 0 && (
                              <div className="unread-badge">{chat.unreadCount}</div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                
                {/* Chat Content */}
                <div className="col-lg-8 col-md-8 chat-content">
                  {!activeChat ? (
                    <div className="text-center p-5">
                      <h4>Select a chat to start messaging</h4>
                    </div>
                  ) : (
                    <>
                      <div className="chat-header clearfix">
                        <div className="row">
                          <div className="col-lg-6">
                            <img 
                              src={activeChat.user.avatar || '../assets/images/user.png'} 
                              alt="avatar" 
                            />
                            <div className="chat-about">
                              <h6 className="m-b-0">{activeChat.user.name}</h6>
                              <small>{activeChat.user.isOnline ? 'Online' : 'Offline'}</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="chat-history">
                        {isLoading ? (
                          <div className="text-center p-5">
                            <div className="spinner-border text-primary" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : error ? (
                          <div className="alert alert-danger">{error}</div>
                        ) : messages.length === 0 ? (
                          <div className="text-center p-5">
                            <p>No messages yet</p>
                          </div>
                        ) : (
                          <ul className="m-b-0">
                            {messages.map((msg, index) => {
                              const isAgent = msg.senderId === agentState.agent._id;
                              const showDate = index === 0 || 
                                formatDate(messages[index-1].timestamp) !== formatDate(msg.timestamp);
                              
                              return (
                                <React.Fragment key={msg.id || index}>
                                  {showDate && (
                                    <li className="clearfix">
                                      <div className="message-data text-center">
                                        <span className="message-data-time">{formatDate(msg.timestamp)}</span>
                                      </div>
                                    </li>
                                  )}
                                  <li className={`clearfix ${isAgent ? 'float-right' : ''}`}>
                                    <div className={`message-data ${isAgent ? 'text-right' : ''}`}>
                                      <span className="message-data-time">{formatTime(msg.timestamp)}</span>
                                      <span className="message-data-name">{isAgent ? 'You' : activeChat.user.name}</span>
                                    </div>
                                    <div className={`message ${isAgent ? 'my-message float-right' : 'other-message'}`}>
                                      {msg.text}
                                    </div>
                                  </li>
                                </React.Fragment>
                              );
                            })}
                            <div ref={messagesEndRef} />
                          </ul>
                        )}
                      </div>
                      
                      <div className="chat-message clearfix">
                        <form onSubmit={handleSendMessage}>
                          <div className="input-group mb-0">
                            <input 
                              type="text" 
                              className="form-control" 
                              placeholder="Enter text here..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              disabled={isLoading}
                            />
                            <div className="input-group-append">
                              <button 
                                type="submit" 
                                className="input-group-text"
                                disabled={!newMessage.trim() || isLoading}
                              >
                                <i className="fa fa-paper-plane"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
