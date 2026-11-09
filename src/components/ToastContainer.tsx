import React from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Sparkles, Check } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#F8CCD7] rounded-2xl p-3.5 shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-[#FCE8E2] text-[#D98DA4] flex items-center justify-center shrink-0">
            {toast.type === 'heart' ? (
              <Heart className="w-4 h-4 fill-current" />
            ) : toast.type === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </div>
          <p className="text-xs font-nunito font-bold text-[#573B35] leading-tight">
            {toast.message}
          </p>
        </div>
      ))}
    </div>
  );
};
