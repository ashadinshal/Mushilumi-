import React, { useState, useRef } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { CrochetStorySection } from './components/CrochetStorySection';
import { GiftFinder } from './components/GiftFinder';
import { ReviewsSection } from './components/ReviewsSection';
import { InstagramGrid } from './components/InstagramGrid';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';
import { ToastContainer } from './components/ToastContainer';
import { ProductCard } from './components/ProductCard';
import { PRODUCTS } from './data/products';
import { Category } from './types';
import { Heart, Baby, ArrowRight } from 'lucide-react';

function MainShop() {
  const { selectedProduct, closeProductModal, openProductModal } = useShop();
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType | null>(null);

  const shopCatalogRef = useRef<HTMLDivElement>(null);
  const giftFinderRef = useRef<HTMLDivElement>(null);
  const crochetRef = useRef<HTMLDivElement>(null);
  const babyRef = useRef<HTMLDivElement>(null);
  const coupleRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>, sectionId: string) => {
    setActiveSection(sectionId);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigate = (id: string) => {
    if (id === 'hero') scrollToRef(heroRef, 'hero');
    else if (id === 'shop-all') scrollToRef(shopCatalogRef, 'shop-all');
    else if (id === 'crochet') scrollToRef(crochetRef, 'crochet');
    else if (id === 'baby') scrollToRef(babyRef, 'baby');
    else if (id === 'couple') scrollToRef(coupleRef, 'couple');
    else if (id === 'accessories') scrollToRef(shopCatalogRef, 'accessories');
  };

  const handleSelectCategory = (cat: Category) => {
    if (cat === 'crochet') {
      scrollToRef(crochetRef, 'crochet');
    } else if (cat === 'baby') {
      scrollToRef(babyRef, 'baby');
    } else if (cat === 'couple') {
      scrollToRef(coupleRef, 'couple');
    } else {
      scrollToRef(shopCatalogRef, 'shop-all');
    }
  };

  const babyCuties = PRODUCTS.filter((p) => p.category === 'baby');
  const coupleCuties = PRODUCTS.filter((p) => p.category === 'couple');

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3B36] font-sans flex flex-col selection:bg-[#FBF0EB] selection:text-[#C97A91]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 3. Hero Section with Rotating Core Products & Winter Ice Sprinkles */}
      <div ref={heroRef}>
        <HeroSection
          onExploreClick={() => scrollToRef(shopCatalogRef, 'shop-all')}
          onGiftFinderClick={() => scrollToRef(giftFinderRef, 'gift-finder')}
          onSelectProduct={(product) => openProductModal(product)}
          onSelectCategory={handleSelectCategory}
        />
      </div>

      {/* 4. Category Showcase */}
      <CategorySection onSelectCategory={handleSelectCategory} />

      {/* 5. Main Product Catalog */}
      <div ref={shopCatalogRef}>
        <ProductGrid
          products={PRODUCTS}
          title="Curated Favorites"
          description="Handmade crochet flowers, plush companions, and heartfelt surprises."
          showFilters={true}
        />
      </div>

      {/* 6. Handmade Crochet Spotlight */}
      <div ref={crochetRef}>
        <CrochetStorySection
          crochetProducts={PRODUCTS.filter((p) => p.category === 'crochet')}
          onExploreCrochet={() => scrollToRef(shopCatalogRef, 'crochet')}
        />
      </div>

      {/* 7. Baby Corner */}
      <section ref={babyRef} className="py-14 sm:py-18 bg-white border-t border-[#EFE7DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-medium tracking-wider text-[#79A871] uppercase block mb-1">
                GOTS Certified Organic
              </span>
              <h2 className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] tracking-tight">
                Little Outfits for Little Humans
              </h2>
              <p className="text-xs sm:text-sm text-[#76605B] mt-1 max-w-lg font-light">
                Cloud-soft waffle rompers and sensory beechwood teethers engineered for delicate skin.
              </p>
            </div>

            <button
              onClick={() => scrollToRef(shopCatalogRef, 'shop-all')}
              className="text-xs font-medium text-[#79A871] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>View Baby Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
            {babyCuties.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Couple Gifts */}
      <section ref={coupleRef} className="py-14 sm:py-18 bg-[#FAF7F2] border-t border-[#EFE7DE]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-medium tracking-wider text-[#C97A91] uppercase block mb-1">
                Meaningful Keepsakes
              </span>
              <h2 className="text-xl sm:text-2xl font-medium font-heading text-[#4A3B36] tracking-tight">
                Two Hearts, One Little Surprise
              </h2>
              <p className="text-xs sm:text-sm text-[#76605B] mt-1 max-w-lg font-light">
                Thoughtful little gifts for your favourite person. Magnetic plushies and matching bracelets.
              </p>
            </div>

            <button
              onClick={() => scrollToRef(shopCatalogRef, 'shop-all')}
              className="text-xs font-medium text-[#C97A91] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>View Couple Gifts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
            {coupleCuties.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Interactive Gift Finder */}
      <div ref={giftFinderRef}>
        <GiftFinder products={PRODUCTS} />
      </div>

      {/* 10. Reviews */}
      <ReviewsSection />

      {/* 11. Instagram Community */}
      <InstagramGrid />

      {/* 12. Newsletter */}
      <NewsletterSection />

      {/* 13. Footer */}
      <Footer
        onOpenPolicy={(policy) => setSelectedPolicy(policy)}
        onSelectCategory={handleSelectCategory}
        onNavigateHome={() => scrollToRef(heroRef, 'hero')}
      />

      {/* Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={closeProductModal}
      />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <PolicyModal
        type={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainShop />
    </ShopProvider>
  );
}
