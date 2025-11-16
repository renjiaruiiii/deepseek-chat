import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChatProvider } from './context/ChatContext';
// 注入全局状态
ReactDOM.createRoot(document.getElementById('all')).render(
  <ChatProvider>
    <App />
  </ChatProvider>
);