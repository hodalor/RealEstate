import React, { useState, useRef, useEffect } from 'react';
import { initializeClientSocket, createLiveChatRequest, emitLiveChatRequest, subscribeToAgentResponse } from '../../../libs/services/chatService';

export default function ChatAgentModal({ property }) {
  const [messages, setMessages] = useState([
    { sender: 'agent', text: 'Hello! I\'m the agent for this property. How can I help you today?', time: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [waitingForAgent, setWaitingForAgent] = useState(false);
  const [liveChatRequested, setLiveChatRequested] = useState(false);
  const messagesEndRef = useRef(null);
  const socketCleanupRef = useRef(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Cleanup socket connection when component unmounts
  useEffect(() => {
    return () => {
      if (socketCleanupRef.current) {
        socketCleanupRef.current();
        socketCleanupRef.current = null;
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle live chat request button click
  const handleLiveChatRequest = async () => {
    try {
      setWaitingForAgent(true);
      
      // Add system message to chat
      const systemMessage = { 
        sender: 'agent', 
        text: 'Live chat requested. Please wait while we connect you with an available agent...', 
        time: new Date() 
      };
      setMessages(prev => [...prev, systemMessage]);
      
      // Initialize socket connection
      const socket = initializeClientSocket();
      
      // Create client info object
      const clientInfo = {
        propertyId: property?._id,
        propertyName: property?.name,
        timestamp: new Date().toISOString()
      };
      
      // Create live chat request in the database
      const response = await createLiveChatRequest(property?._id, clientInfo);
      
      if (response.success) {
        // Emit live chat request event to notify agents
        emitLiveChatRequest({
          requestId: response.data.requestId,
          propertyId: property?._id,
          propertyName: property?.name,
          timestamp: new Date().toISOString()
        });
        
        // Subscribe to agent response
        socketCleanupRef.current = subscribeToAgentResponse((response) => {
          if (response.status === 'accepted') {
            // Add system message that agent has accepted the chat
            const acceptedMessage = { 
              sender: 'agent', 
              text: `${response.agentName || 'An agent'} has accepted your chat request and will be with you shortly.`, 
              time: new Date() 
            };
            setMessages(prev => [...prev, acceptedMessage]);
            setWaitingForAgent(false);
            setLiveChatRequested(true);
          } else if (response.status === 'rejected') {
            // Add system message that no agents are available
            const rejectedMessage = { 
              sender: 'agent', 
              text: 'We apologize, but all agents are currently busy. Please try again later or leave a message.', 
              time: new Date() 
            };
            setMessages(prev => [...prev, rejectedMessage]);
            setWaitingForAgent(false);
          }
        });
        
        // Set live chat requested flag
        setLiveChatRequested(true);
      } else {
        throw new Error(response.message || 'Failed to create live chat request');
      }
    } catch (error) {
      console.error('Error requesting live chat:', error);
      
      // Add error message to chat
      const errorMessage = { 
        sender: 'agent', 
        text: 'There was an error connecting to the live chat. Please try again later.', 
        time: new Date() 
      };
      setMessages(prev => [...prev, errorMessage]);
      
      // Reset states
      setWaitingForAgent(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = { sender: 'user', text: newMessage, time: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setLoading(true);

    // Simulate agent response after a delay
    setTimeout(() => {
      // Generate a simple automated response
      let responseText = '';
      
      // Check for property features and amenities keywords
      if (newMessage.toLowerCase().includes('price') || newMessage.toLowerCase().includes('cost')) {
        responseText = `The price for ${property?.name} is GHC ${property?.price}. This is ${property?.rentOrSale === 'Rent' ? 'per month' : 'for purchase'}. Is there anything specific about the pricing you'd like to know?`;
      } else if (newMessage.toLowerCase().includes('location') || newMessage.toLowerCase().includes('address')) {
        responseText = `This property is located at ${property?.digitalAddress || 'a prime location'}. It's in a great neighborhood with access to amenities.`;
      } else if (newMessage.toLowerCase().includes('country') || newMessage.toLowerCase().includes('ghana')) {
        responseText = `This property is located in ${property?.country || 'Ghana'}. Would you like more specific location details?`;
      } else if (newMessage.toLowerCase().includes('province') || newMessage.toLowerCase().includes('region')) {
        responseText = `This property is in the ${property?.province || 'Greater Accra'} region. It's a great area with excellent infrastructure and amenities.`;
      } else if (newMessage.toLowerCase().includes('city') || newMessage.toLowerCase().includes('town')) {
        responseText = `The property is located in ${property?.city || 'Accra'}, which is a vibrant city with many attractions and conveniences.`;
      } else if (newMessage.toLowerCase().includes('wi-fi') || newMessage.toLowerCase().includes('internet') || newMessage.toLowerCase().includes('wifi')) {
        responseText = `${property?.amenities?.internet ? 'Yes, this property has internet/Wi-Fi connectivity.' : 'This property does not currently have internet installed, but the area has good coverage and it can be easily set up.'}`;
      } else if (newMessage.toLowerCase().includes('air condition') || newMessage.toLowerCase().includes('ac') || newMessage.toLowerCase().includes('air-con')) {
        responseText = `${property?.amenities?.airCondition ? 'Yes, this property has air conditioning installed.' : 'This property does not have air conditioning installed, but it has good ventilation and ceiling fans.'}`;
      } else if (newMessage.toLowerCase().includes('swimming') || newMessage.toLowerCase().includes('pool')) {
        responseText = `${property?.amenities?.swimmingPool ? 'Yes, this property features a swimming pool.' : 'This property does not have a swimming pool.'}`;
      } else if (newMessage.toLowerCase().includes('water') || newMessage.toLowerCase().includes('pipe')) {
        responseText = `${property?.amenities?.pipeWater ? 'Yes, this property has pipe-borne water supply.' : 'The property relies on water tanks and delivery services for water supply.'}`;
      } else if (newMessage.toLowerCase().includes('electricity') || newMessage.toLowerCase().includes('power')) {
        responseText = `${property?.amenities?.electricity ? 'Yes, the property has reliable electricity connection.' : 'The property has electricity connection but backup power might be needed occasionally.'}`;
      } else if (newMessage.toLowerCase().includes('security') || newMessage.toLowerCase().includes('safe')) {
        responseText = `${property?.amenities?.securityPersonnel ? 'This property has security personnel.' : 'The property is in a secure neighborhood.'} ${property?.amenities?.securityCameras ? 'It also has security cameras installed.' : ''}`;
      } else if (newMessage.toLowerCase().includes('pet') || newMessage.toLowerCase().includes('dog') || newMessage.toLowerCase().includes('cat')) {
        responseText = `${property?.amenities?.petsAllowed ? 'Yes, pets are allowed in this property.' : 'Unfortunately, pets are not allowed in this property due to management policy.'}`;
      } else if (newMessage.toLowerCase().includes('bedroom') || newMessage.toLowerCase().includes('bed')) {
        responseText = `This property has ${property?.others?.noOfBedrooms || 'several'} bedrooms. ${property?.amenities?.masterBedroom ? 'It includes a master bedroom with en-suite bathroom.' : ''}`;
      } else if (newMessage.toLowerCase().includes('bathroom') || newMessage.toLowerCase().includes('bath') || newMessage.toLowerCase().includes('toilet')) {
        responseText = `The property has ${property?.others?.bathrooms || 'modern'} bathrooms with good fixtures and fittings.`;
      } else if (newMessage.toLowerCase().includes('kitchen')) {
        responseText = `${property?.amenities?.kitchen ? 'Yes, the property has a well-equipped kitchen.' : 'The property has a basic kitchen area that can be upgraded as needed.'}`;
      } else if (newMessage.toLowerCase().includes('available') || newMessage.toLowerCase().includes('when')) {
        responseText = `This property is currently available. We can arrange a viewing at your convenience.`;
      } else if (newMessage.toLowerCase().includes('tour') || newMessage.toLowerCase().includes('visit')) {
        responseText = `I'd be happy to arrange a tour for you. You can also use the "Book a Tour" button to schedule a specific date and time.`;
      } else {
        responseText = `Thank you for your interest in ${property?.name}. I'd be happy to answer any other questions you have about this property.`;
      }
      
      const agentMessage = { sender: 'agent', text: responseText, time: new Date() };
      setMessages(prev => [...prev, agentMessage]);
      setLoading(false);
    }, 1000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="modal fade" id="chatAgentModal" tabIndex="-1" aria-labelledby="chatAgentModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title" id="chatAgentModalLabel">
              <i className="fa fa-comments me-2"></i> Chat with Agent
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body p-0">
            <div className="chat-header bg-light p-3 border-bottom">
              <div className="d-flex align-items-center">
                <div className="avatar me-3">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                    <i className="fa fa-user"></i>
                  </div>
                </div>
                <div>
                  <h6 className="mb-0">Property Agent</h6>
                  <small className="text-muted">Online | Typically replies within minutes</small>
                </div>
              </div>
            </div>
            
            <div className="chat-messages p-3" style={{ height: '300px', overflowY: 'auto' }}>
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'user' ? 'user-message text-end' : 'agent-message'} mb-3`}>
                  <div className={`message-content ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-light'} d-inline-block p-2 px-3 rounded-3 ${msg.sender === 'user' ? 'ms-auto' : 'me-auto'}`} style={{ maxWidth: '80%' }}>
                    {msg.text}
                  </div>
                  <div className="message-time small text-muted mt-1">
                    {formatTime(msg.time)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="agent-message mb-3">
                  <div className="message-content bg-light d-inline-block p-2 px-3 rounded-3">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="chat-input border-top p-3">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Type your message..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className="btn btn-info" 
                  disabled={!newMessage.trim() || loading}
                >
                  <i className="fa fa-paper-plane"></i>
                </button>
              
              </div>
              <button 
                type="button"
                onClick={handleLiveChatRequest} 
                disabled={waitingForAgent || liveChatRequested}
                style={{width:"40%", marginLeft:"25%", borderRadius:"5px", backgroundColor:"#fd2658", border:"none", color:"white"}}
              >
                {waitingForAgent ? 'Waiting for agent...' : liveChatRequested ? 'Live chat requested' : 'Request a live chat'}
              </button>
            </form>
          </div>
          <div className="modal-footer bg-light">
            <small className="text-muted w-100 text-center">
              This is a simulated chat for demonstration purposes. In a production environment, this would connect to a real agent or chat system.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}