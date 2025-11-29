import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import Chatbot from "./Components/Chatbot.jsx"; 
ReactDOM.createRoot(document.getElementById('root')).render(
    <div>
        <App />
        <Chatbot />
    </div>
)
