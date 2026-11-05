/**
 * ErrorMessage displays application storage or runtime errors,
 * providing both a "Retry" and a "Reset data" recovery button.
 *
 * @param {{
 *   message?: string,
 *   onRetry?: () => void,
 *   onReset?: () => void
 * }} props
 */
export default function ErrorMessage({
  message = 'Failed to load application data.',
  onRetry,
  onReset,
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-red-200 rounded-2xl p-8 text-center shadow-xs">
        {/* Warning Icon Badge */}
        <div className="w-12 h-12 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold">
          !
        </div>

        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Application Error
        </h3>

        <p className="mt-2 text-sm text-red-600 leading-relaxed">
          {message}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Your browser storage may contain corrupted data or storage access may be restricted.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Retry
            </button>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 transition focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              Reset data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

