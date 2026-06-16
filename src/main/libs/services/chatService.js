import { adminUrl } from '../data/baseUrls';

const pollers = new Set();
const sessionState = {
  viewerId: '',
  viewerRole: 'Admin',
};

// Initialize chat session context
export const initializeSocket = (userId, viewerRole = 'Admin') => {
  sessionState.viewerId = userId || '';
  sessionState.viewerRole = viewerRole || 'Admin';
  return { connected: true };
};

// Fetch all chats for admin or agent
export const fetchChats = async (options = {}) => {
  try {
    const viewerId = options.viewerId || sessionState.viewerId || '';
    const viewerRole = options.viewerRole || sessionState.viewerRole || 'Admin';
    const params = new URLSearchParams();

    if (viewerId) {
      params.set('viewerId', viewerId);
    }
    if (viewerRole) {
      params.set('viewerRole', viewerRole);
    }

    const response = await fetch(`${adminUrl}chats?${params.toString()}`);
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
export const sendMessage = async (chatIdOrPayload, message) => {
  try {
    const chatId =
      typeof chatIdOrPayload === 'string' ? chatIdOrPayload : chatIdOrPayload?.chatId;
    const text =
      typeof chatIdOrPayload === 'string' ? message : chatIdOrPayload?.text;
    const senderId =
      typeof chatIdOrPayload === 'string'
        ? sessionState.viewerId
        : chatIdOrPayload?.senderId || sessionState.viewerId;
    const senderRole =
      sessionState.viewerRole === 'Agent' ? 'agent' : 'admin';

    const response = await fetch(`${adminUrl}chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        senderId,
        senderRole,
      }),
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

// Listen for new messages using polling fallback
export const subscribeToNewMessages = (chatId, callback) => {
  let initialized = false;
  const seenMessageIds = new Set();

  const pollMessages = async () => {
    try {
      const response = await fetchMessages(chatId);
      if (!response.success) {
        return;
      }

      if (!initialized) {
        response.data.forEach((message) => seenMessageIds.add(message.id));
        initialized = true;
        return;
      }

      response.data.forEach((message) => {
        if (!seenMessageIds.has(message.id)) {
          seenMessageIds.add(message.id);
          callback(message);
        }
      });
    } catch {}
  };

  const intervalId = setInterval(pollMessages, 5000);
  pollers.add(intervalId);
  pollMessages();

  return () => {
    clearInterval(intervalId);
    pollers.delete(intervalId);
  };
};

// Listen for new chats using polling fallback
export const subscribeToNewChats = (callback) => {
  let initialized = false;
  const seenChatIds = new Set();

  const pollChats = async () => {
    try {
      const response = await fetchChats();
      if (!response.success) {
        return;
      }

      if (!initialized) {
        response.data.forEach((chat) => seenChatIds.add(chat.id));
        initialized = true;
        return;
      }

      response.data.forEach((chat) => {
        if (!seenChatIds.has(chat.id)) {
          seenChatIds.add(chat.id);
          callback(chat);
        }
      });
    } catch {}
  };

  const intervalId = setInterval(pollChats, 8000);
  pollers.add(intervalId);
  pollChats();

  return () => {
    clearInterval(intervalId);
    pollers.delete(intervalId);
  };
};

// Close polling subscriptions
export const closeSocket = () => {
  pollers.forEach((intervalId) => clearInterval(intervalId));
  pollers.clear();
};

// Create a new chat request from client
export const createLiveChatRequest = async (propertyId, clientInfo) => {
  try {
    const requestUrl = `${adminUrl}chats/request`;

    const response = await fetch(requestUrl, {
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
  return { connected: true, mode: 'polling' };
};

// Emit live chat request event
export const emitLiveChatRequest = (requestData) => {
  return requestData;
};

// Listen for agent response to live chat request
export const subscribeToAgentResponse = (callback) => {
  return () => callback;
};
