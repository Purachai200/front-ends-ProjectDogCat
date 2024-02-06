import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MockUpContextProvider } from './contexts/MockUpContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // MockupContext Use for MockUp UI
  <React.StrictMode>
    <MockUpContextProvider> 
    <App />
    </MockUpContextProvider>
  </React.StrictMode>,
)
