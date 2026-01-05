import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router'
import { ThemeProvider } from './contexts/ThemeContext'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
)
