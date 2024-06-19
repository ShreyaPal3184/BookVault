// src/ChatComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);

  const sendMessageToChatGPT = async (message) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          max_tokens: 150
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
          }
        }
      );
      handleChatGPTResponse(response.data.choices[0].message.content.trim());
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error('Error from OpenAI:', error.response.data.error.message);
        setMessages((prevMessages) => [...prevMessages, { text: `ChatGPT Error: ${error.response.data.error.message}`, type: 'bot' }]);
      } else {
        console.error('Error sending message to ChatGPT:', error);
      }
    }
  };

  const handleChatGPTResponse = (chatGPTResponse) => {
    setMessages((prevMessages) => [...prevMessages, { text: `ChatGPT: ${chatGPTResponse}`, type: 'bot' }]);
  };

  const handleUserMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: `You: ${message}`, type: 'user' }]);
    sendMessageToChatGPT(message);
  };

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUserMessage(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
    </div>
  );
};

export default ChatComponent;
