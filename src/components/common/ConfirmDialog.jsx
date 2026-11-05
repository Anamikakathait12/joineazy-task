import { useEffect } from 'react';

/**
 * Reusable confirmation dialog modal.
 * Closes on backdrop click or when Escape key is pressed.
 *
 * @param {{
 *   isOpen: boolean,
 *   title: string,
 *   message: string,
 *   confirmLabel?: string,
 *   cancelLabel?: string,
 *   onConfirm: () => void,
 *   onCancel: () => void,
 *   isDestructive?: boolean
 * }} props
 */
export default function ConfirmDialog({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}) {
  // Listen for Escape key to close the dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={(e) => {
        // Close if the user clicked directly on the backdrop container
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
        <h3
          id="confirm-dialog-title"
          className="text-lg font-bold text-slate-900"
        >
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {message}
        </p>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white rounded-lg transition focus:outline-none focus:ring-2 ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

