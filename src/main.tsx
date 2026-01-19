import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from './router'
import { ThemeProvider } from './contexts/ThemeContext'
import { AnalysisProvider } from './contexts/AnalysisContext'
import { SidebarProvider } from './contexts/SidebarContext'
import { ToastProvider } from './components/ui/Toast'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SidebarProvider>
        <AnalysisProvider>
          <ToastProvider position="bottom-right">
            <Router />
          </ToastProvider>
        </AnalysisProvider>
      </SidebarProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
