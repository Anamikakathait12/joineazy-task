import { formatDate, isOverdue } from '../../utils/helpers';

/**
 * AssignmentCard displays an individual assignment styled to match Image 2.
 *
 * @param {{
 *   assignment: object,
 *   submission: object,
 *   onMarkSubmitted: (assignment: object) => void,
 *   iconType?: number
 * }} props
 */
export default function AssignmentCard({ assignment, submission, onMarkSubmitted, iconType = 0 }) {
  const isSubmitted = submission?.status === 'submitted';
  const overdue = !isSubmitted && isOverdue(assignment.dueDate);

  // 4px colored left border: green if Submitted, orange if Not Submitted
  const borderLeftColor = isSubmitted
    ? 'border-l-[#10B981]'
    : overdue
    ? 'border-l-[#EF4444]'
    : 'border-l-[#F97316]';

  // Tinted icon square rotation: purple (code), pink (doc), orange (chart)
  const variant = Math.abs(iconType) % 3;

  return (
    <div
      className={`bg-white/95 border border-[#E3DAFF] border-l-4 ${borderLeftColor} rounded-3xl p-5 shadow-[0_8px_30px_rgba(91,63,208,0.08)] hover:shadow-xl transition-all flex flex-col justify-between`}
    >
      <div>
        {/* Top Row: Tinted Icon + Title on left, Status Pill on right */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            {/* Tinted icon square */}
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${
                variant === 0
                  ? 'bg-[#EDE7FF] text-[#3B1FA8]'
                  : variant === 1
                  ? 'bg-[#FCE7F3] text-[#BE185D]'
                  : 'bg-[#FFEDD5] text-[#C2410C]'
              }`}
            >
              {variant === 0 ? (
                // Code SVG
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
                    strokeWidth="2.5"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              ) : variant === 1 ? (
                // Document SVG
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
                    strokeWidth="2.5"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ) : (
                // Chart/Blocks SVG
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
                    strokeWidth="2.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              )}
            </div>

            <h3 className="text-base font-bold text-[#1E1B4B] leading-snug break-words">
              {assignment.title}
            </h3>
          </div>

          {/* Status Badge */}
          <div className="shrink-0">
            {isSubmitted ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#15803D]">
                <span>Submitted</span>
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
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            ) : overdue ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#B91C1C]">
                Overdue
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#FFEDD5] text-[#C2410C]">
                Not Submitted
              </span>
            )}
          </div>
        </div>

        {/* Description clamped to 2 lines */}
        <p className="mt-2 text-sm text-slate-500 line-clamp-2 leading-relaxed break-words pl-12">
          {assignment.description || 'No description provided.'}
        </p>

        {/* Drive Link */}
        {assignment.driveLink && (
          <div className="mt-3 pl-12">
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B1FA8] hover:text-[#2E1685] underline py-0.5"
            >
              <span>Open Drive Link</span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </div>

      {/* Footer Row: Calendar Due Date & Action Button */}
      <div className="mt-5 pt-3.5 border-t border-[#F3EEFF] flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <svg
            className="w-4 h-4 text-purple-400 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Due: {formatDate(assignment.dueDate) || 'No deadline'}</span>
        </div>

        {/* Right side: Solid deep-indigo button if not submitted; nothing if submitted */}
        {!isSubmitted && (
          <button
            type="button"
            onClick={() => onMarkSubmitted(assignment)}
            className="bg-[#3B1FA8] hover:bg-[#2E1685] text-white font-bold text-xs sm:text-sm px-5 py-2 min-h-[40px] rounded-full transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer"
          >
            Yes, I have submitted
          </button>
        )}
      </div>
    </div>
  );
}
