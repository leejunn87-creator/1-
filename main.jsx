import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// window.storage 폴리필 (Claude 아티팩트 환경 호환)
if (!window.storage) {
  window.storage = {
    async get(key) {
      const val = localStorage.getItem(key);
      return val ? { key, value: val } : null;
    },
    async set(key, value) {
      localStorage.setItem(key, value);
      return { key, value };
    },
    async delete(key) {
      localStorage.removeItem(key);
      return { key, deleted: true };
    },
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
