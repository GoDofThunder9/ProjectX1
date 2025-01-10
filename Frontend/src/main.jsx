import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './Component/Food/CardContext.jsx';
import { Car } from 'lucide-react';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider/>
    <App />
    <CartProvider/>
  </StrictMode>,
)
