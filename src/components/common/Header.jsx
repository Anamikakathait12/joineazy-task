import { useApp } from '../../context/AppContext';

export default function Header() {
  const { currentUser, logout } = useApp();

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  return (
    <>
      {/* ========================================================
          DESKTOP SIDEBAR (lg and up)
          Fixed left sidebar ~250px wide, dark indigo gradient
          #140E3A to #2A1A6B, full height.
      ======================================================== */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[250px] bg-gradient-to-b from-[#140E3A] to-[#2A1A6B] text-white z-40 flex-col justify-between p-6 shadow-2xl">
        {/* Top: Brand Block, User Profile & Active Nav Item */}
        <div>
          {/* Brand block: Graduation-cap SVG + "KarLoJi" bold white */}
          <div className="flex items-center gap-3 px-1 py-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B3FD0] to-[#8B5CF6] text-white flex items-center justify-center shadow-lg shrink-0">
              {/* Cute Graduation Cap SVG */}
              <svg
                className="w-5 h-5 text-white"
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
            <span className="font-extrabold text-white text-2xl tracking-tight">
              KarLoJi
            </span>
          </div>

          {/* User Profile Block */}
          <div className="mt-7 pt-5 border-t border-white/10 px-1">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center font-bold text-sm text-[#E4DCFF] mb-2.5">
              {currentUser.name.charAt(0)}
            </div>

            <h2 className="text-sm font-bold text-white leading-tight truncate">
              {currentUser.name}
            </h2>

            <div className="mt-1.5">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#5B3FD0] text-white shadow-xs">
                {isAdmin ? 'Professor' : 'Student'}
              </span>
            </div>
          </div>

          {/* One active page nav item: "My Assignments" */}
          <div className="mt-6">
            <div className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-[#5B3FD0] text-white font-bold text-sm shadow-md">
              <svg
                className="w-4 h-4 text-purple-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>My Assignments</span>
            </div>
          </div>
        </div>

        {/* Bottom: Decorative cursive line and Logout Button */}
        <div className="pt-6 border-t border-white/10 flex flex-col items-center">
          {/* Decorative handwritten text: "Learn Grow Achieve" */}
          <div className="text-center font-cursive text-xl text-pink-300 -rotate-2 select-none mb-4 flex items-center justify-center gap-1.5 pointer-events-none">
            <span>Learn Grow Achieve</span>
            <span className="text-pink-400 text-lg">♥</span>
          </div>

          {/* Full-width Sign out Button */}
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition cursor-pointer border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ========================================================
          MOBILE / TABLET TOP BAR (below lg)
          Dark indigo gradient #140E3A to #2A1A6B top bar.
      ======================================================== */}
      <header className="lg:hidden sticky top-0 z-40 bg-gradient-to-r from-[#140E3A] to-[#2A1A6B] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between gap-3">
          {/* Brand Block */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#5B3FD0] to-[#8B5CF6] text-white flex items-center justify-center shadow-sm shrink-0">
              <svg
                className="w-4 h-4"
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
            <span className="font-extrabold text-white text-lg tracking-tight">
              KarLoJi
            </span>
          </div>

          {/* User info & Sign out */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="text-right min-w-0 hidden xs:block sm:block">
              <p className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-[160px]">
                {currentUser.name}
              </p>
              <span className="text-[10px] uppercase font-bold text-purple-200">
                {isAdmin ? 'Professor' : 'Student'}
              </span>
            </div>

            <button
              type="button"
              onClick={logout}
              className="text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-1.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-purple-300 shrink-0 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
