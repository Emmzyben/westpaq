import { X } from "lucide-react";
import { C } from "../theme/tokens";

export function ModalOverlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-5"
      style={{ background: "rgba(15,18,22,0.5)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-y-auto shadow-2xl" style={{ maxHeight: "88vh" }}>
        {children}
      </div>
    </div>
  );
}
