import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../../../libs/contexts/adminContext';
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
  const { adminData } = useContext(AdminContext);
  
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
    if (adminData && adminData.user && adminData.user._id) {
      try {
        // Initialize socket with admin ID
        initializeSocket(adminData.user._id, 'Admin');
        
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
  }, [adminData]);
  
  // Fetch chats from API
  useEffect(() => {
    const loadChats = async () => {
      try {
        setIsLoading(true);
        const response = await fetchChats({
          viewerId: adminData?.user?._id,
          viewerRole: 'Admin',
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
  }, [adminData]);

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
            
            // Update unread count in chat list
            setChats(prevChats => {
              return prevChats.map(chat => {
                if (chat.id === activeChat.id) {
                  return { ...chat, unreadCount: 0 };
                }
                return chat;
              });
            });
          } else {
            setError(response.message || 'Failed to load messages');
          }
        } catch (error) {
          console.error('Error loading messages:', error);
          setError('Failed to load messages');
        } finally {
          setIsLoading(false);
          
          // Scroll to bottom of messages
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      
      loadMessages();
      
      // Subscribe to new messages for this chat
      socketCleanupRef.current = subscribeToNewMessages(activeChat.id, (newMsg) => {
        setMessages(prevMessages => [...prevMessages, newMsg]);
        
        // Scroll to bottom when new message arrives
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
    
    return () => {
      if (socketCleanupRef.current) {
        socketCleanupRef.current();
      }
    };
  }, [activeChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeChat) {
      return;
    }
    
    try {
      // Optimistically add message to UI
      const tempMessage = {
        id: `temp-${Date.now()}`,
        text: newMessage,
        sender: {
          id: adminData.user._id,
          name: `${adminData.user.firstName} ${adminData.user.lastName}`,
          role: 'admin'
        },
        timestamp: new Date().toISOString(),
        status: 'sending'
      };
      
      setMessages(prevMessages => [...prevMessages, tempMessage]);
      setNewMessage('');
      
      // Send message to server
      const response = await sendMessage(activeChat.id, newMessage);
      
      if (response.success) {
        // Replace temp message with actual message from server
        setMessages(prevMessages => {
          return prevMessages.map(msg => {
            if (msg.id === tempMessage.id) {
              return response.data;
            }
            return msg;
          });
        });
      } else {
        // Mark message as failed
        setMessages(prevMessages => {
          return prevMessages.map(msg => {
            if (msg.id === tempMessage.id) {
              return { ...msg, status: 'failed' };
            }
            return msg;
          });
        });
        toast.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  // Filter chats based on search term
  const filteredChats = chats.filter(chat => {
    return chat.user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
                    <div className="input-group-prepend">
                      <span className="input-group-text"><i className="fa fa-search"></i></span>
                    </div>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Search clients..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="chat-list-container">
                    {isLoading && !activeChat ? (
                      <div className="text-center p-3">
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : error && !activeChat ? (
                      <div className="alert alert-danger">{error}</div>
                    ) : filteredChats.length === 0 ? (
                      <div className="text-center p-3">
                        <p>No chats found</p>
                      </div>
                    ) : (
                      <ul className="list-unstyled chat-list mt-2 mb-0">
                        {filteredChats.map(chat => (
                          <li 
                            key={chat.id} 
                            className={`clearfix ${activeChat && activeChat.id === chat.id ? 'active' : ''}`}
                            onClick={() => setActiveChat(chat)}
                          >
                            <img src={chat.user.avatar || 'https://via.placeholder.com/50'} alt="avatar" />
                            <div className="about">
                              <div className="name">{chat.user.name}</div>
                              <div className="status">
                                <i className={`fa fa-circle ${chat.user.online ? 'online' : 'offline'}`}></i>
                                {chat.user.online ? 'Online' : 'Offline'}
                                {chat.unreadCount > 0 && (
                                  <span className="badge badge-pill badge-primary ml-2">{chat.unreadCount}</span>
                                )}
                              </div>
                            </div>
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
                      <p>Choose a client from the list to view conversation history and respond to inquiries.</p>
                    </div>
                  ) : (
                    <>
                      <div className="chat-header clearfix">
                        <div className="row">
                          <div className="col-lg-6">
                            <img src={activeChat.user.avatar || 'https://via.placeholder.com/50'} alt="avatar" />
                            <div className="chat-about">
                              <h6 className="m-b-0">{activeChat.user.name}</h6>
                              <small>
                                <i className={`fa fa-circle ${activeChat.user.online ? 'text-success' : 'text-secondary'}`}></i>
                                {activeChat.user.online ? 'Online' : 'Last seen: ' + new Date(activeChat.user.lastSeen).toLocaleString()}
                              </small>
                            </div>
                          </div>
                          <div className="col-lg-6 hidden-sm text-right">
                            <button className="btn btn-outline-secondary">
                              <i className="fa fa-phone"></i>
                            </button>
                            <button className="btn btn-outline-primary ml-2">
                              <i className="fa fa-info-circle"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="chat-history">
                        {isLoading ? (
                          <div className="text-center p-3">
                            <div className="spinner-border text-primary" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : error ? (
                          <div className="alert alert-danger">{error}</div>
                        ) : messages.length === 0 ? (
                          <div className="text-center p-3">
                            <p>No messages yet</p>
                          </div>
                        ) : (
                          <ul className="m-b-0">
                            {messages.map(message => {
                              const isAdmin = message.sender.role === 'admin';
                              return (
                                <li className="clearfix" key={message.id}>
                                  <div className={`message-data ${isAdmin ? 'text-right' : ''}`}>
                                    <span className="message-data-time">{new Date(message.timestamp).toLocaleString()}</span>
                                    {!isAdmin && (
                                      <img src={activeChat.user.avatar || 'https://via.placeholder.com/50'} alt="avatar" />
                                    )}
                                  </div>
                                  <div className={`message ${isAdmin ? 'my-message float-right' : 'other-message'}`}>
                                    {message.text}
                                    {message.status === 'sending' && (
                                      <small className="text-muted ml-2">
                                        <i className="fa fa-clock-o"></i> Sending...
                                      </small>
                                    )}
                                    {message.status === 'failed' && (
                                      <small className="text-danger ml-2">
                                        <i className="fa fa-exclamation-circle"></i> Failed to send
                                      </small>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                            <div ref={messagesEndRef} />
                          </ul>
                        )}
                      </div>
                      
                      <div className="chat-message clearfix">
                        <form onSubmit={handleSendMessage}>
                          <div className="input-group mb-0">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fa fa-send"></i>
                              </span>
                            </div>
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
                                className="btn btn-primary" 
                                disabled={!newMessage.trim() || isLoading}
                              >
                                Send
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
