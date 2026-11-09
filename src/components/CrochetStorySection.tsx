import React from 'react';
import { Scissors, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { MascotBunny } from './MascotBunny';

interface CrochetStorySectionProps {
  crochetProducts: Product[];
  onExploreCrochet: () => void;
}

export const CrochetStorySection: React.FC<CrochetStorySectionProps> = ({
  crochetProducts,
  onExploreCrochet,
}) => {
  return (
    <section className="py-14 sm:py-18 bg-[#FAF7F2] border-t border-[#EFE7DE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Story Banner */}
        <div className="bg-white rounded-2xl border border-[#EFE7DE] p-6 sm:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[11px] font-medium tracking-wider text-[#8F7872] uppercase block">
                The Moschi Studio Craft
              </span>

              <h2 className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] leading-snug">
                Made With Love, <span className="text-[#C97A91]">Stitch by Stitch.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#76605B] font-light leading-relaxed max-w-xl">
                Every blossom in our everlasting bouquets and each little amigurumi plushie is individually hand-hooked using hypoallergenic 5-ply milk cotton yarn. Forever blooms that never wither.
              </p>

              {/* Artisan highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-[#453430]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#79A871] shrink-0" />
                  <span>4–6 Hours of needlework per piece</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#79A871] shrink-0" />
                  <span>100% Milk Cotton Yarn</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#79A871] shrink-0" />
                  <span>Zero watering, lasts forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#79A871] shrink-0" />
                  <span>Supports local women artisans</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onExploreCrochet}
                  className="inline-flex items-center gap-1.5 bg-[#453430] hover:bg-[#322421] text-[#FAF7F2] px-5 py-2.5 rounded-full text-xs font-medium transition-colors cursor-pointer"
                >
                  <span>Explore Handmade Treasures</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mascot */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 bg-[#FAF7F2] rounded-2xl border border-[#EFE7DE] flex flex-col items-center justify-center p-4">
                <MascotBunny pose="flower" size={130} />
              </div>
            </div>

          </div>
        </div>

        {/* Featured Items */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg sm:text-xl font-medium font-heading text-[#453430]">
              Featured Crochet Cuties
            </h3>
            <button
              onClick={onExploreCrochet}
              className="text-xs font-medium text-[#C97A91] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all ({crochetProducts.length})</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {crochetProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
