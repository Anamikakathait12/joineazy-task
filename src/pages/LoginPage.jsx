import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const { users, login } = useApp();

  const admins = users.filter((u) => u.role === 'admin');
  const students = users.filter((u) => u.role === 'student');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
          Assignment & Review Dashboard
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
          Select a mock user profile below to sign in and view their role-specific dashboard.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-3xl space-y-6 sm:space-y-8">
        {/* Admins / Professors Section */}
        <section aria-labelledby="admins-heading">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <h2 id="admins-heading" className="text-base sm:text-lg font-bold text-slate-800">
              Professors / Admins
            </h2>
            <span className="text-xs bg-purple-100 text-purple-700 font-semibold px-2 py-0.5 rounded-full">
              {admins.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {admins.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => login(user.id)}
                className="w-full text-left bg-white border border-slate-200 hover:border-purple-400 hover:shadow-md transition rounded-xl p-4 sm:p-5 group focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-purple-700 transition truncate">
                      {user.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{user.email}</p>
                  </div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md shrink-0">
                    Admin
                  </span>
                </div>
                <div className="mt-3 text-xs text-purple-600 font-medium">
                  Click to sign in &rarr;
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Students Section */}
        <section aria-labelledby="students-heading">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2 id="students-heading" className="text-base sm:text-lg font-bold text-slate-800">
              Students
            </h2>
            <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
              {students.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {students.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => login(user.id)}
                className="w-full text-left bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition rounded-xl p-4 sm:p-5 group focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 group-hover:text-blue-700 transition truncate">
                      {user.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{user.email}</p>
                  </div>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md shrink-0">
                    Student
                  </span>
                </div>
                <div className="mt-3 text-xs text-blue-600 font-medium">
                  Click to sign in &rarr;
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
