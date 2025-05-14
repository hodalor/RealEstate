import io from 'socket.io-client';
import { adminUrl } from '../data/baseUrls';

let socket;

// Initialize socket connection
export const initializeSocket = (userId) => {
  // Close any existing connections
  if (socket) {
    socket.close();
  }
  
  // Create new connection to chat server
  // Using the same base URL as other API endpoints
  const socketUrl = adminUrl.replace('/api/admin/', '');
  socket = io(socketUrl, {
    query: { userId }
  });
  
  socket.on('connect', () => {
    console.log('Socket connected');
  });
  
  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });
  
  return socket;
};

// Fetch all chats for an admin
export const fetchChats = async () => {
  try {
    const response = await fetch(`${adminUrl}chats`);
    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

// Fetch messages for a specific chat
export const fetchMessages = async (chatId) => {
  try {
    const response = await fetch(`${adminUrl}chats/${chatId}/messages`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (chatId, message) => {
  try {
    const response = await fetch(`${adminUrl}chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Mark chat as read
export const markChatAsRead = async (chatId) => {
  try {
    const response = await fetch(`${adminUrl}chats/${chatId}/read`, {
      method: 'PUT',
    });
    
    if (!response.ok) {
      throw new Error('Failed to mark chat as read');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error marking chat as read:', error);
    throw error;
  }
};

// Listen for new messages
export const subscribeToNewMessages = (chatId, callback) => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  
  // Join specific chat room
  socket.emit('join_chat', chatId);
  
  // Listen for new messages in this chat
  socket.on(`new_message_${chatId}`, (message) => {
    callback(message);
  });
  
  return () => {
    socket.off(`new_message_${chatId}`);
    socket.emit('leave_chat', chatId);
  };
};

// Listen for new chats
export const subscribeToNewChats = (callback) => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  
  socket.on('new_chat', (chat) => {
    callback(chat);
  });
  
  return () => {
    socket.off('new_chat');
  };
};

// Close socket connection
export const closeSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

// Create a new chat request from client
export const createLiveChatRequest = async (propertyId, clientInfo) => {
  try {
    const response = await fetch(`${adminUrl}chats/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        propertyId,
        clientInfo,
        requestType: 'liveChat',
        timestamp: new Date().toISOString()
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create live chat request');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating live chat request:', error);
    throw error;
  }
};

// Initialize client socket for live chat requests
export const initializeClientSocket = () => {
  // Close any existing connections
  if (socket) {
    socket.close();
  }
  
  // Create new connection to chat server
  const socketUrl = adminUrl.replace('/api/admin/', '');
  socket = io(socketUrl, {
    query: { isClient: true }
  });
  
  socket.on('connect', () => {
    console.log('Client socket connected');
  });
  
  socket.on('connect_error', (error) => {
    console.error('Client socket connection error:', error);
  });
  
  return socket;
};

// Emit live chat request event
export const emitLiveChatRequest = (requestData) => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  
  socket.emit('live_chat_request', requestData);
};

// Listen for agent response to live chat request
export const subscribeToAgentResponse = (callback) => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  
  socket.on('agent_response', (response) => {
    callback(response);
  });
  
  return () => {
    socket.off('agent_response');
  };
};