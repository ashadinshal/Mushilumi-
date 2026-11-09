import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BANNER_IMAGE_URL } from './MascotBunny';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { cart, wishlist, openCart, openWishlist, openSearch } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'shop-all', label: 'Shop All' },
    { id: 'crochet', label: 'Crochet' },
    { id: 'baby', label: 'Baby' },
    { id: 'couple', label: 'Couples' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EFE7DE] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* ZONE 1: BRAND LOGO */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus-visible:outline-hidden"
          >
            <div className="w-8 h-8 rounded-full border border-[#E6AAB9] overflow-hidden bg-white shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={BANNER_IMAGE_URL}
                alt="MoschiLumii Mascot"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-semibold tracking-tight text-[#453430] leading-none group-hover:text-[#C97A91] transition-colors">
                MoschiLumii
              </span>
              <span className="text-[10px] text-[#8C6A64] font-normal tracking-wider mt-0.5">
                Cute Finds · Happy Hearts ♡
              </span>
            </div>
          </button>

          {/* ZONE 2: NAVIGATION LINKS (Single-line, light, uncrowded) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-medium text-[#453430]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    isActive ? 'text-[#C97A91] font-semibold' : 'text-[#453430] hover:text-[#C97A91]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C97A91] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search */}
            <button
              onClick={openSearch}
              aria-label="Search"
              className="p-2 text-[#453430] hover:text-[#C97A91] hover:bg-[#FBF0EB] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist */}
            <button
              onClick={openWishlist}
              aria-label="Wishlist"
              className="relative p-2 text-[#453430] hover:text-[#C97A91] hover:bg-[#FBF0EB] rounded-full transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#C97A91] text-white text-[9px] font-semibold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag */}
            <button
              onClick={openCart}
              aria-label="Shopping Bag"
              className="flex items-center gap-1.5 bg-[#C97A91] hover:bg-[#B5677E] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-sans">Bag</span>
              <span className="text-[11px] opacity-90">({cartCount})</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="lg:hidden p-1.5 text-[#453430] hover:text-[#C97A91] rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EFE7DE] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-1 shadow-md">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm text-[#453430] hover:bg-[#FBF0EB] hover:text-[#C97A91] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
