import React from 'react';
import { Heart, Instagram, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { BANNER_IMAGE_URL } from './MascotBunny';
import { PolicyType } from './PolicyModal';
import { Category } from '../types';

interface FooterProps {
  onOpenPolicy: (type: PolicyType) => void;
  onSelectCategory: (category: Category) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicy,
  onSelectCategory,
  onNavigateHome,
}) => {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#EFE7DE] text-[#453430]">
      {/* Upper Footer: Brand and Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-hidden"
            >
              <div className="w-11 h-11 rounded-full border border-[#EFE7DE] overflow-hidden bg-white shrink-0">
                <img
                  src={BANNER_IMAGE_URL}
                  alt="MoschiLumii Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-heading text-xl font-medium tracking-tight text-[#453430] group-hover:text-[#C97A91] transition-colors block">
                  MoschiLumii
                </span>
                <span className="text-[11px] font-light text-[#8C6A64] tracking-wide block">
                  Cute Finds, Happy Hearts ♡
                </span>
              </div>
            </button>

            <p className="text-xs text-[#8C6A64] font-light max-w-sm leading-relaxed">
              A serene kawaii shopping destination for hand-stitched crochet blooms, plush companions, baby outfits, and romantic couple gifts.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MoschiLumii on Instagram"
                className="w-8 h-8 rounded-full bg-white border border-[#EFE7DE] text-[#C97A91] hover:bg-[#FBF0EB] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:support@moschilumii.com"
                aria-label="Email Customer Support"
                className="w-8 h-8 rounded-full bg-white border border-[#EFE7DE] text-[#C97A91] hover:bg-[#FBF0EB] flex items-center justify-center transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-[#453430] uppercase tracking-wider mb-3.5">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#8C6A64]">
              <li>
                <button
                  onClick={() => onSelectCategory('crochet')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Crochet Cuties
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('baby')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Baby Corner
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('couple')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Couple Goals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('lifestyle')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Pookie Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('hampers')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Little Surprises
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('accessories')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Accessories & Clips
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Help */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-[#453430] uppercase tracking-wider mb-3.5">
              Customer Love
            </h4>
            <ul className="space-y-2 text-xs font-light text-[#8C6A64]">
              <li>
                <button
                  onClick={() => onOpenPolicy('about')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  About Our Brand
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('shipping')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Shipping & Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('returns')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#C97A91] transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Studio & Support */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-[#453430] uppercase tracking-wider mb-3.5">
              Happy Support
            </h4>
            <div className="space-y-2.5 text-xs font-light text-[#8C6A64]">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C97A91] shrink-0 mt-0.5" />
                <span>support@moschilumii.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C97A91] shrink-0 mt-0.5" />
                <span>Mon–Sat (10:00 AM – 7:00 PM IST)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C97A91] shrink-0 mt-0.5" />
                <span>Moschi Studio, Bandra West, Mumbai</span>
              </div>
              <div className="pt-2 text-[11px] text-[#8C6A64]/80 leading-tight">
                All major credit/debit cards, UPI & Net Banking accepted.
              </div>
            </div>
          </div>

        </div>

        {/* Lower Closing Line */}
        <div className="mt-12 pt-6 border-t border-[#EFE7DE] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C6A64] gap-4">
          <p className="font-light">
            © {new Date().getFullYear()} MoschiLumii. All rights reserved.
          </p>

          <p className="font-heading text-[#C97A91] flex items-center gap-1.5 text-xs font-medium">
            <span>Made with ♡ for all the happy hearts.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
