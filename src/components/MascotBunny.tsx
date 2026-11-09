import React from 'react';

export type BunnyPose = 'heart' | 'flower' | 'gift' | 'celebrate' | 'empty-cart' | 'original-badge';

interface MascotBunnyProps {
  pose?: BunnyPose;
  size?: number | string;
  className?: string;
  alt?: string;
}

export const BANNER_IMAGE_URL = '/assets/aistudio/Gemini_Generated_Image_ohj52oohj52oohj5_b0568edd.png';

export const MascotBunny: React.FC<MascotBunnyProps> = ({
  pose = 'heart',
  size = 120,
  className = '',
  alt = 'MoschiLumii Bunny Mascot',
}) => {
  // If original badge pose is selected, render the exact uploaded banner asset with circular frame
  if (pose === 'original-badge') {
    return (
      <div 
        className={`relative inline-block rounded-full overflow-hidden shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <img 
          src={BANNER_IMAGE_URL} 
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none"
        />
      </div>
    );
  }

  // Consistent handcrafted vector bunny matching the reference banner
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt}
    >
      <defs>
        {/* Soft shadow */}
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#D98DA4" floodOpacity="0.15" />
        </filter>
        {/* Linear gradients */}
        <linearGradient id="bunnyFur" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#FFF7EE" />
          <stop offset="100%" stopColor="#F9EFEB" />
        </linearGradient>
        <linearGradient id="innerEar" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDEAE6" />
          <stop offset="100%" stopColor="#F8CCD7" />
        </linearGradient>
        <linearGradient id="heartPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5A3B7" />
          <stop offset="100%" stopColor="#E2738E" />
        </linearGradient>
        <linearGradient id="ribbonPink" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFC5D3" />
          <stop offset="100%" stopColor="#E58A9F" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="100" cy="182" rx="46" ry="7" fill="#573B35" fillOpacity="0.08" />

      {/* LEFT EAR */}
      <g>
        <path
          d="M 68 85 C 50 65 38 100 48 135 C 53 150 66 142 66 125 C 66 105 72 95 68 85 Z"
          fill="url(#bunnyFur)"
          stroke="#573B35"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner ear */}
        <path
          d="M 58 95 C 48 105 45 125 52 135 C 56 140 61 135 61 125 C 61 110 63 102 58 95 Z"
          fill="url(#innerEar)"
        />
      </g>

      {/* RIGHT EAR */}
      <g>
        <path
          d="M 132 85 C 150 65 162 100 152 135 C 147 150 134 142 134 125 C 134 105 128 95 132 85 Z"
          fill="url(#bunnyFur)"
          stroke="#573B35"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner ear */}
        <path
          d="M 142 95 C 152 105 155 125 148 135 C 144 140 139 135 139 125 C 139 110 137 102 142 95 Z"
          fill="url(#innerEar)"
        />
      </g>

      {/* BODY */}
      <path
        d="M 72 120 C 65 140 65 170 100 172 C 135 170 135 140 128 120 Z"
        fill="url(#bunnyFur)"
        stroke="#573B35"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* HEAD */}
      <ellipse
        cx="100"
        cy="96"
        rx="40"
        ry="35"
        fill="url(#bunnyFur)"
        stroke="#573B35"
        strokeWidth="3.2"
      />

      {/* HANDCRAFTED STITCH SEAM (Tummy seam) */}
      <path
        d="M 100 136 L 100 162"
        stroke="#573B35"
        strokeWidth="1.6"
        strokeDasharray="2 3"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* BLUSH CHEEKS */}
      <circle cx="75" cy="106" r="6.5" fill="#FFAEBC" opacity="0.65" />
      <circle cx="125" cy="106" r="6.5" fill="#FFAEBC" opacity="0.65" />

      {/* EYES */}
      <g>
        <ellipse cx="82" cy="98" rx="4.5" ry="5.5" fill="#573B35" />
        <circle cx="80.5" cy="95.5" r="1.8" fill="#FFFFFF" />
        <circle cx="84" cy="99.5" r="0.8" fill="#FFFFFF" />

        <ellipse cx="118" cy="98" rx="4.5" ry="5.5" fill="#573B35" />
        <circle cx="116.5" cy="95.5" r="1.8" fill="#FFFFFF" />
        <circle cx="120" cy="99.5" r="0.8" fill="#FFFFFF" />
      </g>

      {/* NOSE AND MOUTH */}
      <g>
        <ellipse cx="100" cy="103" rx="3.5" ry="2.2" fill="#ECAFC0" stroke="#573B35" strokeWidth="1.2" />
        <path
          d="M 96.5 107 C 98 109 100 108 100 105 C 100 108 102 109 103.5 107"
          stroke="#573B35"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      {/* RIBBON BOW ON TOP */}
      <g id="ribbon-bow">
        <path
          d="M 90 67 C 82 62 80 72 88 74 Z"
          fill="url(#ribbonPink)"
          stroke="#573B35"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M 110 67 C 118 62 120 72 112 74 Z"
          fill="url(#ribbonPink)"
          stroke="#573B35"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="70" r="4.2" fill="#E58A9F" stroke="#573B35" strokeWidth="2" />
      </g>

      {/* FEET / PAWS */}
      <g>
        {/* Left foot */}
        <ellipse cx="78" cy="168" rx="14" ry="9" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.8" />
        <circle cx="78" cy="168" r="4.2" fill="#F8CCD7" />
        <circle cx="72" cy="165" r="1.8" fill="#F8CCD7" />
        <circle cx="78" cy="162" r="1.8" fill="#F8CCD7" />
        <circle cx="84" cy="165" r="1.8" fill="#F8CCD7" />

        {/* Right foot */}
        <ellipse cx="122" cy="168" rx="14" ry="9" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.8" />
        <circle cx="122" cy="168" r="4.2" fill="#F8CCD7" />
        <circle cx="116" cy="165" r="1.8" fill="#F8CCD7" />
        <circle cx="122" cy="162" r="1.8" fill="#F8CCD7" />
        <circle cx="128" cy="165" r="1.8" fill="#F8CCD7" />
      </g>

      {/* POSE SPECIFIC PROPS & HANDS */}
      {pose === 'heart' && (
        <g filter="url(#softGlow)">
          {/* Heart being hugged */}
          <path
            d="M 100 128 C 96 118 84 116 78 122 C 70 130 76 142 100 158 C 124 142 130 130 122 122 C 116 116 104 118 100 128 Z"
            fill="url(#heartPink)"
            stroke="#573B35"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Subtle heart highlight */}
          <path
            d="M 83 125 C 80 128 80 133 83 138"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Bunny arms hugging the heart */}
          <ellipse cx="73" cy="136" rx="9" ry="6" transform="rotate(25 73 136)" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.6" />
          <ellipse cx="127" cy="136" rx="9" ry="6" transform="rotate(-25 127 136)" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.6" />
        </g>
      )}

      {pose === 'flower' && (
        <g>
          {/* Crochet Tulip / Daisy */}
          <path d="M 100 150 Q 112 140 115 118" stroke="#79A871" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M 108 135 Q 120 132 122 138" stroke="#79A871" strokeWidth="2.8" strokeLinecap="round" />
          
          {/* Flower bloom */}
          <g transform="translate(115, 115) scale(0.9)">
            <ellipse cx="-8" cy="0" rx="6" ry="8" fill="#F8CCD7" stroke="#573B35" strokeWidth="2" />
            <ellipse cx="8" cy="0" rx="6" ry="8" fill="#F8CCD7" stroke="#573B35" strokeWidth="2" />
            <ellipse cx="0" cy="-6" rx="7" ry="10" fill="#FFAEBC" stroke="#573B35" strokeWidth="2" />
            <circle cx="0" cy="0" r="4.5" fill="#FFE28A" stroke="#573B35" strokeWidth="1.5" />
          </g>

          {/* Arms holding flower */}
          <ellipse cx="76" cy="140" rx="8" ry="6" transform="rotate(15 76 140)" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.6" />
          <ellipse cx="106" cy="140" rx="8" ry="6" transform="rotate(-15 106 140)" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.6" />
        </g>
      )}

      {pose === 'gift' && (
        <g>
          {/* Pastel gift box */}
          <rect x="80" y="125" width="40" height="32" rx="4" fill="#FDE8E2" stroke="#573B35" strokeWidth="2.6" />
          <rect x="77" y="121" width="46" height="8" rx="2" fill="#F8CCD7" stroke="#573B35" strokeWidth="2.4" />
          {/* Gift ribbon */}
          <line x1="100" y1="121" x2="100" y2="157" stroke="#D98DA4" strokeWidth="3.5" />
          <line x1="80" y1="139" x2="120" y2="139" stroke="#D98DA4" strokeWidth="3.5" />
          {/* Bow on box */}
          <path d="M 95 116 C 90 113 90 121 98 121 Z" fill="#D98DA4" stroke="#573B35" strokeWidth="1.5" />
          <path d="M 105 116 C 110 113 110 121 102 121 Z" fill="#D98DA4" stroke="#573B35" strokeWidth="1.5" />

          {/* Arms holding gift */}
          <ellipse cx="74" cy="140" rx="8" ry="6" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.6" />
          <ellipse cx="126" cy="140" rx="8" ry="6" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.6" />
        </g>
      )}

      {pose === 'celebrate' && (
        <g>
          {/* Confetti particles */}
          <path d="M 50 70 L 54 75" stroke="#FFAEBC" strokeWidth="3" strokeLinecap="round" />
          <path d="M 60 50 L 64 54" stroke="#FFE28A" strokeWidth="3" strokeLinecap="round" />
          <path d="M 145 55 L 140 60" stroke="#79A871" strokeWidth="3" strokeLinecap="round" />
          <path d="M 152 75 L 148 80" stroke="#D98DA4" strokeWidth="3" strokeLinecap="round" />
          <circle cx="55" cy="85" r="2.5" fill="#FFE28A" />
          <circle cx="145" cy="90" r="2.5" fill="#FFAEBC" />

          {/* Arms raised up in celebration */}
          <ellipse cx="62" cy="105" rx="8" ry="12" transform="rotate(-40 62 105)" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.8" />
          <ellipse cx="138" cy="105" rx="8" ry="12" transform="rotate(40 138 105)" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.8" />
        </g>
      )}

      {pose === 'empty-cart' && (
        <g>
          {/* Peeking / wondering sparkles */}
          <path d="M 148 68 L 152 75 L 159 79 L 152 83 L 148 90 L 144 83 L 137 79 L 144 75 Z" fill="#FFAEBC" opacity="0.8" />
          <circle cx="158" cy="62" r="2" fill="#FFE28A" />

          {/* Little question mark / heart bubble */}
          <g transform="translate(140, 45) scale(0.8)">
            <ellipse cx="0" cy="0" rx="14" ry="12" fill="#FFFFFF" stroke="#573B35" strokeWidth="2" />
            <path d="M -2 12 L 0 16 L 3 12 Z" fill="#FFFFFF" />
            <text x="0" y="5" textAnchor="middle" fill="#D98DA4" fontSize="14" fontWeight="bold" fontFamily="Fredoka">?</text>
          </g>

          {/* Paws resting on bottom */}
          <ellipse cx="80" cy="138" rx="8" ry="6" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.6" />
          <ellipse cx="120" cy="138" rx="8" ry="6" fill="url(#bunnyFur)" stroke="#573B35" strokeWidth="2.6" />
        </g>
      )}
    </svg>
  );
};
