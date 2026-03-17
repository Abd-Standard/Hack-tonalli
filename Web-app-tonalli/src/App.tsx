import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Lesson } from './pages/Lesson';
import { Quiz } from './pages/Quiz';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';
import { useAuthStore } from './stores/authStore';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 5 * 60 * 1000 } },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppLayout({ children, showNavbar = true }: { children: React.ReactNode; showNavbar?: boolean }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showNavbar && <Navbar />}
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Landing />
            </AppLayout>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <AppLayout>
                <Login />
              </AppLayout>
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <AppLayout>
                <Register />
              </AppLayout>
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/learn/:lessonId" element={
            <ProtectedRoute>
              <AppLayout showNavbar={false}>
                <Lesson />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/quiz/:lessonId" element={
            <ProtectedRoute>
              <AppLayout showNavbar={false}>
                <Quiz />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <AppLayout>
                <Profile />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <AppLayout>
                <Leaderboard />
              </AppLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
