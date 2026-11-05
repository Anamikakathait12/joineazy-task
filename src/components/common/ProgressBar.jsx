/**
 * Reusable ProgressBar component styled for KarLoJi.
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
  color = 'bg-[#10B981]',
  heightClass = 'h-2',
  className = '',
}) {
  const percentage = max > 0 ? Math.min(100, Math.max(0, Math.round((value / max) * 100))) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      className={`w-full bg-[#E4DCFF] rounded-full overflow-hidden ${heightClass} ${className}`}
    >
      <div
        className={`${color} h-full rounded-full transition-all duration-500`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
