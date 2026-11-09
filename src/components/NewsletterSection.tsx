import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';
import { MascotBunny } from './MascotBunny';
import { useShop } from '../context/ShopContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address ♡', 'info');
      return;
    }
    setIsSubscribed(true);
    showToast('Welcome to the Happy Hearts Club! Code CUTE10 unlocked ♡', 'heart');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CUTE10');
    setCopied(true);
    showToast('Coupon code CUTE10 copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F2] border-t border-[#EFE7DE] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Mascot holding gift box */}
        <div className="w-20 h-20 mx-auto mb-3 animate-float">
          <MascotBunny pose="gift" size={80} />
        </div>

        <h2 className="text-2xl sm:text-3xl font-heading font-medium text-[#453430] tracking-tight">
          Love Cute Things? You&apos;re Our Kind of Person
        </h2>

        <p className="text-xs sm:text-sm text-[#8C6A64] font-light mt-2 max-w-lg mx-auto leading-relaxed">
          Join our Happy Hearts Club for early access to limited crochet drops, secret weekend sales, and enjoy an instant <span className="text-[#C97A91] font-medium">10% off</span> your first order.
        </p>

        {!isSubscribed ? (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="w-full px-4 py-2.5 rounded-full bg-white border border-[#EFE7DE] text-xs text-[#453430] placeholder:text-[#8C6A64]/60 focus:outline-hidden focus:border-[#C97A91]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C97A91] hover:bg-[#B66980] text-white px-5 py-2.5 rounded-full text-xs font-medium font-heading tracking-wide transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <span>Join Club ♡</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="mt-6 p-4 bg-white rounded-2xl border border-[#EFE7DE] max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-[#79A871] font-heading font-medium text-xs mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>You&apos;re in! Here is your exclusive welcome gift:</span>
            </div>
            
            <div className="flex items-center justify-between bg-[#FAF7F2] border border-dashed border-[#C97A91] rounded-xl px-4 py-2 mt-2">
              <div className="text-left">
                <span className="text-[10px] font-medium text-[#8C6A64] uppercase tracking-wider">Use at Checkout</span>
                <p className="text-base font-medium font-heading text-[#C97A91] tracking-widest">CUTE10</p>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 bg-[#C97A91] hover:bg-[#B66980] text-white px-3 py-1.5 rounded-lg text-xs font-heading font-medium transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        )}

        <p className="text-[11px] text-[#8C6A64] font-light mt-3">
          No spam ever, pinky promise. Only heartwarming updates & cuteness.
        </p>

      </div>
    </section>
  );
};
