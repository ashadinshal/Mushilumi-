import React from 'react';
import { X, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';

export type PolicyType = 'shipping' | 'returns' | 'privacy' | 'terms' | 'about';

interface PolicyModalProps {
  type: PolicyType | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<PolicyType, { title: string; icon: any; body: React.ReactNode }> = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: Truck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#735048] font-nunito leading-relaxed">
          <p>
            <strong>Free Shipping:</strong> We provide Free Express Shipping across all pincodes in India for orders valued at ₹999 or above. Orders below ₹999 are shipped at a nominal flat fee of ₹99.
          </p>
          <p>
            <strong>Handcraft Lead Times:</strong> Because our crochet blooms and personalized gift boxes are hand-stitched by skilled artisans, processing takes 1 to 2 business days before dispatch.
          </p>
          <p>
            <strong>Transit Times:</strong> Once dispatched via our priority courier partners (BlueDart, Delhivery, DTDC), metro deliveries typically arrive in 2–3 business days, while non-metro locations take 4–5 days.
          </p>
          <p>
            <strong>Tracking:</strong> Live SMS and WhatsApp tracking links are dispatched the moment your package is sealed with love.
          </p>
        </div>
      ),
    },
    returns: {
      title: 'Return & Exchange Policy',
      icon: RefreshCw,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#735048] font-nunito leading-relaxed">
          <p>
            <strong>7-Day Happiness Guarantee:</strong> If your cute finds arrive damaged or with any defect, we offer an immediate, hassle-free replacement or full refund within 7 days of delivery.
          </p>
          <p>
            <strong>Artisan & Hygiene Care:</strong> Due to intimate baby hygiene and customized personalized notes, items must remain unwashed and in their original packaging with tags intact.
          </p>
          <p>
            <strong>Reverse Pickup:</strong> We arrange a doorstep reverse pickup directly from your address at zero extra cost.
          </p>
        </div>
      ),
    },
    privacy: {
      title: 'Privacy & Security Policy',
      icon: Lock,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#735048] font-nunito leading-relaxed">
          <p>
            Your privacy is deeply respected. We only collect the minimal information required to deliver your lovely orders: name, shipping address, contact number, and email.
          </p>
          <p>
            <strong>Zero Data Selling:</strong> We will never sell, rent, or trade your personal information to third parties.
          </p>
          <p>
            <strong>Secure Payments:</strong> Payment transactions are encrypted via 256-bit bank-grade SSL protocols. MoschiLumii does not store raw credit/debit card numbers.
          </p>
        </div>
      ),
    },
    terms: {
      title: 'Terms & Conditions',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#735048] font-nunito leading-relaxed">
          <p>
            Welcome to MoschiLumii. By accessing our website and placing an order, you agree to these standard commercial terms.
          </p>
          <p>
            <strong>Handmade Variations:</strong> Handcrafted crochet products may have delightful micro-variations of 1–2% in stitch tension, making every piece authentically one-of-a-kind.
          </p>
          <p>
            <strong>Intellectual Property:</strong> Our bunny mascot, illustrations, and original product patterns are proprietary creations of MoschiLumii.
          </p>
        </div>
      ),
    },
    about: {
      title: 'About MoschiLumii',
      icon: ShieldCheck,
      body: (
        <div className="space-y-4 text-xs sm:text-sm text-[#735048] font-nunito leading-relaxed">
          <p>
            MoschiLumii was born out of a simple belief: <em>&ldquo;Little things can create the biggest happiness.&rdquo;</em>
          </p>
          <p>
            We curate and handcraft cute lifestyle treasures, everlasting crochet bouquets, organic baby wear, and romantic couple keepsakes that bring warmth into everyday life.
          </p>
          <p>
            Every product is packaged with bespoke parchment wraps, pastel ribbons, and positive vibes to make opening each parcel feel like receiving a hug from an old friend.
          </p>
        </div>
      ),
    },
  };

  const active = contentMap[type];
  const Icon = active.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#4A3B36]/30 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EFE7DE] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8F7872] hover:text-[#4A3B36] hover:bg-[#FBF0EB] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FBF0EB] text-[#D98DA4] flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-lg sm:text-xl font-medium text-[#4A3B36]">
            {active.title}
          </h3>
        </div>

        <div className="pt-2 border-t border-[#EFE7DE]">
          {active.body}
        </div>

        <div className="mt-6 pt-4 border-t border-[#EFE7DE] text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#D98DA4] hover:bg-[#C97A91] text-white rounded-full text-xs font-medium transition-colors cursor-pointer"
          >
            Got it, thanks! ♡
          </button>
        </div>
      </div>
    </div>
  );
};
