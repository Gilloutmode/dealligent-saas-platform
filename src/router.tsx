import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout'

// Pages
import { HomePage } from './pages/Home'
import { DashboardPage } from './pages/Dashboard'
import { MyCompanyPage } from './pages/MyCompany'
import { CompetitorsPage } from './pages/Competitors'
import { LaunchAnalysisPage } from './pages/LaunchAnalysis'
import { MyAnalysesPage } from './pages/MyAnalyses'
import { ResultsPage } from './pages/Results'
import { RAGManagementPage } from './pages/RAGManagement'
import { ReportsPage } from './pages/Reports'
import { AlertsPage } from './pages/Alerts'
import { SettingsPage } from './pages/Settings'
import { HelpPage } from './pages/Help'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'my-company',
        element: <MyCompanyPage />,
      },
      {
        path: 'competitors',
        element: <CompetitorsPage />,
      },
      {
        // Legacy redirect: watchlist → competitors
        path: 'watchlist',
        element: <Navigate to="/competitors" replace />,
      },
      {
        path: 'launch-analysis',
        element: <LaunchAnalysisPage />,
      },
      {
        path: 'my-analyses',
        element: <MyAnalysesPage />,
      },
      {
        // Keep results page accessible for deep linking
        path: 'results',
        element: <ResultsPage />,
      },
      {
        path: 'results/:analysisId',
        element: <ResultsPage />,
      },
      {
        path: 'rag-management',
        element: <RAGManagementPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'alerts',
        element: <AlertsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

export default Router
