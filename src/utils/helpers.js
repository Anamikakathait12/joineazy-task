/**
 * Generates a unique string ID with an optional prefix.
 *
 * @param {string} prefix
 * @returns {string}
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Formats an ISO date string into a readable format (e.g., "Nov 20, 2026, 11:59 PM").
 * Returns an empty string or fallback if date is invalid or missing.
 *
 * @param {string} isoString
 * @returns {string}
 */
export function formatDate(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Checks whether an ISO date string represents a time in the past.
 *
 * @param {string} isoString
 * @returns {boolean}
 */
export function isOverdue(isoString) {
  if (!isoString) return false;
  const targetDate = new Date(isoString);
  if (isNaN(targetDate.getTime())) return false;

  return targetDate.getTime() < Date.now();
}

