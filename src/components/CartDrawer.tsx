import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  Gift,
  Check,
  Tag,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductArtwork } from './ProductArtwork';
import { MascotBunny } from './MascotBunny';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingFee,
    discountAmount,
    total,
    freeShippingThreshold,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    promoError,
    openCheckout,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyPromoCode(couponInput);
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-[#4A3B36]/40 backdrop-blur-2xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 z-50 flex max-w-full justify-end pointer-events-auto">
        <div className="w-full max-w-md sm:w-md bg-white border-l border-[#EFE7DE] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 overflow-hidden">
          
          {/* DRAWER HEADER */}
          <div className="p-4 sm:p-5 border-b border-[#EFE7DE] flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border border-[#EFE7DE] text-[#C97A91] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-heading text-base font-medium text-[#4A3B36]">
                  Your Cute Bag
                </h2>
                <span className="text-[11px] text-[#8F7872] font-light">
                  {cart.reduce((s, i) => s + i.quantity, 0)} items in bag
                </span>
              </div>
            </div>

            <button
              onClick={closeCart}
              aria-label="Close cart drawer"
              className="p-1.5 rounded-full text-[#8F7872] hover:text-[#4A3B36] hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* FREE SHIPPING PROGRESS BAR */}
          <div className="bg-[#FAF7F2] px-4 sm:px-5 py-3 border-b border-[#EFE7DE]">
            <div className="flex items-center justify-between text-xs font-medium text-[#4A3B36] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C97A91]" />
                {amountNeeded === 0 ? (
                  <span className="text-[#79A871]">Yay! You unlocked FREE shipping ♡</span>
                ) : (
                  <span className="font-light text-[#76605B]">Add ₹{amountNeeded.toLocaleString('en-IN')} more for Free Delivery</span>
                )}
              </span>
              <span className="text-[10px] text-[#8F7872] tabular-nums">{freeShippingProgress}%</span>
            </div>
            
            <div className="w-full bg-[#EFE7DE] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C97A91] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* CART ITEMS LIST */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-[#FAF7F2]/40">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${index}`}
                  className="flex gap-3 p-3 rounded-2xl border border-[#EFE7DE] bg-white relative group"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-xl bg-[#FAF7F2] border border-[#EFE7DE] overflow-hidden shrink-0">
                    <ProductArtwork
                      imageKey={item.product.image}
                      name={item.product.name}
                      category={item.product.categoryLabel}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading text-xs sm:text-sm font-medium text-[#4A3B36] truncate leading-tight flex-1 min-w-0 pr-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(index)}
                          aria-label={`Remove ${item.product.name} from bag`}
                          title="Remove item"
                          className="shrink-0 p-1.5 text-[#8F7872] hover:text-[#C97A91] hover:bg-[#FBF0EB] rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant & Size details */}
                      <div className="text-[11px] text-[#8C6A64] font-light mt-0.5 space-x-2">
                        {item.selectedVariant && (
                          <span>Shade: {item.selectedVariant.name}</span>
                        )}
                        {item.selectedSize && (
                          <span>· Size: {item.selectedSize}</span>
                        )}
                      </div>

                      {item.giftWrap && (
                        <div className="text-[10px] text-[#C97A91] font-medium flex items-center gap-1 mt-0.5">
                          <Gift className="w-3 h-3" />
                          <span>Includes Gift Wrap (+₹49)</span>
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#EFE7DE]">
                      <div className="flex items-center border border-[#EFE7DE] rounded-full bg-[#FAF7F2] px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#453430] hover:bg-white rounded-full transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium font-heading tabular-nums text-[#453430]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#453430] hover:bg-white rounded-full transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-heading text-xs sm:text-sm font-medium text-[#453430] tabular-nums">
                        ₹{((item.product.price + (item.giftWrap ? 49 : 0)) * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <MascotBunny pose="empty-cart" size={120} />
                <h3 className="font-heading text-base font-medium text-[#453430]">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#8C6A64] font-light max-w-xs leading-relaxed">
                  Discover handcrafted crochet flowers, baby rompers, or couple charms to fill it with happiness.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 px-5 py-2.5 bg-[#C97A91] hover:bg-[#B66980] text-white rounded-full text-xs font-medium font-heading transition-colors cursor-pointer"
                >
                  Explore Cute Finds ♡
                </button>
              </div>
            )}
          </div>

          {/* DRAWER FOOTER: COUPON & BILL BREAKDOWN */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EFE7DE] bg-white space-y-3.5">
              
              {/* Promo Code Input */}
              {!appliedPromo ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-[#8C6A64]" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Try code CUTE10..."
                      className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF7F2] border border-[#EFE7DE] rounded-xl text-[#453430] uppercase placeholder:capitalize focus:outline-hidden focus:border-[#C97A91]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#FBF0EB] text-[#453430] border border-[#EFE7DE] rounded-xl text-xs font-medium font-heading transition-colors cursor-pointer shrink-0"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-[#EAF2E8] border border-[#C8E6C9] px-3 py-2 rounded-xl text-xs text-[#2E7D32]">
                  <span className="font-medium font-heading flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Coupon &apos;{appliedPromo}&apos; applied (-₹{discountAmount})
                  </span>
                  <button
                    onClick={removePromoCode}
                    className="text-xs text-[#D32F2F] hover:underline font-medium cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}

              {promoError && (
                <p className="text-[11px] text-[#D32F2F]">{promoError}</p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs font-light text-[#8C6A64] pt-1 border-t border-[#EFE7DE]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-normal text-[#453430]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#79A871] font-medium">
                    <span>Discount</span>
                    <span className="tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="tabular-nums font-normal text-[#453430]">
                    {shippingFee === 0 ? (
                      <span className="text-[#79A871] font-medium">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-medium font-heading text-[#453430] pt-2 border-t border-[#EFE7DE]">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-[#C97A91]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 px-4 rounded-full bg-[#C97A91] hover:bg-[#B66980] text-white font-heading font-medium text-xs tracking-wide transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#8C6A64] font-light">
                🔒 Safe & encrypted 256-bit SSL checkout · Doorstep delivery
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
