import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router'
import { ThemeProvider } from './contexts/ThemeContext'
import { AnalysisProvider } from './contexts/AnalysisContext'
import { ToastProvider } from './components/ui/Toast'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AnalysisProvider>
        <ToastProvider position="bottom-right">
          <Router />
        </ToastProvider>
      </AnalysisProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
