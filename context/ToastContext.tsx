"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/format";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
}

interface ToastContextType {
  addToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast["type"] = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={cn(
              "flex items-center justify-between min-w-[280px] px-4 py-3 rounded-lg shadow-soft text-white animate-slide-up",
              t.type === "success" ? "bg-leaf" : t.type === "error" ? "bg-red-600" : "bg-navy"
            )}
          >
            <span className="text-sm font-medium">{t.message}</span>
            <button 
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))} 
              className="ml-4 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) throw new Error("useToast must be used within ToastProvider");
  return context;
};