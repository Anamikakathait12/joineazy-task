/**
 * LoadingSpinner renders a clean spinner in deep purple with placeholder skeletons.
 *
 * @param {{ message?: string }} props
 */
export default function LoadingSpinner({ message = 'Loading dashboard...' }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F3EEFF] to-[#EAE3FF] flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-[#E6DEFF] rounded-3xl p-8 shadow-xl text-center">
        {/* Animated Spinner in KarLoJi Purple */}
        <div className="w-12 h-12 mx-auto border-4 border-[#E4DCFF] border-t-[#3B1FA8] rounded-full animate-spin" />

        <h3 className="mt-4 text-base font-bold text-[#1E1B4B]">
          {message}
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Syncing localStorage data...
        </p>

        {/* Skeleton lines */}
        <div className="mt-6 space-y-2.5">
          <div className="h-2.5 bg-[#F3EEFF] rounded-full w-3/4 mx-auto animate-pulse" />
          <div className="h-2 bg-[#F3EEFF] rounded-full w-1/2 mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
