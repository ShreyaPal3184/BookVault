// src/App.js
import React from 'react';
import './App.css';
import ChatGPT from './ChatGPT';
import { UserProvider } from './UserContext';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatGPT Integration Example</h1>
      </header>
      <main className="App-main">
        <UserProvider>
          <ChatGPT />
        </UserProvider>
      </main>
    </div>
  );
};

export default App;
