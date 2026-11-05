/**
 * LoadingSpinner renders a clean spinner with placeholder skeletons.
 *
 * @param {{ message?: string }} props
 */
export default function LoadingSpinner({ message = 'Loading dashboard...' }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-8 shadow-xs text-center">
        {/* Animated Spinner */}
        <div className="w-12 h-12 mx-auto border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />

        <h3 className="mt-4 text-base font-bold text-slate-800">
          {message}
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Syncing localStorage data...
        </p>

        {/* Skeleton lines */}
        <div className="mt-6 space-y-2.5">
          <div className="h-3 bg-slate-100 rounded-full w-3/4 mx-auto animate-pulse" />
          <div className="h-2.5 bg-slate-100 rounded-full w-1/2 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}

