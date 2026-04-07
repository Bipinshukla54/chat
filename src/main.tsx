import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ChatAppProvider } from './context/ChatAppContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatAppProvider>
      <App />
    </ChatAppProvider>
  </StrictMode>
);
