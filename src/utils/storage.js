/**
 * Safely loads data from localStorage.
 * If the key doesn't exist or JSON parsing fails, returns the provided fallback.
 *
 * @param {string} key
 * @param {*} fallback
 * @returns {*}
 */
export function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return fallback;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Failed to load or parse data for key "${key}" from localStorage:`, error);
    return fallback;
  }
}

/**
 * Safely saves data to localStorage.
 * Catches storage quota exceeded or serialization errors.
 *
 * @param {string} key
 * @param {*} value
 * @returns {boolean} True if saved successfully, false otherwise
 */
export function saveData(key, value) {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Failed to save data for key "${key}" to localStorage:`, error);
    return false;
  }
}

