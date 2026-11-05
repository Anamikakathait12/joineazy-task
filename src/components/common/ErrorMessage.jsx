/**
 * ErrorMessage displays application storage or runtime errors,
 * styled for the KarLoJi theme.
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
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] to-[#EAE3FF] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-[#E6DEFF] rounded-3xl p-8 text-center shadow-xl">
        {/* Warning Icon Badge */}
        <div className="w-12 h-12 mx-auto rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center text-xl font-bold">
          !
        </div>

        <h3 className="mt-4 text-lg font-extrabold text-[#1E1B4B]">
          Application Error
        </h3>

        <p className="mt-2 text-sm text-red-600 leading-relaxed">
          {message}
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Your browser storage may contain corrupted data or storage access may be restricted.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#3B1FA8] hover:bg-[#2E1685] text-white text-sm font-bold rounded-full transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer"
            >
              Retry
            </button>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-[#F3EEFF] text-[#3B1FA8] text-sm font-bold rounded-full border border-[#3B1FA8] transition focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer"
            >
              Reset data
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
