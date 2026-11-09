import React, { useState } from 'react';
import { BANNER_IMAGE_URL } from './MascotBunny';

import tulipImg from '../assets/images/crochet_tulip_bouquet_1794201480930.jpg';
import bunnyImg from '../assets/images/mochi_bunny_plushie_1794201482322.jpg';
import coupleBearsImg from '../assets/images/couple_magnetic_bears_1794201482838.jpg';
import romperImg from '../assets/images/baby_bunny_romper_1794201482513.jpg';
import mugImg from '../assets/images/cloud_marshmallow_mug_1794201483012.jpg';

const REAL_PRODUCT_IMAGES: Record<string, string> = {
  bouquet_eternal: tulipImg,
  mochi_bunny_heart: bunnyImg,
  couple_keychains_magnetic: coupleBearsImg,
  baby_bunny_romper: romperImg,
  cloud_mug: mugImg,
};

interface ProductArtworkProps {
  imageKey: string;
  name: string;
  category: string;
  className?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({
  imageKey,
  name,
  category,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const realPhoto = REAL_PRODUCT_IMAGES[imageKey];

  // If a genuine high-res studio photograph is available, render real product photography!
  if (realPhoto && !imgError) {
    return (
      <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-[#FAF7F2] ${className}`}>
        <img
          src={realPhoto}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-medium text-[#76605B] border border-[#EFE7DE] shadow-2xs pointer-events-none">
          {category}
        </div>
      </div>
    );
  }

  // Visual artwork presets for all other catalog items
  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2] p-4 select-none ${className}`}>
      {/* Background ambient circular glow */}
      <div className="absolute w-40 h-40 rounded-full bg-[#FBF0EB] filter blur-xl pointer-events-none" />

      {imageKey === 'bouquet_eternal' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Paper wrapping */}
          <polygon points="50,150 110,150 125,90 35,90" fill="#EAD9C6" stroke="#573B35" strokeWidth="2" strokeLinejoin="round" />
          <path d="M 40 90 Q 80 100 120 90" fill="#E5CFB9" stroke="#573B35" strokeWidth="1.5" />
          {/* Stems & Leaves */}
          <path d="M 80 90 L 80 50" stroke="#79A871" strokeWidth="3" strokeLinecap="round" />
          <path d="M 65 90 L 60 55" stroke="#79A871" strokeWidth="3" strokeLinecap="round" />
          <path d="M 95 90 L 100 55" stroke="#79A871" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="68" cy="65" rx="10" ry="5" transform="rotate(-30 68 65)" fill="#93C78B" stroke="#573B35" strokeWidth="1.5" />
          <ellipse cx="92" cy="65" rx="10" ry="5" transform="rotate(30 92 65)" fill="#93C78B" stroke="#573B35" strokeWidth="1.5" />
          {/* Center Tulip */}
          <g transform="translate(80, 45)">
            <ellipse cx="-7" cy="0" rx="9" ry="14" fill="#F8CCD7" stroke="#573B35" strokeWidth="1.8" />
            <ellipse cx="7" cy="0" rx="9" ry="14" fill="#F8CCD7" stroke="#573B35" strokeWidth="1.8" />
            <ellipse cx="0" cy="2" rx="11" ry="16" fill="#FFAEBC" stroke="#573B35" strokeWidth="2" />
            {/* Crochet yarn texture stitch */}
            <path d="M 0 -8 L 0 10" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="1.5 2" opacity="0.7" />
          </g>
          {/* Left Daisy */}
          <g transform="translate(56, 52) scale(0.85)">
            <circle cx="0" cy="-12" r="5" fill="#FFFFFF" stroke="#573B35" strokeWidth="1.5" />
            <circle cx="11" cy="-4" r="5" fill="#FFFFFF" stroke="#573B35" strokeWidth="1.5" />
            <circle cx="7" cy="10" r="5" fill="#FFFFFF" stroke="#573B35" strokeWidth="1.5" />
            <circle cx="-7" cy="10" r="5" fill="#FFFFFF" stroke="#573B35" strokeWidth="1.5" />
            <circle cx="-11" cy="-4" r="5" fill="#FFFFFF" stroke="#573B35" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="6" fill="#FBC02D" stroke="#573B35" strokeWidth="1.5" />
          </g>
          {/* Right Peach Tulip */}
          <g transform="translate(104, 52) scale(0.85)">
            <ellipse cx="-6" cy="0" rx="8" ry="13" fill="#FFE2C6" stroke="#573B35" strokeWidth="1.8" />
            <ellipse cx="6" cy="0" rx="8" ry="13" fill="#FFE2C6" stroke="#573B35" strokeWidth="1.8" />
            <ellipse cx="0" cy="2" rx="10" ry="15" fill="#FFC899" stroke="#573B35" strokeWidth="1.8" />
          </g>
          {/* Pink Ribbon Knot */}
          <path d="M 72 110 C 65 105 60 115 72 118 Z" fill="#D98DA4" stroke="#573B35" strokeWidth="1.5" />
          <path d="M 88 110 C 95 105 100 115 88 118 Z" fill="#D98DA4" stroke="#573B35" strokeWidth="1.5" />
          <circle cx="80" cy="114" r="3.5" fill="#C46D87" stroke="#573B35" strokeWidth="1.5" />
          <path d="M 76 116 Q 70 128 66 132" stroke="#D98DA4" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 84 116 Q 90 128 94 132" stroke="#D98DA4" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {imageKey === 'crochet_sunflower' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Terracotta Pot */}
          <polygon points="56,145 104,145 112,105 48,105" fill="#D98E72" stroke="#573B35" strokeWidth="2" strokeLinejoin="round" />
          <rect x="44" y="98" width="72" height="10" rx="3" fill="#E8A186" stroke="#573B35" strokeWidth="2" />
          {/* Yarn earth soil */}
          <ellipse cx="80" cy="102" rx="30" ry="4" fill="#6D4C41" />
          {/* Bobbing spring stem */}
          <path d="M 80 98 Q 75 80 82 68 Q 76 56 80 48" stroke="#79A871" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="70" cy="80" rx="8" ry="4" transform="rotate(-30 70 80)" fill="#81C784" stroke="#573B35" strokeWidth="1.5" />
          {/* Sunflower Head */}
          <g transform="translate(80, 48)">
            {/* Petals */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <ellipse
                key={deg}
                cx="0"
                cy="-22"
                rx="5"
                ry="9"
                transform={`rotate(${deg})`}
                fill="#FFCA28"
                stroke="#573B35"
                strokeWidth="1.4"
              />
            ))}
            {/* Chocolate crochet center */}
            <circle cx="0" cy="0" r="16" fill="#6D4C41" stroke="#573B35" strokeWidth="2" />
            <circle cx="0" cy="0" r="13" fill="#5D4037" stroke="#8D6E63" strokeWidth="1.5" strokeDasharray="2 3" />
            {/* Cute Smiley Face */}
            <circle cx="-5" cy="-2" r="1.8" fill="#FFF5E8" />
            <circle cx="5" cy="-2" r="1.8" fill="#FFF5E8" />
            <circle cx="-7" cy="4" r="2.2" fill="#FFAEBC" opacity="0.8" />
            <circle cx="7" cy="4" r="2.2" fill="#FFAEBC" opacity="0.8" />
            <path d="M -3 3 Q 0 7 3 3" stroke="#FFF5E8" strokeWidth="1.4" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      )}

      {imageKey === 'boba_keychain' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Keyring */}
          <circle cx="80" cy="24" r="12" fill="none" stroke="#D4AF37" strokeWidth="3" />
          <circle cx="80" cy="40" r="4" fill="none" stroke="#D4AF37" strokeWidth="2" />
          <line x1="80" y1="44" x2="80" y2="60" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2 2" />
          {/* Strawberry Charm */}
          <g transform="translate(108, 80) scale(0.9)">
            <path d="M 0 -12 C 12 -12 18 2 0 22 C -18 2 -12 -12 0 -12 Z" fill="#FF5252" stroke="#573B35" strokeWidth="1.8" />
            <circle cx="-3" cy="-2" r="0.8" fill="#FFE082" />
            <circle cx="4" cy="3" r="0.8" fill="#FFE082" />
            <circle cx="-2" cy="8" r="0.8" fill="#FFE082" />
            {/* Green calyx */}
            <path d="M -8 -12 Q 0 -16 8 -12 L 0 -8 Z" fill="#66BB6A" stroke="#573B35" strokeWidth="1.5" />
          </g>
          {/* Boba Cup Charm */}
          <g transform="translate(68, 70)">
            {/* Straw */}
            <line x1="12" y1="-14" x2="12" y2="10" stroke="#FFA726" strokeWidth="4" strokeLinecap="round" />
            {/* Cup */}
            <polygon points="0,5 24,5 21,48 3,48" fill="#F8BBD0" stroke="#573B35" strokeWidth="2" strokeLinejoin="round" />
            {/* Domed lid */}
            <path d="M -2 5 Q 12 -6 26 5 Z" fill="#FFFFFF" stroke="#573B35" strokeWidth="1.8" opacity="0.9" />
            {/* Boba pearls */}
            <circle cx="7" cy="40" r="2.5" fill="#4E342E" />
            <circle cx="14" cy="42" r="2.5" fill="#4E342E" />
            <circle cx="10" cy="34" r="2.5" fill="#4E342E" />
            <circle cx="17" cy="36" r="2.5" fill="#4E342E" />
            {/* Heart on cup */}
            <path d="M 12 18 C 10 15 7 17 8 20 C 10 23 12 25 12 25 C 12 25 14 23 16 20 C 17 17 14 15 12 18 Z" fill="#E91E63" />
          </g>
        </svg>
      )}

      {imageKey === 'froggy_mushroom' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Froggy Body */}
          <ellipse cx="80" cy="115" rx="34" ry="28" fill="#A5D6A7" stroke="#573B35" strokeWidth="2.5" />
          {/* Cute belly */}
          <ellipse cx="80" cy="120" rx="18" ry="14" fill="#E8F5E9" />
          {/* Froggy Eyes */}
          <ellipse cx="62" cy="85" rx="12" ry="12" fill="#A5D6A7" stroke="#573B35" strokeWidth="2" />
          <circle cx="62" cy="85" r="5" fill="#573B35" />
          <circle cx="60" cy="83" r="1.5" fill="#FFFFFF" />

          <ellipse cx="98" cy="85" rx="12" ry="12" fill="#A5D6A7" stroke="#573B35" strokeWidth="2" />
          <circle cx="98" cy="85" r="5" fill="#573B35" />
          <circle cx="96" cy="83" r="1.5" fill="#FFFFFF" />

          {/* Mushroom Beret */}
          <path d="M 50 82 Q 80 50 110 82 Z" fill="#EF5350" stroke="#573B35" strokeWidth="2.2" />
          <ellipse cx="80" cy="82" rx="30" ry="6" fill="#E57373" stroke="#573B35" strokeWidth="1.8" />
          {/* White spots */}
          <circle cx="68" cy="70" r="3.5" fill="#FFFFFF" />
          <circle cx="92" cy="68" r="4.5" fill="#FFFFFF" />
          <circle cx="80" cy="62" r="3" fill="#FFFFFF" />

          {/* Cute Froggy Smile & Blush */}
          <circle cx="64" cy="104" r="4" fill="#FFAEBC" opacity="0.8" />
          <circle cx="96" cy="104" r="4" fill="#FFAEBC" opacity="0.8" />
          <path d="M 74 105 Q 80 110 86 105" stroke="#573B35" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      )}

      {imageKey === 'baby_bunny_romper' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Romper Body */}
          <g transform="translate(80, 85)">
            {/* Hood with bunny ears */}
            <path d="M -22 -40 C -22 -60 22 -60 22 -40 Z" fill="#EDE6DD" stroke="#573B35" strokeWidth="2" />
            {/* Bunny ears on hood */}
            <path d="M -16 -50 C -24 -75 -10 -75 -8 -52 Z" fill="#EDE6DD" stroke="#573B35" strokeWidth="2" />
            <path d="M -15 -52 C -20 -68 -12 -68 -10 -53 Z" fill="#FAD4D8" />

            <path d="M 16 -50 C 24 -75 10 -75 8 -52 Z" fill="#EDE6DD" stroke="#573B35" strokeWidth="2" />
            <path d="M 15 -52 C 20 -68 12 -68 10 -53 Z" fill="#FAD4D8" />

            {/* Jumpsuit waffle texture */}
            <path
              d="M -30 -38 L 30 -38 L 36 28 L 12 55 L 2 32 L -2 32 L -12 55 L -36 28 Z"
              fill="#EDE6DD"
              stroke="#573B35"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Front snaps */}
            <line x1="0" y1="-34" x2="0" y2="28" stroke="#573B35" strokeWidth="1.2" strokeDasharray="2 3" />
            <circle cx="0" cy="-22" r="2" fill="#D7BA9D" />
            <circle cx="0" cy="-6" r="2" fill="#D7BA9D" />
            <circle cx="0" cy="10" r="2" fill="#D7BA9D" />
            {/* Kangaroo pocket with heart */}
            <path d="M -12 4 L 12 4 L 10 20 L -10 20 Z" fill="#E2DACF" stroke="#573B35" strokeWidth="1.5" />
            <path d="M 0 10 C -2 8 -5 10 -4 13 C -2 16 0 17 0 17 C 0 17 2 16 4 13 C 5 10 2 8 0 10 Z" fill="#D98DA4" />
          </g>
        </svg>
      )}

      {imageKey === 'baby_bear_overalls' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Overalls */}
          <g transform="translate(80, 85)">
            {/* Beanie with bear ears */}
            <path d="M -24 -46 C -24 -65 24 -65 24 -46 Z" fill="#D7BA9D" stroke="#573B35" strokeWidth="2" />
            <circle cx="-18" cy="-60" r="5.5" fill="#D7BA9D" stroke="#573B35" strokeWidth="1.8" />
            <circle cx="18" cy="-60" r="5.5" fill="#D7BA9D" stroke="#573B35" strokeWidth="1.8" />
            {/* Suspenders */}
            <line x1="-14" y1="-32" x2="-14" y2="4" stroke="#B08D6D" strokeWidth="4" />
            <line x1="14" y1="-32" x2="14" y2="4" stroke="#B08D6D" strokeWidth="4" />
            <circle cx="-14" cy="2" r="2.5" fill="#6D4C41" />
            <circle cx="14" cy="2" r="2.5" fill="#6D4C41" />
            {/* Ribbed Pants */}
            <path d="M -26 4 L 26 4 L 28 48 L 10 48 L 4 18 L -4 18 L -10 48 L -28 48 Z" fill="#D7BA9D" stroke="#573B35" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Cute bear face patch on tummy */}
            <circle cx="0" cy="-12" r="9" fill="#FFF5E8" stroke="#573B35" strokeWidth="1.5" />
            <circle cx="-3" cy="-13" r="1.2" fill="#573B35" />
            <circle cx="3" cy="-13" r="1.2" fill="#573B35" />
            <ellipse cx="0" cy="-10" rx="1.5" ry="1" fill="#D7BA9D" />
          </g>
        </svg>
      )}

      {imageKey === 'baby_rattle' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Beechwood ring */}
          <circle cx="80" cy="98" r="32" fill="none" stroke="#E5C7A5" strokeWidth="12" />
          <circle cx="80" cy="98" r="32" fill="none" stroke="#573B35" strokeWidth="1.8" />
          {/* Crochet bunny ears attached to ring */}
          <g transform="translate(80, 66)">
            {/* Left ear */}
            <path d="M -16 0 C -28 -35 -6 -40 -4 -4 Z" fill="#F8CCD7" stroke="#573B35" strokeWidth="2" />
            <path d="M -14 -4 C -22 -28 -8 -30 -6 -6 Z" fill="#FFAEBC" />
            {/* Right ear */}
            <path d="M 16 0 C 28 -35 6 -40 4 -4 Z" fill="#F8CCD7" stroke="#573B35" strokeWidth="2" />
            <path d="M 14 -4 C 22 -28 8 -30 6 -6 Z" fill="#FFAEBC" />
            {/* Ring wrap collar */}
            <rect x="-18" y="-6" width="36" height="12" rx="4" fill="#FCE8E2" stroke="#573B35" strokeWidth="1.8" />
            <circle cx="0" cy="0" r="3" fill="#D98DA4" />
          </g>
        </svg>
      )}

      {imageKey === 'couple_keychains_magnetic' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Dual Keychain lock */}
          <circle cx="56" cy="30" r="9" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
          <line x1="56" y1="40" x2="56" y2="55" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2 2" />

          <circle cx="104" cy="30" r="9" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
          <line x1="104" y1="40" x2="104" y2="55" stroke="#D4AF37" strokeWidth="2" strokeDasharray="2 2" />

          {/* Left Cream Bunny */}
          <g transform="translate(56, 92) scale(0.7)">
            <ellipse cx="0" cy="20" rx="22" ry="24" fill="#FFFDF9" stroke="#573B35" strokeWidth="2.8" />
            <ellipse cx="0" cy="-10" rx="26" ry="22" fill="#FFFDF9" stroke="#573B35" strokeWidth="2.8" />
            <path d="M -15 -25 C -25 -55 -5 -50 -5 -25 Z" fill="#FFFDF9" stroke="#573B35" strokeWidth="2.5" />
            <path d="M 15 -25 C 25 -55 5 -50 5 -25 Z" fill="#FFFDF9" stroke="#573B35" strokeWidth="2.5" />
            {/* Blush & eyes */}
            <circle cx="-10" cy="-10" r="2.5" fill="#573B35" />
            <circle cx="10" cy="-10" r="2.5" fill="#573B35" />
            <circle cx="-15" cy="-4" r="3" fill="#FFAEBC" />
            {/* Arm reaching right with magnet */}
            <ellipse cx="18" cy="18" rx="8" ry="5" fill="#FFFDF9" stroke="#573B35" strokeWidth="2" />
          </g>

          {/* Magnetic Heart Connection Sparkle in Middle */}
          <g transform="translate(80, 105)">
            <path d="M 0 -8 C -4 -12 -10 -10 -9 -5 C -8 0 0 7 0 7 C 0 7 8 0 9 -5 C 10 -10 4 -12 0 -8 Z" fill="#FF4081" />
            <path d="M -2 -14 L 0 -10 L 2 -14 Z" fill="#FFE28A" />
          </g>

          {/* Right Cocoa Teddy Bear */}
          <g transform="translate(104, 92) scale(0.7)">
            <ellipse cx="0" cy="20" rx="24" ry="24" fill="#A76E69" stroke="#573B35" strokeWidth="2.8" />
            <ellipse cx="0" cy="-10" rx="26" ry="22" fill="#A76E69" stroke="#573B35" strokeWidth="2.8" />
            <circle cx="-20" cy="-26" r="9" fill="#A76E69" stroke="#573B35" strokeWidth="2.5" />
            <circle cx="20" cy="-26" r="9" fill="#A76E69" stroke="#573B35" strokeWidth="2.5" />
            <circle cx="-10" cy="-10" r="2.5" fill="#573B35" />
            <circle cx="10" cy="-10" r="2.5" fill="#573B35" />
            <ellipse cx="0" cy="-4" rx="7" ry="5" fill="#FCE8E2" />
            <ellipse cx="0" cy="-6" rx="3" ry="2" fill="#573B35" />
            {/* Arm reaching left */}
            <ellipse cx="-18" cy="18" rx="8" ry="5" fill="#A76E69" stroke="#573B35" strokeWidth="2" />
          </g>
        </svg>
      )}

      {imageKey === 'couple_bracelets' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Onyx and Rose gold intertwined cords */}
          <ellipse cx="70" cy="80" rx="38" ry="28" fill="none" stroke="#37323E" strokeWidth="4" transform="rotate(-15 70 80)" />
          <ellipse cx="90" cy="80" rx="38" ry="28" fill="none" stroke="#D98DA4" strokeWidth="4" transform="rotate(15 90 80)" />
          {/* Joining stainless magnetic heart pendant */}
          <g transform="translate(80, 80) scale(1.2)">
            {/* Left Half (Dark) */}
            <path d="M 0 -8 C -4 -12 -10 -10 -9 -5 C -8 0 0 7 0 7 Z" fill="#37323E" stroke="#573B35" strokeWidth="1" />
            {/* Right Half (Rose Gold) */}
            <path d="M 0 -8 C 4 -12 10 -10 9 -5 C 8 0 0 7 0 7 Z" fill="#D98DA4" stroke="#573B35" strokeWidth="1" />
            <line x1="0" y1="-8" x2="0" y2="7" stroke="#FFFFFF" strokeWidth="1" />
          </g>
          {/* Sliding knot details */}
          <rect x="42" y="94" width="8" height="6" rx="2" fill="#37323E" />
          <rect x="110" y="94" width="8" height="6" rx="2" fill="#D98DA4" />
        </svg>
      )}

      {imageKey === 'couple_sweatshirts' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Cream Sweatshirt */}
          <g transform="translate(62, 85) scale(0.75)">
            <path d="M -30 -35 L 30 -35 L 38 45 L -38 45 Z" fill="#EFE6DD" stroke="#573B35" strokeWidth="2.5" />
            {/* Sun embroidery */}
            <circle cx="-12" cy="-12" r="6" fill="#FBC02D" stroke="#573B35" strokeWidth="1.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={deg}
                x1={-12 + Math.cos((deg * Math.PI) / 180) * 8}
                y1={-12 + Math.sin((deg * Math.PI) / 180) * 8}
                x2={-12 + Math.cos((deg * Math.PI) / 180) * 11}
                y2={-12 + Math.sin((deg * Math.PI) / 180) * 11}
                stroke="#FBC02D"
                strokeWidth="1.5"
              />
            ))}
          </g>
          {/* Mocha Sweatshirt */}
          <g transform="translate(98, 92) scale(0.75)">
            <path d="M -30 -35 L 30 -35 L 38 45 L -38 45 Z" fill="#A76E69" stroke="#573B35" strokeWidth="2.5" />
            {/* Crescent Moon embroidery */}
            <path d="M 12 -18 C 16 -18 19 -14 19 -10 C 19 -5 15 -2 11 -2 C 14 -4 15 -8 15 -10 C 15 -14 13 -17 12 -18 Z" fill="#FFF5E8" stroke="#573B35" strokeWidth="1" />
          </g>
        </svg>
      )}

      {imageKey === 'cloud_mug' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Cloud handle */}
          <path d="M 105 75 C 130 65 130 115 105 105" fill="none" stroke="#FFFDF9" strokeWidth="12" strokeLinecap="round" />
          <path d="M 105 75 C 130 65 130 115 105 105" fill="none" stroke="#573B35" strokeWidth="2" strokeLinecap="round" />
          {/* Chubby Cloud Mug Body */}
          <g transform="translate(70, 90)">
            <rect x="-35" y="-20" width="70" height="50" rx="14" fill="#FFFDF9" stroke="#573B35" strokeWidth="2.4" />
            {/* Strawberry lid */}
            <ellipse cx="0" cy="-22" rx="38" ry="7" fill="#FF5252" stroke="#573B35" strokeWidth="2" />
            {/* Strawberry knob */}
            <path d="M 0 -36 C 6 -36 8 -26 0 -22 C -8 -26 -6 -36 0 -36 Z" fill="#FF5252" stroke="#573B35" strokeWidth="1.5" />
            <path d="M -4 -35 Q 0 -40 4 -35" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Cute sleeping face on mug */}
            <path d="M -16 6 Q -12 10 -8 6" stroke="#573B35" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M 8 6 Q 12 10 16 6" stroke="#573B35" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="-18" cy="9" r="3" fill="#FFAEBC" opacity="0.8" />
            <circle cx="18" cy="9" r="3" fill="#FFAEBC" opacity="0.8" />
          </g>
        </svg>
      )}

      {imageKey === 'bunny_lamp' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-lg">
          {/* Warm Amber Glow Effect */}
          <circle cx="80" cy="85" r="50" fill="#FFE7C7" opacity="0.45" filter="blur(10px)" />
          {/* Silicone Squishy Bunny */}
          <ellipse cx="80" cy="105" rx="36" ry="30" fill="#FFF9F2" stroke="#573B35" strokeWidth="2.2" />
          {/* Floppy ears */}
          <path d="M 60 78 C 50 45 68 45 70 76 Z" fill="#FFF9F2" stroke="#573B35" strokeWidth="2" />
          <path d="M 62 74 C 55 52 65 52 67 72 Z" fill="#FFE2C6" />

          <path d="M 100 78 C 110 45 92 45 90 76 Z" fill="#FFF9F2" stroke="#573B35" strokeWidth="2" />
          <path d="M 98 74 C 105 52 95 52 93 72 Z" fill="#FFE2C6" />

          {/* Sweet sleepy eyes */}
          <path d="M 68 100 Q 73 105 78 100" stroke="#573B35" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 82 100 Q 87 105 92 100" stroke="#573B35" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Warm Peach Blush */}
          <circle cx="66" cy="106" r="4.5" fill="#FFCCBC" opacity="0.9" />
          <circle cx="94" cy="106" r="4.5" fill="#FFCCBC" opacity="0.9" />
          {/* Wooden / Silicone Base */}
          <ellipse cx="80" cy="132" rx="30" ry="5" fill="#EAD9C6" stroke="#573B35" strokeWidth="1.8" />
        </svg>
      )}

      {imageKey === 'laptop_sleeve' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Quilted Sherpa Sleeve */}
          <g transform="translate(80, 80)">
            <rect x="-55" y="-36" width="110" height="72" rx="10" fill="#DFD3C3" stroke="#573B35" strokeWidth="2.2" />
            {/* Quilt stitching pattern */}
            <line x1="-35" y1="-36" x2="35" y2="36" stroke="#C2B29F" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="-15" y1="-36" x2="55" y2="34" stroke="#C2B29F" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="15" y1="-36" x2="-55" y2="34" stroke="#C2B29F" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="35" y1="-36" x2="-35" y2="36" stroke="#C2B29F" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Top gold zipper */}
            <line x1="-50" y1="-36" x2="50" y2="-36" stroke="#D4AF37" strokeWidth="3" />
            {/* Ribbon Bow Charm */}
            <g transform="translate(38, -34)">
              <circle cx="0" cy="0" r="3" fill="#D98DA4" />
              <path d="M 0 0 C 4 -6 8 0 0 2 Z" fill="#D98DA4" />
              <path d="M 0 0 C -4 -6 -8 0 0 2 Z" fill="#D98DA4" />
            </g>
          </g>
        </svg>
      )}

      {imageKey === 'hamper_ultimate' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-lg">
          {/* Scalloped Pastel Pink Gift Trunk */}
          <g transform="translate(80, 95)">
            <rect x="-50" y="-20" width="100" height="50" rx="8" fill="#FADADD" stroke="#573B35" strokeWidth="2.4" />
            {/* Gold latch */}
            <rect x="-8" y="-12" width="16" height="12" rx="3" fill="#FFE28A" stroke="#573B35" strokeWidth="1.5" />
            {/* Crinkle paper peeking out */}
            <path d="M -40 -20 Q -30 -35 -20 -20 Q -10 -35 0 -20 Q 10 -35 20 -20 Q 30 -35 40 -20 Z" fill="#FFF9F0" />
            {/* Mini Tulip peeking out */}
            <g transform="translate(-20, -32) scale(0.6)">
              <ellipse cx="0" cy="0" rx="10" ry="14" fill="#FFAEBC" stroke="#573B35" strokeWidth="2" />
            </g>
            {/* Mini Mochi Bunny peeking out */}
            <g transform="translate(18, -32) scale(0.55)">
              <ellipse cx="0" cy="0" rx="16" ry="14" fill="#FFFFFF" stroke="#573B35" strokeWidth="2" />
              <circle cx="-6" cy="-2" r="2" fill="#573B35" />
              <circle cx="6" cy="-2" r="2" fill="#573B35" />
              <circle cx="-9" cy="3" r="2.5" fill="#FFAEBC" />
              <circle cx="9" cy="3" r="2.5" fill="#FFAEBC" />
              <path d="M -10 -14 C -16 -30 -6 -30 -4 -14 Z" fill="#FFFFFF" stroke="#573B35" strokeWidth="2" />
              <path d="M 10 -14 C 16 -30 6 -30 4 -14 Z" fill="#FFFFFF" stroke="#573B35" strokeWidth="2" />
            </g>
            {/* Oversized Satin Bow */}
            <path d="M -18 -20 C -30 -32 -20 -44 -6 -24 Z" fill="#D98DA4" stroke="#573B35" strokeWidth="1.8" />
            <path d="M 18 -20 C 30 -32 20 -44 6 -24 Z" fill="#D98DA4" stroke="#573B35" strokeWidth="1.8" />
            <circle cx="0" cy="-22" r="5" fill="#C46D87" stroke="#573B35" strokeWidth="1.8" />
            <path d="M -4 -20 Q -12 -5 -16 10" stroke="#D98DA4" strokeWidth="3" strokeLinecap="round" />
            <path d="M 4 -20 Q 12 -5 16 10" stroke="#D98DA4" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      )}

      {imageKey === 'hamper_baby' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Woven Willow Basket */}
          <g transform="translate(80, 95)">
            <polygon points="-45,30 45,30 52,-15 -52,-15" fill="#D7BA9D" stroke="#573B35" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Cross weave */}
            <line x1="-40" y1="-10" x2="40" y2="25" stroke="#B08D6D" strokeWidth="1.5" />
            <line x1="-40" y1="25" x2="40" y2="-10" stroke="#B08D6D" strokeWidth="1.5" />
            {/* Baby Items inside */}
            <rect x="-30" y="-30" width="25" height="20" rx="4" fill="#EDE6DD" stroke="#573B35" strokeWidth="1.5" />
            {/* Beechwood rattle head */}
            <circle cx="20" cy="-24" r="14" fill="#E5C7A5" stroke="#573B35" strokeWidth="1.8" />
            <path d="M 14 -34 C 8 -46 22 -46 18 -34 Z" fill="#F8CCD7" stroke="#573B35" strokeWidth="1.5" />
            <path d="M 26 -34 C 20 -46 34 -46 30 -34 Z" fill="#F8CCD7" stroke="#573B35" strokeWidth="1.5" />
          </g>
        </svg>
      )}

      {imageKey === 'claw_clips' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Jumbo Cloud Claw Clip */}
          <g transform="translate(70, 75) rotate(-15)">
            <path d="M -35 -12 C -30 -25 -10 -25 0 -12 C 10 -25 30 -25 35 -12 C 45 5 25 22 0 18 C -25 22 -45 5 -35 -12 Z" fill="#F5C6CB" stroke="#573B35" strokeWidth="2.2" />
            <circle cx="-16" cy="-4" r="2.5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="16" cy="-4" r="2.5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="0" cy="4" r="3" fill="#D98DA4" />
          </g>
          {/* Mini Milk Tea Clip */}
          <g transform="translate(105, 105) rotate(20) scale(0.65)">
            <path d="M -35 -12 C -30 -25 -10 -25 0 -12 C 10 -25 30 -25 35 -12 C 45 5 25 22 0 18 C -25 22 -45 5 -35 -12 Z" fill="#D7BA9D" stroke="#573B35" strokeWidth="2.4" />
          </g>
        </svg>
      )}

      {imageKey === 'silk_scrunchies' && (
        <svg viewBox="0 0 160 160" className="w-4/5 h-4/5 max-h-48 drop-shadow-md">
          {/* Ruffled Pure Mulberry Silk Scrunchie */}
          <g transform="translate(80, 80)">
            {/* Outer fluffy ruffles */}
            <path
              d="M 0 -45 C 20 -48 35 -35 42 -20 C 50 0 45 25 32 38 C 15 50 -15 50 -32 38 C -45 25 -50 0 -42 -20 C -35 -35 -20 -48 0 -45 Z"
              fill="#FAD2E1"
              stroke="#573B35"
              strokeWidth="2.2"
            />
            {/* Inner hole */}
            <ellipse cx="0" cy="0" rx="16" ry="14" fill="#FFF5E8" stroke="#573B35" strokeWidth="2" />
            {/* Silk Sheen lines */}
            <path d="M -22 -20 Q -10 -35 15 -32" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            <path d="M 24 -10 Q 34 10 18 28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
            {/* Little Moschi gold heart tag */}
            <circle cx="28" cy="24" r="6" fill="#FFE28A" stroke="#573B35" strokeWidth="1.2" />
            <text x="28" y="27" textAnchor="middle" fontSize="7" fill="#573B35" fontWeight="bold">♡</text>
          </g>
        </svg>
      )}

      {/* Subtle handcrafted tag pill */}
      <div className="absolute top-3 left-3 bg-[#FFF5E8]/80 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] font-medium text-[#A76E69] tracking-wide uppercase">
        {category}
      </div>
    </div>
  );
};
