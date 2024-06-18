/*// src/ChatBot.js
import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import CSS file for styling

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (text) => {
    const newMessage = { sender: "user", text };
  
    // Update messages state with user message
    setMessages(prevMessages => [...prevMessages, newMessage]);
  
    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: "user",
        message: text
      });
  
      // Map bot responses to messages format and update state
      const botMessages = response.data.map((res) => ({ sender: "bot", text: res.text }));
      setMessages(prevMessages => [...prevMessages, ...botMessages]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>Chat with Rasa</h1>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-send-btn">Send</button>
      </form>
    </div>
  );
}

export default ChatBot;
*/

import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import CSS file for styling

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (text) => {
    const newMessage = { sender: "user", text };

    // Update messages state with user message
    setMessages(prevMessages => [...prevMessages, newMessage]);

    try {
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: "user",
        message: text
      });

      if (response.data && response.data.length > 0) {
        // Map bot responses to messages format and update state
        const botMessages = response.data.map((res) => ({ sender: "bot", text: res.text }));
        setMessages(prevMessages => [...prevMessages, ...botMessages]);
      } else {
        console.warn("No response from the bot.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      sendMessage(input.trim());
      setInput("");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Chat with Us</h2>
      </div>
      <div className="chatbot-messages">
        <div className="message-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-send-btn">Send</button>
      </form>
    </div>
  );
}

export default ChatBot;
