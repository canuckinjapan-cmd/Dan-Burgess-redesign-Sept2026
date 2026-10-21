import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('dan-app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
