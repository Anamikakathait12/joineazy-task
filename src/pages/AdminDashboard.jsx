import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { currentUser } = useApp();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-xl font-bold text-slate-800">Admin Dashboard</h2>
        <p className="mt-1 text-sm text-slate-600">
          Welcome back, {currentUser?.name}. Manage your assignments and track student submissions here.
        </p>
      </div>
    </main>
  );
}

