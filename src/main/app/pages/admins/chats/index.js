import React, { useState, useEffect, useRef } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../../../libs/contexts/adminContext';
import { AuthContext } from '../../../../libs/contexts/authContext';
import Loader from '../../../../components/loader';
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

export default function AdminChats() {
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
        initializeSocket(adminData.user._id);
        
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
        const response = await fetchChats();
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
  }, []);

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
          // Mark chat as read
          await markChatAsRead(activeChat.id);
          
          // Update unread count in chat list
          setChats(prevChats => {
            return prevChats.map(chat => {
              if (chat.id === activeChat.id) {
                return {
                  ...chat,
                  unreadCount: 0,
                  lastMessage: {
                    ...chat.lastMessage,
                    isRead: true
                  }
                };
              }
              return chat;
            });
          });
          
          // Fetch messages
          const response = await fetchMessages(activeChat.id);
          if (response.success) {
            setMessages(response.data);
          } else {
            setError(response.message || 'Failed to load messages');
          }
          
          // Subscribe to new messages for this chat
          socketCleanupRef.current = subscribeToNewMessages(activeChat.id, (newMessage) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
            
            // Update last message in chat list if it's not the active chat
            setChats(prevChats => {
              return prevChats.map(chat => {
                if (chat.id === activeChat.id) {
                  return {
                    ...chat,
                    lastMessage: {
                      text: newMessage.text,
                      time: newMessage.time,
                      isRead: true
                    }
                  };
                }
                return chat;
              });
            });
          });
          
        } catch (error) {
          console.error('Error loading messages:', error);
          setError('Failed to load messages. Please try again later.');
          toast.error('Failed to load messages');
        } finally {
          setIsLoading(false);
        }
      };
      
      loadMessages();
    } else {
      setMessages([]);
    }
    
    // Cleanup function
    return () => {
      if (socketCleanupRef.current) {
        socketCleanupRef.current();
        socketCleanupRef.current = null;
      }
    };
  }, [activeChat]);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    const messageText = newMessage.trim();
    setNewMessage(''); // Clear input immediately for better UX
    
    // Optimistically add message to UI
    const tempMsg = {
      id: `temp-${Date.now()}`,
      sender: 'admin',
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
      pending: true
    };

    setMessages(prevMessages => [...prevMessages, tempMsg]);
    
    try {
      // Send message to backend
      const response = await sendMessage(activeChat.id, messageText);
      
      if (response.success) {
        // Replace temp message with actual message from server
        setMessages(prevMessages => {
          return prevMessages.map(msg => {
            if (msg.id === tempMsg.id) {
              return response.data;
            }
            return msg;
          });
        });
        
        // Update the last message in the chat list
        setChats(prevChats => {
          return prevChats.map(chat => {
            if (chat.id === activeChat.id) {
              return {
                ...chat,
                lastMessage: {
                  text: messageText,
                  time: 'Just now',
                  isRead: true
                }
              };
            }
            return chat;
          });
        });
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove the temp message and show error
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== tempMsg.id));
      setNewMessage(messageText); // Restore the message text for retry
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleChatSelect = (chat) => {
    // Don't reload if it's the same chat
    if (activeChat && activeChat.id === chat.id) return;
    
    setActiveChat(chat);
  };

  const filteredChats = chats.filter(chat => 
    chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <div className="block-header">
        <div className="row">
          <div className="col-lg-5 col-md-8 col-sm-12">
            <h2><i className="fa fa-comments"></i> Client Communications</h2>
            <ul className="breadcrumb">
              <li className="breadcrumb-item"><a href="/admin"><i className="fa fa-dashboard"></i></a></li>
              <li className="breadcrumb-item active">Chats</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card">
            <div className="body">
              <div className="d-flex chat-app">
                {/* Chat List */}
                <div className="people-list" id="people-list">
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
                  
                  <ul className="list-unstyled chat-list">
                    {filteredChats.map(chat => (
                      <li 
                        key={chat.id} 
                        className={`clearfix ${activeChat?.id === chat.id ? 'active' : ''}`}
                        onClick={() => handleChatSelect(chat)}
                      >
                        <div className="d-flex align-items-center">
                          <div className="avatar mr-3 position-relative">
                            <img src={chat.user.avatar} alt={chat.user.name} className="rounded-circle" width="50" />
                            <span className={`status ${chat.user.status}`}></span>
                          </div>
                          <div className="about w-100">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="name">{chat.user.name}</div>
                              <div className="small text-muted">{chat.lastMessage.time}</div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="message text-truncate" style={{ maxWidth: '150px' }}>
                                {chat.lastMessage.text}
                              </div>
                              {chat.unreadCount > 0 && (
                                <span className="badge badge-pill badge-primary">{chat.unreadCount}</span>
                              )}
                            </div>
                            <div className="small text-muted text-truncate">
                              <i className="fa fa-home mr-1"></i> {chat.property.name}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chat Area */}
                <div className="chat">
                  {activeChat ? (
                    <>
                      <div className="chat-header clearfix">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="d-flex align-items-center">
                              <div className="avatar mr-3 position-relative">
                                <img src={activeChat.user.avatar} alt={activeChat.user.name} className="rounded-circle" width="50" />
                                <span className={`status ${activeChat.user.status}`}></span>
                              </div>
                              <div>
                                <h6 className="m-b-0">{activeChat.user.name}</h6>
                                <small className="text-muted">
                                  <i className="fa fa-envelope mr-1"></i> {activeChat.user.email}
                                </small>
                                <br />
                                <small className="text-muted">
                                  <i className="fa fa-home mr-1"></i> {activeChat.property.name}
                                </small>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 hidden-sm text-right">
                            <button className="btn btn-outline-secondary btn-sm mr-2">
                              <i className="fa fa-phone"></i>
                            </button>
                            <button className="btn btn-outline-primary btn-sm mr-2">
                              <i className="fa fa-video-camera"></i>
                            </button>
                            <button className="btn btn-outline-info btn-sm">
                              <i className="fa fa-info-circle"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="chat-history">
                        {isLoading ? (
                          <div className="d-flex justify-content-center align-items-center h-100">
                            <div className="spinner-border text-primary" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          </div>
                        ) : (
                          <ul className="list-unstyled m-b-0">
                            {messages.map(message => {
                              const isAdmin = message.sender === 'admin';
                              return (
                                <li className="clearfix" key={message.id}>
                                  <div className={`message-data ${isAdmin ? 'text-right' : ''}`}>
                                    <span className="message-data-time">{message.time}</span>
                                    <span className="message-data-name ml-1">
                                      {isAdmin ? 'You' : activeChat.user.name}
                                    </span>
                                  </div>
                                  <div className={`message ${isAdmin ? 'my-message float-right' : 'other-message'}`}>
                                    {message.text}
                                    {message.pending && (
                                      <small className="text-muted d-block mt-1">
                                        <i className="fa fa-clock-o mr-1"></i> Sending...
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
                            <textarea 
                              className="form-control" 
                              placeholder="Type your message..." 
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              rows="3"
                            ></textarea>
                            <div className="input-group-append">
                              <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={!newMessage.trim()}
                              >
                                <i className="fa fa-paper-plane"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center p-5">
                      <i className="fa fa-comments fa-4x text-muted mb-3"></i>
                      <h5>Select a chat to start messaging</h5>
                      <p className="text-muted">Choose a conversation from the list to view and respond to client messages.</p>
                    </div>
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