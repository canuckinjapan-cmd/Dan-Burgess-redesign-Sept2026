import React from 'react';
import danfaceOnly from "@/assets/danface_only-2025.svg";

export const SelectedWorkIllustration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 180 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Background shape for solid white fill inside */}
      <path 
        d="M 15 15 C 50 13, 130 14, 165 15 C 167 45, 166 85, 165 105 C 130 107, 50 106, 15 105 C 13 85, 14 45, 15 15 Z" 
        fill="#FFFFFF" 
      />
      
      {/* Hand-drawn browser mockup background detail */}
      <path 
        d="M 18,22 C 30,16 150,14 162,20 C 170,24 166,104 158,110 C 140,114 30,112 18,104 C 10,98 12,28 18,22 Z" 
        fill="#FFFFFF" 
      />
      
      {/* Hand-drawn accent color background smudge */}
      <path 
        d="M 25,35 C 50,28 110,25 145,28 C 150,45 152,75 145,95 C 110,98 55,95 25,90 Z" 
        fill="#FFF9F5" 
      />

      {/* Browser Main Window Frame with slightly imperfect organic lines */}
      <path 
        d="M 15 15 
           C 50 13, 130 14, 165 15 
           C 167 45, 166 85, 165 105 
           C 130 107, 50 106, 15 105 
           C 13 85, 14 45, 15 15 Z" 
        stroke="#1A1A1A" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Browser Top Header separator */}
      <path 
        d="M 15 32 C 60 31, 120 31, 165 32" 
        stroke="#1A1A1A" 
        strokeWidth="2" 
        strokeLinecap="round"
      />

      {/* Window Controls (Three Dots) */}
      <circle cx="27" cy="23" r="3.5" fill="#FF6A1F" stroke="#1A1A1A" strokeWidth="1.5" />
      <circle cx="39" cy="23" r="3.5" fill="#1A1A1A" />
      <circle cx="51" cy="23" r="3.5" fill="#CCCCCC" stroke="#1A1A1A" strokeWidth="1" />

      {/* Address Bar */}
      <path 
        d="M 64 18 C 95 17, 125 17, 155 18" 
        stroke="#1A1A1A" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />

      {/* Webpage Content Grid */}
      <path 
        d="M 23 40 C 60 39, 110 39, 147 40 C 148 50, 148 52, 147 55 C 110 54, 60 54, 23 55 Z" 
        fill="#1A1A1A" 
        opacity="0.08"
      />
      
      <path d="M 25 65 L 85 65" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 25 74 L 100 74" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 25 83 L 75 83" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />

      {/* Orange Action Button */}
      <path 
        d="M 115 65 
           C 125 64, 135 64, 153 65 
           C 154 71, 154 75, 153 82 
           C 135 83, 125 83, 115 82 
           C 114 75, 114 71, 115 65 Z" 
        fill="#FF6A1F" 
        stroke="#1A1A1A" 
        strokeWidth="2" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 124 73 L 144 73" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

      {/* Arrow Cursor pointing to orange button */}
      <path 
        d="M 134 94 L 128 78 L 141 84 Z" 
        fill="#FFFFFF" 
        stroke="#1A1A1A" 
        strokeWidth="2" 
        strokeLinejoin="round"
      />
      <path d="M 136 88 L 146 100" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

