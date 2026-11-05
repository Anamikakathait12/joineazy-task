/**
 * Reusable EmptyState component.
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
      <div className="py-4 px-3 text-center bg-slate-50 border border-dashed border-slate-200 rounded-lg">
        <p className="text-xs font-medium text-slate-700">{title}</p>
        {description && <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>}
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-10 sm:p-14 text-center shadow-xs">
      <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-lg mb-3">
        0
      </div>

      <h3 className="text-base font-bold text-slate-800">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-xs transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span>+</span>
            <span>{actionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
}

