import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductArtwork } from './ProductArtwork';
import { MascotBunny } from './MascotBunny';

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, closeWishlist, toggleWishlist, addToCart, openProductModal } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={closeWishlist}
        className="absolute inset-0 bg-[#573B35]/40 backdrop-blur-2xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 z-50 flex max-w-full justify-end pointer-events-auto">
        <div className="w-full max-w-md sm:w-md bg-white border-l border-[#EFE7DE] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EFE7DE] flex items-center justify-between bg-[#FAF7F2]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white border border-[#EFE7DE] text-[#C97A91] flex items-center justify-center">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <div>
                <h2 className="font-heading text-base font-medium text-[#453430]">
                  Saved Treasures
                </h2>
                <span className="text-[11px] text-[#8C6A64] font-light">
                  {wishlist.length} cuties on your wishlist
                </span>
              </div>
            </div>

            <button
              onClick={closeWishlist}
              aria-label="Close wishlist"
              className="p-1.5 rounded-full text-[#8C6A64] hover:text-[#453430] hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-[#FAF7F2]/40">
            {wishlistProducts.length > 0 ? (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl border border-[#EFE7DE] bg-white items-center justify-between"
                >
                  <div
                    onClick={() => {
                      closeWishlist();
                      openProductModal(product);
                    }}
                    className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                  >
                    <div className="w-16 h-16 rounded-xl bg-[#FAF7F2] border border-[#EFE7DE] overflow-hidden shrink-0">
                      <ProductArtwork
                        imageKey={product.image}
                        name={product.name}
                        category={product.categoryLabel}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="truncate">
                      <p className="font-heading text-xs sm:text-sm font-medium text-[#453430] truncate">
                        {product.name}
                      </p>
                      <p className="text-xs font-medium text-[#C97A91] tabular-nums mt-0.5">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => addToCart(product, 1)}
                      aria-label="Add to bag"
                      className="p-2 bg-[#C97A91] hover:bg-[#B66980] text-white rounded-full transition-transform active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Remove from wishlist"
                      className="p-2 text-[#8C6A64] hover:text-[#C97A91] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <MascotBunny pose="heart" size={120} />
                <h3 className="font-heading text-base font-medium text-[#453430]">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-[#8C6A64] font-light max-w-xs leading-relaxed">
                  Tap the heart on any lovely product to save it here for later.
                </p>
                <button
                  onClick={closeWishlist}
                  className="mt-2 px-5 py-2.5 bg-[#C97A91] hover:bg-[#B66980] text-white rounded-full text-xs font-medium font-heading transition-colors cursor-pointer"
                >
                  Start Saving Cuties ♡
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-5 border-t border-[#EFE7DE] bg-white">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => addToCart(p, 1));
                  closeWishlist();
                }}
                className="w-full py-3 px-4 rounded-full bg-[#453430] hover:bg-[#322522] text-[#FAF7F2] font-heading font-medium text-xs tracking-wide transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Move All to Bag ♡</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