export const BilingualServicesIllustration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 180 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Background Fill to avoid transparency bleed inside bubbles */}
      <path 
        d="M 52 14 C 88 12, 98 38, 94 56 C 90 74, 76 86, 51 84 C 41 83, 33 89, 21 98 C 25 85, 19 75, 14 65 C 6 49, 10 18, 52 14 Z" 
        fill="#FFFFFF" 
      />
      <path 
        d="M 125 28 C 152 26, 168 44, 165 64 C 162 82, 148 90, 128 90 C 120 90, 115 97, 108 104 C 109 94, 105 87, 98 81 C 91 74, 88 58, 95 44 C 102 32, 112 28, 125 28 Z" 
        fill="#FFFFFF" 
      />

      {/* Speach bubble background shadow smudge in accent-orange */}
      <path 
        d="M 125 28 
           C 152 28, 168 45, 165 65 
           C 162 80, 150 90, 130 90 
           C 123 90, 118 96, 112 104 
           C 113 94, 107 88, 101 82 
           C 95 72, 92 58, 98 44 
           C 104 32, 115 28, 125 28 Z" 
        fill="#FFF9F5" 
      />

      {/* Intersecting Speech Bubbles Outlines */}
      
      {/* Right Speech Bubble (English) */}
      <path 
        d="M 125 28 
           C 152 26, 168 44, 165 64 
           C 162 82, 148 90, 128 90 
           C 120 90, 115 97, 108 104 
           C 109 94, 105 87, 98 81 
           C 91 74, 88 58, 95 44 
           C 102 32, 112 28, 125 28 Z" 
        stroke="#1A1A1A" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FFFFFF"
      />

      {/* Left Speech Bubble (Japanese) */}
      <path 
        d="M 52 14 
           C 88 12, 98 38, 94 56 
           C 90 74, 76 86, 51 84 
           C 41 83, 33 89, 21 98 
           C 25 85, 19 75, 14 65 
           C 6 49, 10 18, 52 14 Z" 
        stroke="#1A1A1A" 
        strokeWidth="2.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FFFFFF"
      />

      {/* Left Text: ABC in Playfair Display (Serif) */}
      <text 
        x="51" 
        y="53" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontFamily="Playfair Display, Georgia, serif" 
        fontWeight="800" 
        fontSize="17px" 
        fill="#1A1A1A"
        letterSpacing="-0.2px"
      >
        ABC
      </text>

      {/* Right Text: あいう in Playfair Display / Noto Serif JP */}
      <text 
        x="130" 
        y="62" 
        textAnchor="middle" 
        dominantBaseline="middle"
        fontFamily="'Playfair Display', 'Noto Serif JP', Georgia, serif" 
        fontWeight="800" 
        fontSize="16px" 
        fill="#FF6A1F"
        letterSpacing="0.5px"
      >
        あいう
      </text>
    </svg>
  );
};

export const PricingIllustration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 180 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Background Fill to block page transparency */}
      <path 
        d="M 23 23 C 60 18, 120 18, 157 23 C 163 45, 163 75, 157 97 C 120 102, 60 102, 23 97 C 17 75, 17 45, 23 23 Z" 
        fill="#FFFFFF" 
      />

      {/* Abacus Outer Frame with hand-drawn feel */}
      <path 
        d="M 20 20 
           C 60 17, 120 17, 160 20 
           C 163 45, 163 75, 160 100 
           C 120 103, 60 103, 20 100 
           C 17 75, 17 45, 20 20 Z" 
        stroke="#1A1A1A" 
        strokeWidth="3" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Horizontal Divider Bar */}
      <path 
        d="M 18 45 C 60 44, 120 44, 162 45" 
        stroke="#1A1A1A" 
        strokeWidth="2.5" 
        strokeLinecap="round"
      />

      {/* Vertical Rods */}
      <path d="M 45 20 L 45 100" stroke="#1A1A1A" strokeWidth="1.5" />
      <path d="M 72 20 L 72 100" stroke="#1A1A1A" strokeWidth="1.5" />
      <path d="M 99 20 L 99 100" stroke="#1A1A1A" strokeWidth="1.5" />
      <path d="M 126 20 L 126 100" stroke="#1A1A1A" strokeWidth="1.5" />
      <path d="M 153 20 L 153 100" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Hand-drawn Soroban Beads (Beveled Diamond Shapes) */}
      
      {/* Rod 1 (45) */}
      <polygon points="45,24 51,28 45,32 39,28" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="45,67 51,71 45,75 39,71" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="45,75 51,79 45,83 39,79" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="45,83 51,87 45,91 39,87" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="45,91 51,95 45,99 39,95" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Rod 2 (72) - Active Orange High-Value Bead! */}
      <polygon points="72,33 78,37 72,41 66,37" fill="#FF6A1F" stroke="#1A1A1A" strokeWidth="1.8" />
      <polygon points="72,50 78,54 72,58 66,54" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="72,75 78,79 72,83 66,79" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="72,83 78,87 72,91 66,87" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="72,91 78,95 72,99 66,95" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Rod 3 (99) - Orange Highlighted bead */}
      <polygon points="99,24 105,28 99,32 93,28" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="99,50 105,54 99,58 93,54" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="99,58 105,62 99,66 93,62" fill="#FF6A1F" stroke="#1A1A1A" strokeWidth="1.8" />
      <polygon points="99,83 105,87 99,91 93,87" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="99,91 105,95 99,99 93,95" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Rod 4 (126) */}
      <polygon points="126,24 132,28 126,32 120,28" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="126,67 132,71 126,75 120,71" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="126,75 132,79 126,83 120,79" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="126,83 132,87 126,91 120,87" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="126,91 132,95 126,99 120,95" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />

      {/* Rod 5 (153) - Orange Bead */}
      <polygon points="153,33 159,37 153,41 147,37" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="153,50 159,54 153,58 147,54" fill="#FF6A1F" stroke="#1A1A1A" strokeWidth="1.8" />
      <polygon points="153,75 159,79 153,83 147,79" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="153,83 159,87 153,91 147,87" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      <polygon points="153,91 159,95 153,99 147,95" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
    </svg>
  );
};

