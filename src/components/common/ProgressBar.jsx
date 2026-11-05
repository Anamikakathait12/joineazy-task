/**
 * Reusable ProgressBar component.
 *
 * @param {{
 *   value: number,
 *   max: number,
 *   color?: string,
 *   heightClass?: string,
 *   className?: string
 * }} props
 */
export default function ProgressBar({
  value = 0,
  max = 0,
  color = 'bg-indigo-600',
  heightClass = 'h-2.5',
  className = '',
}) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, Math.round((value / max) * 100))) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClass} ${className}`}
    >
      <div
        className={`${color} h-full rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

