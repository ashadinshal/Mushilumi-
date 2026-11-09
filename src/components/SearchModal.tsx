import React, { useState, useMemo } from 'react';
import { Search, X, Star, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, openProductModal } = useShop();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isSearchOpen) return null;

  const popularTags = ['Bouquet', 'Bunny', 'Mug', 'Romper', 'Couple', 'Sunflower', 'Hamper'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#453430]/35 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-[#EFE7DE] max-w-2xl w-full p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#EFE7DE] pb-4">
          <Search className="w-4 h-4 text-[#8C6A64] absolute left-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search crochet flowers, bunny plushies, baby rompers..."
            autoFocus
            className="w-full pl-9 pr-9 py-2 text-sm font-light text-[#453430] placeholder:text-[#8C6A64]/60 focus:outline-hidden"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#8C6A64] hover:text-[#453430] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={closeSearch}
              className="p-1 rounded-full text-[#8C6A64] hover:text-[#453430] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="pt-3 pb-2 flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-medium text-[#8C6A64] uppercase tracking-wider font-heading">
            Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-xs font-light px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#8C6A64] hover:bg-[#FBF0EB] hover:text-[#453430] transition-colors cursor-pointer border border-[#EFE7DE]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
          {query.trim() && searchResults.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#8C6A64] font-light">
              No adorable finds matching &ldquo;{query}&rdquo;. Try another cute keyword!
            </div>
          ) : (
            searchResults.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  closeSearch();
                  openProductModal(product);
                }}
                className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#FAF7F2] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#EFE7DE] overflow-hidden shrink-0">
                    <ProductArtwork
                      imageKey={product.image}
                      name={product.name}
                      category={product.categoryLabel}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="truncate">
                    <p className="font-heading text-xs sm:text-sm font-medium text-[#453430] group-hover:text-[#C97A91] transition-colors truncate">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2 text-[11px] text-[#8C6A64] font-light">
                      <span>{product.categoryLabel}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-[#453430] font-normal">
                        <Star className="w-3 h-3 fill-[#FFB703] text-[#FFB703]" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pl-3">
                  <span className="font-heading text-xs sm:text-sm font-medium text-[#453430] tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8C6A64] group-hover:translate-x-1 group-hover:text-[#C97A91] transition-all" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
