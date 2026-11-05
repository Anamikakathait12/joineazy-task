import { useApp } from '../context/AppContext';

/**
 * 4-Point Star Sparkle SVG Component for decorative background
 */
function Sparkle({ className = '', style = {} }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      style={style}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}

export default function LoginPage() {
  const { users, login } = useApp();

  const admins = users.filter((u) => u.role === 'admin');
  const students = users.filter((u) => u.role === 'student');

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F6F2FF] to-[#E9E0FF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Wave Blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-300/25 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-purple-400/20 rounded-full blur-3xl pointer-events-none translate-x-1/4 translate-y-1/4"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-200/30 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Scattered Decorative 4-Point Sparkles */}
      <Sparkle className="absolute top-16 left-20 w-5 h-5 text-purple-400 opacity-60 animate-pulse" />
      <Sparkle className="absolute top-28 left-1/4 w-7 h-7 text-[#FBBF24] opacity-80" />
      <Sparkle className="absolute top-14 right-1/4 w-4 h-4 text-purple-300 opacity-70" />
      <Sparkle className="absolute top-20 right-28 w-6 h-6 text-[#FBBF24] opacity-75" />
      <Sparkle className="absolute top-1/2 left-8 w-6 h-6 text-purple-400 opacity-50" />
      <Sparkle className="absolute bottom-32 left-16 w-5 h-5 text-[#FBBF24] opacity-70" />
      <Sparkle className="absolute bottom-20 right-12 w-6 h-6 text-purple-400 opacity-60" />
      <Sparkle className="absolute top-2/3 right-8 w-4 h-4 text-purple-300 opacity-60" />

      {/* Main Container */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-4xl">
        {/* Top Center Pill: Deep Purple with Amber Book Icon + "KarLoJi" */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2.5 bg-[#3B1FA8] px-5 py-2 rounded-full shadow-lg text-white">
            <div className="w-6 h-6 rounded-lg bg-[#FBBF24] text-[#140E3A] flex items-center justify-center font-bold shrink-0 shadow-xs">
              {/* Book SVG */}
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span className="font-extrabold text-white text-sm tracking-wide">
              KarLoJi
            </span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1E1B4B] leading-tight tracking-tight">
            Assignment & Review Dashboard
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-medium">
            Select a mock user profile below to sign in and view their role-specific dashboard.
          </p>
        </div>

        <div className="space-y-9">
          {/* Section 1: Professors / Admins */}
          <section aria-labelledby="admins-heading">
            <div className="flex items-center justify-between pb-2 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#3B1FA8]"></span>
                <h2 id="admins-heading" className="text-lg font-bold text-[#1E1B4B]">
                  Professors / Admins
                </h2>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-slate-600 border border-[#E3DAFF] shadow-xs">
                {admins.length} accounts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {admins.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => login(user.id)}
                  className="w-full text-left bg-white/95 border border-[#E3DAFF] hover:border-[#3B1FA8] hover:ring-2 hover:ring-[#3B1FA8]/20 hover:shadow-[0_12px_36px_rgba(91,63,208,0.18)] hover:-translate-y-0.5 transition-all duration-200 rounded-3xl p-5 group focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer shadow-[0_8px_30px_rgba(91,63,208,0.1)] relative overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      {/* Admin Person Icon Avatar */}
                      <div className="w-12 h-12 rounded-full bg-[#EDE7FF] text-[#3B1FA8] flex items-center justify-center shrink-0 shadow-inner">
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-base text-[#1E1B4B] group-hover:text-[#3B1FA8] transition truncate">
                          {user.name}
                        </h3>
                        <p className="text-xs text-slate-400 truncate mt-0.5 font-medium">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {/* Role Pill */}
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDE7FF] text-[#3B1FA8] shrink-0">
                      ADMIN
                    </span>
                  </div>

                  {/* Divider and Footer Link */}
                  <div className="mt-4 pt-3 border-t border-[#F3EEFF] flex items-center justify-between text-xs font-bold text-[#3B1FA8] group-hover:text-[#2E1685]">
                    <span>Sign in as Admin</span>
                    <span className="text-sm font-extrabold transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Section 2: Students */}
          <section aria-labelledby="students-heading">
            <div className="flex items-center justify-between pb-2 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#FBBF24]"></span>
                <h2 id="students-heading" className="text-lg font-bold text-[#1E1B4B]">
                  Students
                </h2>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-amber-200/80 shadow-xs">
                {students.length} accounts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => login(user.id)}
                  className="w-full text-left bg-white/95 border border-[#E3DAFF] hover:border-[#3B1FA8] hover:ring-2 hover:ring-[#3B1FA8]/20 hover:shadow-[0_12px_36px_rgba(91,63,208,0.18)] hover:-translate-y-0.5 transition-all duration-200 rounded-3xl p-5 group focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer shadow-[0_8px_30px_rgba(91,63,208,0.1)] relative overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {/* Student Graduation Cap Avatar */}
                      <div className="w-12 h-12 rounded-full bg-[#EDE7FF] text-[#3B1FA8] flex items-center justify-center shrink-0 shadow-inner">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14l9-5-9-5-9 5 9 5z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-sm sm:text-base text-[#1E1B4B] group-hover:text-[#3B1FA8] transition truncate">
                          {user.name}
                        </h3>
                        <p className="text-xs text-slate-400 truncate mt-0.5 font-medium">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {/* Student Role Pill */}
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] shrink-0">
                      STUDENT
                    </span>
                  </div>

                  {/* Divider and Footer Link */}
                  <div className="mt-4 pt-3 border-t border-[#F3EEFF] flex items-center justify-between text-xs font-bold text-[#3B1FA8] group-hover:text-[#2E1685]">
                    <span>Sign in as Student &rarr;</span>
                    <span className="text-sm font-extrabold transition-transform group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