export const ContactIllustration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 190 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Origami Paper Crane - Mathematically precise cohesive fold structure */}
      <g stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* 1. Back Wing Fold */}
        <polygon points="58,24 62,68 44,72" fill="#FFFBF7" />
        
        {/* 2. Tail Upper Facet */}
        <polygon points="18,42 62,68 44,72" fill="#FFFFFF" />
        
        {/* 3. Tail Lower Facet */}
        <polygon points="18,42 44,72 62,96" fill="#F4F4F4" />
        
        {/* 4. Underbelly Left Side Flap */}
        <polygon points="44,72 62,68 62,96" fill="#FFFFFF" />
        
        {/* 5. Underbelly Right Side Flap */}
        <polygon points="62,96 62,68 80,72" fill="#EEEEEE" />
        
        {/* 6. Neck Upper Facet */}
        <polygon points="80,72 62,68 112,52" fill="#FFFFFF" />
        
        {/* 7. Neck Lower Facet */}
        <polygon points="80,72 112,52 62,96" fill="#FDFDFD" />
        
        {/* 8. Head / Folded Beak (Accent Orange) */}
        <polygon points="112,52 122,58 114,61" fill="#FF6A1F" />
        
        {/* 9. Front Wing (Tall Sharp Foreground Spike) */}
        <polygon points="108,16 62,68 80,72" fill="#FFFFFF" />
      </g>

      {/* Separate Letter Envelope (strictly positioned to the right to avoid overlap) */}
      <g transform="translate(136, 52) rotate(6)">
        <rect x="0" y="0" width="48" height="32" rx="2.5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
        <path d="M 5 15 L 43 15" stroke="#1A1A1A" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M 5 22 L 28 22" stroke="#1A1A1A" strokeWidth="1.5" />
        <rect x="32" y="4" width="11" height="8" fill="#FF6A1F" stroke="#1A1A1A" strokeWidth="1.5" rx="1.5" />
        <path d="M 35 8 L 40 8" stroke="#FFFFFF" strokeWidth="1" />
      </g>
    </svg>
  );
};

export const FAQIllustration: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`relative flex items-end gap-0 select-none pointer-events-none ${className}`}>
      {/* Dan's Face SVG Outline - Headshot made smaller to match screenshot */}
      <div className="w-20 md:w-22 flex-shrink-0 relative overflow-visible">
        <img 
          src={danfaceOnly} 
          alt="Dan's headshot illustration"
          className="w-full h-auto object-contain select-none pointer-events-none"
          style={{ 
            imageRendering: "-webkit-optimize-contrast",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.03))" 
          }}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Thought bubble and rising dots - positioned exactly as in the reference screenshot */}
      <svg 
        viewBox="0 0 110 85" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-28 md:w-30 h-auto mb-6 -ml-3 md:-ml-4 overflow-visible select-none pointer-events-none"
      >
        {/* Floating thought bubble trail rising toward the cloud (black dot at the base removed) */}
        <circle cx="21" cy="65" r="4.5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.2" />
        <circle cx="35" cy="56" r="6.5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />

        {/* Main cloud bubble, thick hand-drawn outline, filled with pure white */}
        <path 
          d="M 48 44 
             C 38 44, 34 32, 42 22 
             C 38 11, 56 3, 68 9 
             C 76 1, 92 3, 96 13 
             C 105 15, 107 27, 99 35 
             C 105 46, 90 52, 82 46 
             C 72 52, 54 51, 48 44 Z" 
          fill="#FFFFFF" 
          stroke="#1A1A1A" 
          strokeWidth="3" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Question mark in Elegant Display Serif - Centered and slightly larger */}
        <text 
          x="69" 
          y="28" 
          textAnchor="middle" 
          dominantBaseline="middle"
          fontFamily="Playfair Display, Georgia, serif" 
          fontWeight="900" 
          fontSize="28px" 
          fill="#FF6A1F"
        >
          ?
        </text>
      </svg>
    </div>
  );
};
