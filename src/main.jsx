import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
)
