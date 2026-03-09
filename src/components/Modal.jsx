export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="relative bg-white rounded-xl shadow-lg border border-slate-200 p-6 w-full max-w-md max-h-[90vh] overflow-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 id="modal-title" className="text-xl font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
