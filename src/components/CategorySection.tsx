import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '../types';
import { MascotBunny } from './MascotBunny';

interface CategorySectionProps {
  onSelectCategory: (categoryId: Category) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'crochet' as Category,
      title: 'Crochet Cuties',
      description: 'Handmade everlasting flowers, plushies & joyful keychains.',
      pose: 'flower' as const,
      itemCount: '5 Pieces',
      iconEmoji: '🌸'
    },
    {
      id: 'baby' as Category,
      title: 'Baby Corner',
      description: 'Organic waffle rompers, knitted overalls & gentle teethers.',
      pose: 'heart' as const,
      itemCount: '3 Styles',
      iconEmoji: '🍼'
    },
    {
      id: 'couple' as Category,
      title: 'Couple Goals',
      description: 'Magnetic hands plushies, matching bracelets & keepsakes.',
      pose: 'gift' as const,
      itemCount: '3 Sets',
      iconEmoji: '💕'
    },
    {
      id: 'lifestyle' as Category,
      title: 'Pookie Essentials',
      description: 'Marshmallow cloud ceramic mugs & ambient night lights.',
      pose: 'celebrate' as const,
      itemCount: '3 Finds',
      iconEmoji: '☁️'
    },
    {
      id: 'hampers' as Category,
      title: 'Little Surprises',
      description: 'Luxury curated trunks with satin ribbon bows & wax seals.',
      pose: 'gift' as const,
      itemCount: '2 Crates',
      iconEmoji: '🎀'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-[#EFE7DE]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-medium tracking-wider text-[#8F7872] uppercase block mb-1">
            Collections
          </span>
          <h2 className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] tracking-tight">
            Find Your Kind of Cute
          </h2>
          <p className="text-xs sm:text-sm text-[#76605B] mt-1 font-light">
            Thoughtful little worlds filled with warmth and handcrafted surprises.
          </p>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group bg-[#FAF7F2] rounded-2xl border border-[#EFE7DE] p-5 hover:border-[#C97A91]/60 transition-all cursor-pointer flex flex-col justify-between ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xl mb-1.5 inline-block">{cat.iconEmoji}</span>
                  <span className="text-[10px] font-medium text-[#8C6A64] uppercase block">
                    {cat.itemCount}
                  </span>
                  <h3 className="text-base font-semibold font-heading text-[#453430] mt-0.5 group-hover:text-[#C97A91] transition-colors">
                    {cat.title}
                  </h3>
                </div>

                <div className="w-14 h-14 shrink-0 opacity-90 group-hover:scale-105 transition-transform">
                  <MascotBunny pose={cat.pose} size={56} />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EFE7DE] flex items-center justify-between">
                <p className="text-xs text-[#735048] font-normal max-w-[75%] leading-relaxed">
                  {cat.description}
                </p>

                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#453430] group-hover:bg-[#C97A91] group-hover:text-white transition-all shadow-2xs shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
