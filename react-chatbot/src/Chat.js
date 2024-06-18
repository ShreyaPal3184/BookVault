import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      // Update messages state with user message
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      // Send message to Rasa
      const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
        sender: 'user',
        message: input
      });

      // Update messages state with bot response
      const botMessage = { text: response.data[0].text, sender: 'bot' };
      setMessages([...messages, botMessage]);

      // Clear input field
      setInput('');
    } catch (error) {
      console.error('Error sending message to Rasa:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.sender}>
            {message.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
