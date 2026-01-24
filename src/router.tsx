import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout'
import { PageLoader } from './components/ui/PageLoader'

// =============================================================================
// LAZY-LOADED PAGES (Code Splitting)
// Each page is loaded on-demand to reduce initial bundle size
// =============================================================================

// HomePage is available but not currently used in routes
// const HomePage = lazy(() => import('./pages/Home'))
const HomepageVisionPage = lazy(() => import('./pages/HomepageVision'))
const HomeVisionPage = lazy(() => import('./pages/HomeVision'))
const DashboardPage = lazy(() => import('./pages/Dashboard'))
const MyCompanyPage = lazy(() => import('./pages/MyCompany'))
const CompetitorsPage = lazy(() => import('./pages/Competitors'))
const LaunchAnalysisPage = lazy(() => import('./pages/LaunchAnalysis'))
const MyAnalysesPage = lazy(() => import('./pages/MyAnalyses'))
const ResultsPage = lazy(() => import('./pages/Results'))
const RAGManagementPage = lazy(() => import('./pages/RAGManagement'))
const ReportsPage = lazy(() => import('./pages/Reports'))
const AlertsPage = lazy(() => import('./pages/Alerts'))
const SettingsPage = lazy(() => import('./pages/Settings'))
const HelpPage = lazy(() => import('./pages/Help'))

// =============================================================================
// SUSPENSE WRAPPER
// Wraps lazy components with loading fallback
// =============================================================================

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  )
}

// =============================================================================
// ROUTER CONFIGURATION
// =============================================================================

const router = createBrowserRouter([
  // Vision landing page (standalone, no sidebar)
  {
    path: '/vision',
    element: (
      <SuspenseWrapper>
        <HomepageVisionPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomeVisionPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'home-vision',
        element: <Navigate to="/" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <SuspenseWrapper>
            <DashboardPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'my-company',
        element: (
          <SuspenseWrapper>
            <MyCompanyPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'competitors',
        element: (
          <SuspenseWrapper>
            <CompetitorsPage />
          </SuspenseWrapper>
        ),
      },
      {
        // Legacy redirect: watchlist -> competitors
        path: 'watchlist',
        element: <Navigate to="/competitors" replace />,
      },
      {
        path: 'launch-analysis',
        element: (
          <SuspenseWrapper>
            <LaunchAnalysisPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'my-analyses',
        element: (
          <SuspenseWrapper>
            <MyAnalysesPage />
          </SuspenseWrapper>
        ),
      },
      {
        // Keep results page accessible for deep linking
        path: 'results',
        element: (
          <SuspenseWrapper>
            <ResultsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'results/:analysisId',
        element: (
          <SuspenseWrapper>
            <ResultsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'rag-management',
        element: (
          <SuspenseWrapper>
            <RAGManagementPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'reports',
        element: (
          <SuspenseWrapper>
            <ReportsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'alerts',
        element: (
          <SuspenseWrapper>
            <AlertsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'settings',
        element: (
          <SuspenseWrapper>
            <SettingsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'help',
        element: (
          <SuspenseWrapper>
            <HelpPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
])

export function Router() {
  return <RouterProvider router={router} />
}

export default Router
