/**
 * ProgressSummary displays the student's submission stats with a circular progress ring,
 * styled to match Image 2 ("Your Progress").
 *
 * @param {{ total: number, submitted: number }} props
 */
export default function ProgressSummary({ total = 0, submitted = 0 }) {
  const percentage = total > 0 ? Math.round((submitted / total) * 100) : 0;

  // SVG Circular progress dimensions
  const radius = 34;
  const circumference = 2 * Math.PI * radius; // ~213.6
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className="bg-white/95 border border-[#E3DAFF] rounded-3xl p-6 shadow-[0_8px_30px_rgba(91,63,208,0.08)] relative overflow-hidden flex flex-col justify-between"
      role="region"
      aria-label={`${submitted} of ${total} assignments submitted, ${percentage}% completed`}
    >
      {/* Decorative subtle background bar chart at bottom right */}
      <div className="absolute right-3 bottom-2 pointer-events-none opacity-40" aria-hidden="true">
        <svg className="w-20 h-14 text-purple-300" viewBox="0 0 100 60" fill="currentColor">
          <rect x="10" y="35" width="12" height="25" rx="3" />
          <rect x="30" y="22" width="12" height="38" rx="3" />
          <rect x="50" y="12" width="12" height="48" rx="3" />
          <rect x="70" y="0" width="12" height="60" rx="3" />
        </svg>
      </div>

      {/* Card Header with Trending Up Icon */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-[#3B1FA8]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        <h2 className="text-sm font-extrabold text-[#1E1B4B]">
          Your Progress
        </h2>
      </div>

      {/* Progress Ring + Counter */}
      <div className="flex items-center gap-5 relative z-10 my-auto">
        {/* SVG Circular Ring */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg
            className="w-20 h-20 -rotate-90 transform"
            viewBox="0 0 80 80"
            aria-hidden="true"
          >
            {/* Lavender background track */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="#E4DCFF"
              strokeWidth="6.5"
              fill="transparent"
            />
            {/* Green progress stroke */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke="#10B981"
              strokeWidth="6.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          {/* Centered Percentage */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-extrabold text-[#1E1B4B]">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Text Counts */}
        <div className="min-w-0">
          <p className="text-2xl sm:text-3xl font-extrabold text-[#1E1B4B] tracking-tight">
            {submitted} <span className="text-slate-400 font-semibold text-xl">/</span> {total}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Assignments Submitted
          </p>
        </div>
      </div>
    </div>
  );
}
