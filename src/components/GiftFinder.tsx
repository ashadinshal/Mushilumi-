import React, { useState, useMemo } from 'react';
import { Gift, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { MascotBunny } from './MascotBunny';

interface GiftFinderProps {
  products: Product[];
}

type RecipientOption = 'all' | 'her' | 'him' | 'couple' | 'baby' | 'bestie';
type OccasionOption = 'all' | 'birthday' | 'anniversary' | 'valentines' | 'just_because';
type BudgetOption = 'all' | 'under-299' | 'under-499' | 'under-999' | '1499-plus';

export const GiftFinder: React.FC<GiftFinderProps> = ({ products }) => {
  const [recipient, setRecipient] = useState<RecipientOption>('her');
  const [occasion, setOccasion] = useState<OccasionOption>('birthday');
  const [budget, setBudget] = useState<BudgetOption>('all');

  const recipients: { id: RecipientOption; label: string; icon: string }[] = [
    { id: 'her', label: 'For Her', icon: '🌸' },
    { id: 'him', label: 'For Him', icon: '🧸' },
    { id: 'couple', label: 'Couples', icon: '💕' },
    { id: 'baby', label: 'Baby', icon: '🍼' },
    { id: 'bestie', label: 'Bestie', icon: '✨' },
    { id: 'all', label: 'Anyone', icon: '🎁' },
  ];

  const occasions: { id: OccasionOption; label: string }[] = [
    { id: 'birthday', label: 'Birthday' },
    { id: 'anniversary', label: 'Anniversary' },
    { id: 'valentines', label: "Valentine's" },
    { id: 'just_because', label: 'Just Because' },
    { id: 'all', label: 'Any Occasion' },
  ];

  const budgets: { id: BudgetOption; label: string }[] = [
    { id: 'all', label: 'All Budgets' },
    { id: 'under-299', label: 'Under ₹299' },
    { id: 'under-499', label: 'Under ₹499' },
    { id: 'under-999', label: 'Under ₹999' },
    { id: '1499-plus', label: '₹1,499+ Luxury' },
  ];

  const matchedProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesRecipient =
        recipient === 'all' || p.giftRecipient.includes(recipient as any);

      const matchesOccasion =
        occasion === 'all' || p.giftOccasion.includes(occasion as any);

      let matchesBudget = true;
      if (budget === 'under-299') {
        matchesBudget = p.price <= 299;
      } else if (budget === 'under-499') {
        matchesBudget = p.price <= 499;
      } else if (budget === 'under-999') {
        matchesBudget = p.price <= 999;
      } else if (budget === '1499-plus') {
        matchesBudget = p.price >= 1499;
      }

      return matchesRecipient && matchesOccasion && matchesBudget;
    });
  }, [products, recipient, occasion, budget]);

  const handleReset = () => {
    setRecipient('all');
    setOccasion('all');
    setBudget('all');
  };

  return (
    <section className="py-14 sm:py-18 bg-[#FAF7F2] border-t border-[#EFE7DE]" id="gift-finder">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-medium tracking-wider text-[#8F7872] uppercase block mb-1">
            Gift Assistant
          </span>
          <h2 className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] tracking-tight">
            Looking for Something Special?
          </h2>
          <p className="text-xs sm:text-sm text-[#76605B] mt-1 font-light">
            Find the sweetest gift tailored for their personality and your budget.
          </p>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-2xl border border-[#EFE7DE] p-5 sm:p-7 max-w-3xl mx-auto mb-10 shadow-2xs">
          <div className="space-y-5">
            
            {/* Recipient */}
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-[#8F7872] mb-2">
                Recipient
              </span>
              <div className="flex flex-wrap gap-1.5">
                {recipients.map((r) => {
                  const isSelected = recipient === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRecipient(r.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#4A3B36] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] text-[#4A3B36] hover:bg-[#FBF0EB]'
                      }`}
                    >
                      <span className="text-sm">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-[#8F7872] mb-2">
                Occasion
              </span>
              <div className="flex flex-wrap gap-1.5">
                {occasions.map((o) => {
                  const isSelected = occasion === o.id;
                  return (
                    <button
                      key={o.id}
                      onClick={() => setOccasion(o.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#D98DA4] text-white'
                          : 'bg-[#FAF7F2] text-[#4A3B36] hover:bg-[#FBF0EB]'
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div>
              <span className="block text-[11px] font-medium uppercase tracking-wider text-[#8F7872] mb-2">
                Budget
              </span>
              <div className="flex flex-wrap gap-1.5">
                {budgets.map((b) => {
                  const isSelected = budget === b.id;
                  return (
                    <button
                      key={b.id}
                      onClick={() => setBudget(b.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#8F7872] text-white'
                          : 'bg-[#FAF7F2] text-[#4A3B36] hover:bg-[#FBF0EB]'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="mt-5 pt-3.5 border-t border-[#EFE7DE] flex items-center justify-between text-xs text-[#8F7872]">
            <span>
              Found <strong className="text-[#4A3B36] font-semibold">{matchedProducts.length}</strong> matching cute finds
            </span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-[#D98DA4] hover:underline font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Results */}
        {matchedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {matchedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#EFE7DE] p-8 text-center max-w-sm mx-auto">
            <MascotBunny pose="empty-cart" size={80} className="mx-auto mb-2 opacity-80" />
            <p className="text-sm font-medium text-[#453430]">No exact matches</p>
            <button
              onClick={handleReset}
              className="mt-3 px-4 py-1.5 bg-[#C97A91] text-white rounded-full text-xs font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
