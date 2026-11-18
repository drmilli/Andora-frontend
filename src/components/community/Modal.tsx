import React from "react";
import { X } from "lucide-react";

/** Minimal dialog shell matching the dashboard's modals. Escape and backdrop close it. */
export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  const titleId = React.useId();
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#1a1a1a] rounded-lg p-6 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" aria-label="Close">
          <X size={20} />
        </button>
        <h2 id={titleId} className="text-xl font-semibold mb-4 pr-8">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export const inputCls = "w-full p-3 bg-zinc-900 border border-zinc-700 rounded-md text-white text-sm focus:outline-none focus:border-[#A67102]";
export const primaryBtn = "px-5 py-2.5 bg-[#A67102] hover:bg-[#8a5e02] text-white rounded-lg text-sm font-medium disabled:opacity-50";
export const ghostBtn = "px-5 py-2.5 border border-gray-600 hover:bg-[#2a2a2a] text-white rounded-lg text-sm font-medium disabled:opacity-50";
