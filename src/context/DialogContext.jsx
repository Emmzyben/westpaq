import { createContext, useContext, useState, useCallback, useRef } from "react";
import { C } from "../theme/tokens";
import { CheckCircle, XCircle, AlertCircle, X, Trash2, AlertTriangle } from "lucide-react";

/* ─── Context ─── */
const DialogCtx = createContext(null);
export const useDialog = () => useContext(DialogCtx);

/* ─── Toast ─── */
const TOAST_ICONS = {
  success: <CheckCircle size={18} className="flex-shrink-0" />,
  error:   <XCircle    size={18} className="flex-shrink-0" />,
  info:    <AlertCircle size={18} className="flex-shrink-0" />,
};
const TOAST_COLORS = {
  success: { bg: "#f0fdf4", border: "#bbf7d0", text: "#15803d", icon: "#22c55e" },
  error:   { bg: "#fef2f2", border: "#fecaca", text: "#b91c1c", icon: "#ef4444" },
  info:    { bg: "#eff6ff", border: "#bfdbfe", text: "#1d4ed8", icon: "#3b82f6" },
};

function ToastItem({ toast, onRemove }) {
  const col = TOAST_COLORS[toast.type] || TOAST_COLORS.info;
  return (
    <div
      className="flex items-start gap-3 px-4 py-3.5 rounded-2xl border shadow-lg min-w-[300px] max-w-sm animate-slide-in"
      style={{ background: col.bg, borderColor: col.border }}
    >
      <span style={{ color: col.icon, marginTop: 1 }}>
        {TOAST_ICONS[toast.type]}
      </span>
      <div className="flex-1">
        {toast.title && <p className="font-bold text-sm" style={{ color: col.text }}>{toast.title}</p>}
        <p className="text-sm mt-0.5" style={{ color: col.text, opacity: 0.85 }}>{toast.message}</p>
      </div>
      <button onClick={() => onRemove(toast.id)} style={{ color: col.text, opacity: 0.5 }} className="hover:opacity-100 mt-0.5">
        <X size={15} />
      </button>
    </div>
  );
}

function ToastContainer({ toasts, remove }) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2.5 items-end pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="pointer-events-auto">
          <ToastItem toast={t} onRemove={remove} />
        </div>
      ))}
    </div>
  );
}

/* ─── Alert Modal ─── */
function AlertModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="p-7 text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: `${C.amber}22` }}>
            <AlertTriangle size={26} style={{ color: C.amberText }} />
          </div>
          <p className="text-sm font-medium leading-relaxed" style={{ color: C.ink }}>{message}</p>
        </div>
        <div className="border-t p-4" style={{ borderColor: C.border }}>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-bold text-sm text-white"
            style={{ background: C.red }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Confirm Modal ─── */
function ConfirmModal({ message, onConfirm, onCancel, danger }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="p-7 text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: danger ? `${C.red}18` : `${C.ink3}18` }}
          >
            <Trash2 size={24} style={{ color: danger ? C.red : C.ink2 }} />
          </div>
          <p className="text-sm font-medium leading-relaxed" style={{ color: C.ink }}>{message}</p>
        </div>
        <div className="border-t p-4 flex gap-3" style={{ borderColor: C.border }}>
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl font-bold text-sm border"
            style={{ borderColor: C.border, color: C.ink2 }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl font-bold text-sm text-white"
            style={{ background: danger ? C.red : C.ink }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Provider ─── */
export function DialogProvider({ children }) {
  const [toasts, setToasts]   = useState([]);
  const [alertCfg, setAlert]  = useState(null);
  const [confirmCfg, setConfirm] = useState(null);
  const resolveRef = useRef(null);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = useCallback((message, { type = "info", title, duration = 4000 } = {}) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, title, type }]);
    setTimeout(() => removeToast(id), duration);
  }, [removeToast]);

  const showAlert = useCallback((message) => {
    return new Promise(resolve => {
      setAlert({ message });
      resolveRef.current = resolve;
    });
  }, []);

  const handleAlertClose = () => {
    setAlert(null);
    resolveRef.current?.();
    resolveRef.current = null;
  };

  const showConfirm = useCallback((message, { danger = false } = {}) => {
    return new Promise(resolve => {
      setConfirm({ message, danger });
      resolveRef.current = resolve;
    });
  }, []);

  const handleConfirmResult = (result) => {
    setConfirm(null);
    resolveRef.current?.(result);
    resolveRef.current = null;
  };

  return (
    <DialogCtx.Provider value={{ toast, showAlert, showConfirm }}>
      {children}
      <ToastContainer toasts={toasts} remove={removeToast} />
      {alertCfg   && <AlertModal   {...alertCfg}   onClose={() => handleAlertClose()} />}
      {confirmCfg && <ConfirmModal {...confirmCfg} onConfirm={() => handleConfirmResult(true)} onCancel={() => handleConfirmResult(false)} />}
    </DialogCtx.Provider>
  );
}
