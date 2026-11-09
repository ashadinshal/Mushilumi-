import React, { useState, useEffect, useRef } from 'react';
import { Gift, ArrowRight, ShieldCheck, Truck, Scissors, Star, Sparkles, Pause, Play } from 'lucide-react';
import { BANNER_IMAGE_URL } from './MascotBunny';
import { PRODUCTS } from '../data/products';
import { Product, Category } from '../types';

import tulipImg from '../assets/images/crochet_tulip_bouquet_1794201480930.jpg';
import bunnyImg from '../assets/images/mochi_bunny_plushie_1794201482322.jpg';
import coupleBearsImg from '../assets/images/couple_magnetic_bears_1794201482838.jpg';
import romperImg from '../assets/images/baby_bunny_romper_1794201482513.jpg';

interface HeroSectionProps {
  onExploreClick: () => void;
  onGiftFinderClick: () => void;
  onSelectProduct?: (product: Product) => void;
  onSelectCategory?: (category: Category) => void;
}

interface OrbitItem {
  id: string;
  product: Product;
  photo: string;
  badge: string;
  label: string;
  price: string;
  category: Category;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onGiftFinderClick,
  onSelectProduct,
  onSelectCategory,
}) => {
  // 4 curated star products for the rotary showcase
  const rotatingItems: OrbitItem[] = [
    {
      id: 'crochet-eternal-bouquet',
      product: PRODUCTS.find((p) => p.id === 'crochet-eternal-bouquet') || PRODUCTS[0],
      photo: tulipImg,
      badge: 'Crochet Cuties',
      label: 'Eternal Tulip Bouquet',
      price: '₹1,199',
      category: 'crochet',
    },
    {
      id: 'crochet-mochi-bunny',
      product: PRODUCTS.find((p) => p.id === 'crochet-mochi-bunny') || PRODUCTS[1],
      photo: bunnyImg,
      badge: 'Signature Mascot',
      label: 'Mochi Plushie with Heart',
      price: '₹899',
      category: 'crochet',
    },
    {
      id: 'couple-holding-hands-plushies',
      product: PRODUCTS.find((p) => p.id === 'couple-holding-hands-plushies') || PRODUCTS[8],
      photo: coupleBearsImg,
      badge: 'Couple Goals',
      label: 'Magnetic Couple Bears',
      price: '₹749',
      category: 'couple',
    },
    {
      id: 'baby-bunny-ears-romper',
      product: PRODUCTS.find((p) => p.id === 'baby-bunny-ears-romper') || PRODUCTS[5],
      photo: romperImg,
      badge: 'Baby Corner',
      label: 'Baby Bunny Romper',
      price: '₹1,299',
      category: 'baby',
    },
  ];

  // Rotation animation state
  const [angle, setAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedMobileIndex, setSelectedMobileIndex] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Smooth 60fps orbit loop (slow and calming: 360 degrees in ~28 seconds)
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        if (!isPaused && hoveredIndex === null) {
          setAngle((prev) => (prev + (delta * 0.013)) % 360);
        }
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPaused, hoveredIndex]);

  // Winter Ice / Snow Particle Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Create 36 subtle ice sparkles & snowflakes
    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.5 + 0.25,
      speedX: (Math.random() - 0.5) * 0.3,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.5 + 0.25,
      isSparkle: Math.random() > 0.6,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.sway += p.swaySpeed;
        p.y += p.speedY;
        p.x += Math.sin(p.sway) * 0.4 + p.speedX;

        // Wrap around bounds
        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        ctx.save();
        ctx.globalAlpha = p.opacity;

        if (p.isSparkle) {
          // Delicate 4-point ice sparkle
          ctx.strokeStyle = '#FFFFFF';
          ctx.fillStyle = '#E0F2FE';
          ctx.lineWidth = 1;
          const s = p.radius * 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x, p.y + s);
          ctx.moveTo(p.x - s, p.y);
          ctx.lineTo(p.x + s, p.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft fluffy winter snowflake
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleProductClick = (item: OrbitItem) => {
    if (onSelectProduct && item.product) {
      onSelectProduct(item.product);
    } else if (onSelectCategory) {
      onSelectCategory(item.category);
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-18 bg-gradient-to-b from-[#FAF7F2] via-[#FBF0EB]/30 to-[#FAF7F2]">
      {/* Winter Ice Sprinkles Particle Layer */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 opacity-80"
      />

      {/* Decorative Winter Frost Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E0F2FE]/25 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#FBF0EB]/40 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: HERO COPY & CTAs */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            
            {/* Winter Santa Holiday Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#EFE7DE] text-[11px] font-medium text-[#76605B] shadow-2xs backdrop-blur-xs">
              <span className="text-[#C97A91]">❄</span>
              <span>Winter Wonderland Collection</span>
              <span className="text-[#8F7872]">·</span>
              <span className="text-[#C97A91] font-medium">Santa&apos;s Little Helpers ♡</span>
            </div>

            {/* Main Headline (Refined typography scale with reduced contrast) */}
            <h1 className="text-2xl sm:text-3xl lg:text-[2.6rem] font-medium font-heading tracking-tight text-[#4A3B36] leading-[1.2] [text-wrap:balance]">
              Little Treasures, <br className="hidden sm:inline" />
              <span className="text-[#C97A91] font-semibold">
                Big Warm
              </span>{' '}
              Happy Feelings!
            </h1>

            {/* Sub-description in soft warm mocha */}
            <p className="text-xs sm:text-sm text-[#76605B] max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Enter our dreamy winter boutique of hand-stitched crochet blooms, plush companions, baby outfits, and romantic matching keepsakes. Handcrafted with love to bring warmth to frosty days.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 pt-1">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C97A91] hover:bg-[#B5677E] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-2xs transition-all active:scale-98 cursor-pointer"
              >
                <span>Explore Cute Finds</span>
                <span className="text-xs">♡</span>
              </button>

              <button
                onClick={onGiftFinderClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FBF0EB] text-[#4A3B36] border border-[#EFE7DE] px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#C97A91]" />
                <span>Gift Finder</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#8F7872]" />
              </button>
            </div>

            {/* Subtle Reviews Proof Bar */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-[#8F7872] font-light">
              <div className="flex items-center gap-1">
                <div className="flex text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="font-medium text-[#4A3B36]">4.95</span>
                <span>(1,400+ reviews)</span>
              </div>
              <span>·</span>
              <span>100% Artisan Handcrafted</span>
            </div>

            {/* Rotary Navigation Pill Strip (Touch-friendly direct navigation for all 4 items) */}
            <div className="pt-3 border-t border-[#EFE7DE]/80">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-[#8F7872] font-medium mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#C97A91]" />
                  <span>Star Orbit:</span>
                </span>
                {rotatingItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedMobileIndex(idx);
                      handleProductClick(item);
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-[#FBF0EB] border border-[#EFE7DE] text-[#4A3B36] hover:text-[#C97A91] transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-[#C97A91] font-medium">{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: ROTATING PRODUCTS AROUND MOSCHILUMII BANNER */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative select-none">
            
            {/* The Orbit Container */}
            <div
              className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[380px] md:h-[380px] flex items-center justify-center"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              
              {/* Subtle Orbital Ellipse Guide Ring */}
              <div className="absolute inset-5 sm:inset-6 rounded-full border border-dashed border-[#C97A91]/25 pointer-events-none animate-pulse" />
              <div className="absolute inset-1 sm:inset-2 rounded-full border border-[#EFE7DE] pointer-events-none" />

              {/* CENTERPIECE: OFFICIAL MOSCHILUMII MASCOT BANNER */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-md border-2 border-white bg-white z-10 group cursor-pointer transition-transform duration-300 hover:scale-[1.03]">
                <img
                  src={BANNER_IMAGE_URL}
                  alt="MoschiLumii Official Mascot Centerpiece"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Cute Winter Santa Holly Accent */}
                <div className="absolute top-1 right-2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9px] font-medium text-[#C97A91] border border-[#EFE7DE] shadow-2xs flex items-center gap-1">
                  <span>❄</span>
                  <span>Winter Mochi</span>
                </div>
              </div>

              {/* 4 ROTATING PRODUCTS ORBITING AROUND CENTER */}
              {rotatingItems.map((item, index) => {
                // Calculate position on the circle (quarter-circle offsets)
                const itemAngle = (angle + index * 90) * (Math.PI / 180);
                // Responsive orbital radius (approx 120px mobile, 155px desktop)
                const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 116 : 152;
                const x = Math.cos(itemAngle) * radius;
                const y = Math.sin(itemAngle) * radius;
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={item.id}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                      transition: isPaused ? 'transform 0.15s ease-out' : 'none',
                    }}
                    className="absolute top-1/2 left-1/2 -mt-7 -ml-7 sm:-mt-8 sm:-ml-8 z-20 group"
                  >
                    <button
                      onClick={() => handleProductClick(item)}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      title={`View ${item.label} (${item.price})`}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 bg-white shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center ${
                        isHovered
                          ? 'border-[#C97A91] ring-4 ring-[#C97A91]/20 scale-110 shadow-lg'
                          : 'border-white hover:border-[#C97A91]'
                      }`}
                    >
                      <img
                        src={item.photo}
                        alt={item.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover select-none"
                      />

                      {/* Small badge dot */}
                      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#C97A91] border border-white" />
                    </button>

                    {/* Rich Interactive Preview Card on Hover or active */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 w-44 bg-white/95 backdrop-blur-md border border-[#EFE7DE] rounded-xl p-2.5 shadow-xl transition-all duration-200 pointer-events-none z-30 ${
                        isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider text-[#C97A91] font-medium block">
                        {item.badge}
                      </span>
                      <p className="text-xs font-medium text-[#4A3B36] truncate leading-tight">
                        {item.label}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="font-semibold text-[#4A3B36]">{item.price}</span>
                        <span className="text-[#C97A91] font-medium flex items-center gap-0.5">
                          <span>View</span>
                          <span>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Orbit Controls (Play/Pause & Status for UX Polish) */}
            <div className="mt-4 flex items-center gap-3 text-xs text-[#8F7872]">
              <button
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Resume rotating products' : 'Pause rotating products'}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EFE7DE] text-[11px] font-medium text-[#76605B] hover:text-[#C97A91] transition-colors cursor-pointer shadow-2xs"
              >
                {isPaused ? <Play className="w-3 h-3 text-[#C97A91]" /> : <Pause className="w-3 h-3 text-[#C97A91]" />}
                <span>{isPaused ? 'Resume Orbit' : 'Pause Orbit'}</span>
              </button>
              <span className="text-[11px] font-light">
                Hover or click any treasure to explore
              </span>
            </div>

          </div>

        </div>

        {/* 4-COLUMN TRUST STRIP */}
        <div className="mt-10 pt-6 border-t border-[#EFE7DE] grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FBF0EB] flex items-center justify-center text-[#C97A91] shrink-0">
              <Scissors className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#4A3B36]">Pure Handcrafted</p>
              <p className="text-[11px] text-[#8F7872] font-light">5-ply milk cotton yarn</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FBF0EB] flex items-center justify-center text-[#C97A91] shrink-0">
              <Truck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#4A3B36]">Free Delivery</p>
              <p className="text-[11px] text-[#8F7872] font-light">On orders ₹999+</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FBF0EB] flex items-center justify-center text-[#C97A91] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#4A3B36]">Safe & Gentle</p>
              <p className="text-[11px] text-[#8F7872] font-light">Organic cotton certified</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FBF0EB] flex items-center justify-center text-[#C97A91] shrink-0">
              <Gift className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#4A3B36]">Personalized</p>
              <p className="text-[11px] text-[#8F7872] font-light">Handwritten gold notes</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
