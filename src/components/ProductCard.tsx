import React from 'react';
import { Heart, Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { ProductArtwork } from './ProductArtwork';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, openProductModal, addToCart } = useShop();
  const isFavorite = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => openProductModal(product)}
      className="group relative bg-white rounded-2xl border border-[#EFE7DE] overflow-hidden transition-all duration-300 hover:shadow-sm hover:border-[#D98DA4]/60 cursor-pointer flex flex-col justify-between"
    >
      {/* Media Slot */}
      <div className="relative aspect-square w-full bg-[#FAF7F2] overflow-hidden">
        <ProductArtwork
          imageKey={product.image}
          name={product.name}
          category={product.categoryLabel}
          className="w-full h-full"
        />

        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-[#453430] text-[#FAF7F2] px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide uppercase">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isFavorite ? 'Saved to wishlist' : 'Save to wishlist'}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#453430] hover:text-[#C97A91] shadow-2xs hover:scale-105 active:scale-95 transition-all z-10"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isFavorite ? 'fill-[#C97A91] text-[#C97A91]' : 'text-[#8C6A64]'
            }`}
          />
        </button>

        {/* Quick Add Button */}
        <div className="absolute bottom-2.5 right-2.5 z-10 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to bag`}
            className="flex items-center gap-1 bg-[#C97A91] hover:bg-[#B5677E] text-white px-2.5 py-1 rounded-full text-[11px] font-medium shadow-xs transition-transform active:scale-95"
          >
            <Plus className="w-3 h-3" />
            <span className="hidden xs:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[11px] text-[#8F7872] font-light">
          <span>{product.categoryLabel}</span>
          <div className="flex items-center gap-1 text-[#4A3B36]">
            <Star className="w-3 h-3 fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-medium tabular-nums">{product.rating.toFixed(1)}</span>
            <span className="text-[#8F7872] font-light">({product.reviewCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-[#4A3B36] leading-snug line-clamp-2 group-hover:text-[#C97A91] transition-colors">
          {product.name}
        </h3>

        {/* Price & Variants */}
        <div className="pt-2 border-t border-[#EFE7DE] flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-medium font-heading text-[#4A3B36] tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#8F7872] line-through tabular-nums font-light">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {product.variants.length > 1 && (
            <div className="flex items-center gap-1">
              {product.variants.slice(0, 3).map((v, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: v.hex }}
                  title={v.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
