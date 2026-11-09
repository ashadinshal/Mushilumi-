import React, { useState } from 'react';
import {
  X,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Gift,
  Check,
  Scissors,
  Share2,
} from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductArtwork } from './ProductArtwork';
import { PRODUCTS } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist, openCheckout, showToast } = useShop();

  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { name: 'Default', hex: '#FFF5E8' }
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null);

  const isFavorite = isInWishlist(product.id);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setDeliveryResult('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    const estDays = pincode.startsWith('4') || pincode.startsWith('1') ? '2–3' : '3–4';
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 3);
    const dateStr = estDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    setDeliveryResult(`Standard delivery to ${pincode} by ${dateStr} · Free delivery on ₹999+`);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant, selectedSize || undefined, giftWrap, giftNote);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant, selectedSize || undefined, giftWrap, giftNote);
    onClose();
    openCheckout();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Look at this cute treasure from MoschiLumii: ${product.name}! ♡`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard! ♡', 'success');
    }
  };

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#4A3B36]/35 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-3xl border border-[#EFE7DE] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header Close & Share buttons */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs px-6 py-3.5 border-b border-[#EFE7DE] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#8F7872] font-light">
            <span>{product.categoryLabel}</span>
            <span>·</span>
            <span className="text-[#79A871] font-medium">In Stock & Ready to Ship</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              aria-label="Share product"
              className="p-2 rounded-full text-[#8F7872] hover:text-[#4A3B36] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close details"
              className="p-2 rounded-full text-[#8F7872] hover:text-[#4A3B36] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2-Column Split */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: PRODUCT ARTWORK & TRUST */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-[#EFE7DE] bg-[#FAF7F2]">
                <ProductArtwork
                  imageKey={product.image}
                  name={product.name}
                  category={product.categoryLabel}
                  className="w-full h-full"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#4A3B36] text-[#FAF7F2] px-2.5 py-1 rounded-full text-[10px] font-heading font-medium uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Handcrafted artisan notice if present */}
              {product.artisanNote && (
                <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EFE7DE] text-xs text-[#76605B] font-light flex items-start gap-2.5">
                  <Scissors className="w-4 h-4 text-[#D98DA4] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium font-heading text-[#4A3B36] block mb-0.5">Artisan Note</span>
                    {product.artisanNote}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: PURCHASE MODULE */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Title & Rating */}
              <div>
                <div className="flex items-center gap-1.5 text-xs mb-1">
                  <div className="flex text-[#FFB703]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-medium text-[#4A3B36]">{product.rating.toFixed(1)}</span>
                  <span className="text-[#8F7872] font-light">({product.reviewCount} customer reviews)</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] tabular-nums">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-[#8F7872] line-through tabular-nums font-light">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-medium font-heading text-[#79A871] bg-[#EAF2E8] px-2 py-0.5 rounded-full">
                      {product.discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#8C6A64] font-light leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Variant / Color Selector */}
              {product.variants.length > 0 && (
                <div>
                  <label className="block text-xs font-medium font-heading text-[#453430] uppercase tracking-wider mb-2">
                    Selected Shade: <span className="text-[#C97A91] capitalize font-normal">{selectedVariant.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant.name === v.name;
                      return (
                        <button
                          key={v.name}
                          onClick={() => setSelectedVariant(v)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-light border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C97A91] bg-[#FBF0EB] text-[#453430]'
                              : 'border-[#EFE7DE] bg-white text-[#8C6A64] hover:border-[#C97A91]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: v.hex }}
                          />
                          <span>{v.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes (for apparel / rompers) */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-xs font-medium font-heading text-[#453430] uppercase tracking-wider mb-2">
                    Size: <span className="text-[#C97A91] font-normal">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1 rounded-xl text-xs font-medium font-heading border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#453430] bg-[#453430] text-[#FAF7F2]'
                              : 'border-[#EFE7DE] bg-white text-[#453430] hover:border-[#C97A91]'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Primary CTAs */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Stepper */}
                  <div className="flex items-center border border-[#EFE7DE] rounded-full bg-[#FAF7F2] px-2 py-0.5">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#453430] hover:bg-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-heading font-medium text-xs tabular-nums text-[#453430]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#453430] hover:bg-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Toggle Wishlist"
                    title={isFavorite ? 'Saved to Wishlist' : 'Save to Wishlist'}
                    className={`w-10 h-10 rounded-full border border-[#EFE7DE] flex items-center justify-center transition-all cursor-pointer ${
                      isFavorite ? 'bg-[#FBF0EB] text-[#C97A91]' : 'bg-white text-[#8C6A64] hover:text-[#C97A91]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Primary Buy Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-4 rounded-full bg-[#C97A91] hover:bg-[#B66980] text-white font-heading font-medium text-xs tracking-wide transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Add to Bag</span>
                    <span>♡</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3 px-4 rounded-full bg-[#453430] hover:bg-[#322522] text-[#FAF7F2] font-heading font-medium text-xs tracking-wide transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Buy Now · ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                  </button>
                </div>
              </div>

              {/* Gift Wrap & Note Option */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EFE7DE] space-y-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium font-heading text-[#453430]">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="w-4 h-4 rounded-sm text-[#C97A91] focus:ring-[#C97A91] accent-[#C97A91]"
                  />
                  <Gift className="w-3.5 h-3.5 text-[#C97A91]" />
                  <span>Add Luxury Gift Wrap & Handwritten Gold Note (+₹49)</span>
                </label>

                {giftWrap && (
                  <div className="pl-6 animate-in fade-in duration-200">
                    <textarea
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your sweet message for their card (max 120 characters)..."
                      maxLength={120}
                      rows={2}
                      className="w-full p-2.5 text-xs font-light bg-white rounded-xl border border-[#EFE7DE] text-[#453430] placeholder:text-[#8C6A64]/60 focus:outline-hidden focus:border-[#C97A91]"
                    />
                    <span className="text-[10px] text-[#8C6A64] text-right block">
                      {giftNote.length}/120 characters
                    </span>
                  </div>
                )}
              </div>

              {/* PIN Code Delivery Estimator */}
              <div className="pt-2">
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN code..."
                    maxLength={6}
                    className="flex-1 px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#EFE7DE] rounded-xl text-[#453430] font-light placeholder:text-[#8C6A64]/60 focus:outline-hidden focus:border-[#C97A91]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white hover:bg-[#FAF7F2] text-[#453430] border border-[#EFE7DE] rounded-xl text-xs font-medium font-heading transition-colors cursor-pointer"
                  >
                    Check PIN
                  </button>
                </form>

                {deliveryResult && (
                  <p className="text-xs text-[#79A871] font-medium mt-1.5 flex items-center gap-1.5 animate-in fade-in">
                    <Truck className="w-3.5 h-3.5" />
                    <span>{deliveryResult}</span>
                  </p>
                )}
              </div>

              {/* Materials & Care Specifications */}
              <div className="pt-4 border-t border-[#EFE7DE] space-y-2 text-xs font-light text-[#8C6A64]">
                <div>
                  <strong className="text-[#453430] font-heading font-medium">Materials:</strong> {product.materials}
                </div>
                {product.dimensions && (
                  <div>
                    <strong className="text-[#453430] font-heading font-medium">Dimensions:</strong> {product.dimensions}
                  </div>
                )}
                {product.careInstructions && (
                  <div>
                    <strong className="text-[#453430] font-heading font-medium">Care Instructions:</strong> {product.careInstructions}
                  </div>
                )}
              </div>

            </div>

          </div>

          {/* Related Products row */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#EFE7DE]">
              <h3 className="font-heading text-base font-medium text-[#453430] mb-4">
                You May Also Adore
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }, 100);
                    }}
                    className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EFE7DE] hover:border-[#C97A91] transition-all cursor-pointer flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white overflow-hidden border border-[#EFE7DE] shrink-0">
                      <ProductArtwork
                        imageKey={rel.image}
                        name={rel.name}
                        category={rel.categoryLabel}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-medium font-heading text-[#453430] truncate">{rel.name}</p>
                      <p className="text-xs text-[#C97A91] font-medium tabular-nums">₹{rel.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
