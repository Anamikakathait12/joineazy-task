/**
 * Reusable EmptyState component styled for KarLoJi.
 *
 * @param {{
 *   title: string,
 *   description?: string,
 *   actionLabel?: string,
 *   onAction?: () => void,
 *   compact?: boolean
 * }} props
 */
export default function EmptyState({
  title = 'No items found',
  description = '',
  actionLabel,
  onAction,
  compact = false,
}) {
  if (compact) {
    return (
      <div className="py-4 px-3 text-center bg-white border border-dashed border-[#E6DEFF] rounded-2xl">
        <p className="text-xs font-bold text-[#1E1B4B]">{title}</p>
        {description && <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E6DEFF] rounded-3xl p-10 sm:p-14 text-center shadow-md">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F3EEFF] border border-[#E6DEFF] flex items-center justify-center text-[#3B1FA8] font-extrabold text-lg mb-3">
        0
      </div>

      <h3 className="text-base sm:text-lg font-extrabold text-[#1E1B4B]">
        {title}
      </h3>

      {description && (
        <p className="mt-1.5 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <div className="mt-5">
          <button
            type="button"
            onClick={onAction}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B1FA8] hover:bg-[#2E1685] text-white text-sm font-bold rounded-full shadow-md transition focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}
