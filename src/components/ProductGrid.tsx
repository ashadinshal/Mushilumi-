import React, { useState, useMemo } from 'react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES_LIST } from '../data/products';
import { ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  initialCategory?: Category;
  title?: string;
  description?: string;
  showFilters?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  initialCategory = 'all',
  title = "Everybody's Favourite",
  description = "The handcrafted cuties everyone is falling in love with.",
  showFilters = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [products, selectedCategory, sortBy]);

  return (
    <section className="py-12 sm:py-16" id="shop-catalog">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-medium tracking-wider text-[#8F7872] uppercase block mb-1">
              Handpicked Collections
            </span>
            <h2 className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#76605B] mt-1 font-light max-w-lg">
              {description}
            </p>
          </div>

          {/* Sort Control */}
          {showFilters && (
            <div className="flex items-center gap-2 self-start md:self-auto">
              <span className="text-xs text-[#8F7872] font-light hidden sm:inline flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#C97A91]" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="bg-white border border-[#EFE7DE] text-xs font-light text-[#4A3B36] rounded-xl px-3 py-1.5 outline-hidden focus:border-[#C97A91] cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured Curations</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          )}
        </div>

        {/* Clean Filter Tabs */}
        {showFilters && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as Category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#453430] text-[#FAF7F2]'
                      : 'bg-white text-[#735048] border border-[#EFE7DE] hover:border-[#C97A91] hover:text-[#453430]'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* 4-Col Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/70 rounded-2xl border border-[#EFE7DE] p-8 max-w-sm mx-auto">
            <p className="text-sm font-medium text-[#453430]">No items in this collection</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-3 px-4 py-1.5 bg-[#C97A91] text-white rounded-full text-xs font-medium"
            >
              Show All Cuties
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
