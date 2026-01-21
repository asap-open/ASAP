import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-t-xl sm:rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in slide-in-from-bottom-10 fade-in duration-300">
        {/* Mobile Handle */}
        <div className="flex justify-center pt-3 sm:hidden" onClick={onClose}>
          <div className="w-10 h-1.5 bg-slate-200 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center px-4 py-4 border-b border-slate-100">
          <button
            onClick={onClose}
            className="text-text-muted hover:bg-slate-100 p-2 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-text-main text-lg font-bold leading-tight flex-1 text-center pr-10">
            {title}
          </h2>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 space-y-6">{children}</div>
      </div>
    </div>
  );
}
