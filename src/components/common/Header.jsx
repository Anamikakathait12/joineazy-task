import { useApp } from '../../context/AppContext';

export default function Header() {
  const { currentUser, logout } = useApp();

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 gap-3">
          {/* Logo / App Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              AD
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight truncate">
                Assignment Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                {isAdmin ? 'Professor Portal' : 'Student Portal'}
              </p>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-700 shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-semibold text-slate-800 truncate max-w-[130px] sm:max-w-[180px]">
                    {currentUser.name}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full tracking-wide shrink-0 ${
                      isAdmin
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {isAdmin ? 'Admin' : 'Student'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate max-w-[140px] sm:max-w-[180px]">
                  {currentUser.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="shrink-0 text-xs font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 px-3.5 py-2 min-h-[38px] rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
