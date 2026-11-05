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
    return <LoadingSpinner message="Loading KarLoJi dashboard..." />;
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

  // Logged in shell with KarLoJi dark indigo sidebar/topbar and lavender page content
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] to-[#EAE3FF] text-slate-700 flex flex-col">
      <Header />
      <div className="flex-1 lg:pl-[250px] min-w-0 transition-all">
        {currentUser.role === 'admin' ? (
          <AdminDashboard />
        ) : (
          <StudentDashboard />
        )}
      </div>
    </div>
  );
}
