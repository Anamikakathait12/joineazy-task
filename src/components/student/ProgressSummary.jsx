/**
 * ProgressSummary displays the student's submission completion stats and visual progress bar.
 *
 * @param {{ total: number, submitted: number }} props
 */
export default function ProgressSummary({ total = 0, submitted = 0 }) {
  const percentage = total > 0 ? Math.round((submitted / total) * 100) : 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Overall Progress
          </h2>
          <p className="text-2xl font-bold text-slate-900 mt-0.5">
            {submitted} of {total} submitted
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
            {percentage}% Completed
          </span>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div
        className="w-full bg-slate-100 rounded-full h-3 overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Submission progress"
      >
        <div
          className="h-full bg-indigo-600 transition-all duration-300 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

