import { useEffect } from 'react';

/**
 * Reusable confirmation dialog modal styled for KarLoJi.
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
      className="fixed inset-0 z-50 overflow-y-auto bg-[#140E3A]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E3DAFF] my-auto">
        <h3
          id="confirm-dialog-title"
          className="text-lg font-extrabold text-[#1E1B4B] break-words"
        >
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed break-words font-medium">
          {message}
        </p>

        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-5 py-2.5 text-sm font-bold text-[#3B1FA8] bg-white hover:bg-[#EDE7FF] border border-[#3B1FA8] min-h-[44px] rounded-full transition focus:outline-none focus:ring-2 focus:ring-[#3B1FA8] cursor-pointer"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`w-full sm:w-auto px-5 py-2.5 text-sm font-bold min-h-[44px] rounded-full transition shadow-md focus:outline-none focus:ring-2 cursor-pointer ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
                : 'bg-[#3B1FA8] hover:bg-[#2E1685] text-white focus:ring-[#3B1FA8]'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
