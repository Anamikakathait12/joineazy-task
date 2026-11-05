import { useApp } from './context/AppContext';
import Header from './components/common/Header';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorMessage from './components/common/ErrorMessage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const { currentUser, loading, error, retryLoad, resetData } = useApp();

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={retryLoad}
        onReset={resetData}
      />
    );
  }

  // Not logged in -> Show Login Page
  if (!currentUser) {
    return <LoginPage />;
  }

  // Logged in shell with common header and role-based views
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      <Header />
      <div className="flex-1">
        {currentUser.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <StudentDashboard />
        )}
      </div>
    </div>
  );
}
