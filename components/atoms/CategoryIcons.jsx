'use client';

/**
 * Category Icons - Custom SVG icons for product categories
 * Şemaya göre güncellenmiş iconlar
 */

// 1. Doğal Taşlar Icon - Kırık taş parçaları (Beyaz tema)
export const NaturalStonesIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stone 1 - Broken pieces */}
    <path d="M20 50 L28 32 L40 38 L34 56 L24 60 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" opacity="0.9"/>
    <path d="M24 48 L30 36 L36 40" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <path d="M26 46 L32 38" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    {/* Stone 2 - Broken pieces */}
    <path d="M46 44 L56 26 L68 34 L62 54 L52 58 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" opacity="0.9"/>
    <path d="M50 46 L56 34 L62 38" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <path d="M52 44 L58 36" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    {/* Stone 3 - Broken pieces */}
    <path d="M36 60 L46 48 L56 56 L50 72 L40 74 Z" fill="currentColor" stroke="currentColor" strokeWidth="2" opacity="0.9"/>
    <path d="M40 62 L46 52 L52 58" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <path d="M42 60 L48 54" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
    {/* Stone 4 - Small broken piece */}
    <path d="M70 58 L74 50 L78 54 L76 62 L72 64 Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

// 2. Şömineler Icon - Şömine ikonu (Beyaz tema)
export const FireplaceIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fireplace Frame - White outline */}
    <rect x="12" y="18" width="76" height="64" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    {/* Top Vent Section - White with grooves */}
    <rect x="20" y="22" width="60" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="30" y1="25" x2="30" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    <line x1="40" y1="25" x2="40" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    <line x1="50" y1="25" x2="50" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    <line x1="60" y1="25" x2="60" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    <line x1="70" y1="25" x2="70" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    {/* Glass Screen - White outline */}
    <rect x="18" y="38" width="64" height="38" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    {/* Flames - Orange/Red for visibility */}
    <path d="M35 58 L38 48 L42 52 L46 42 L50 52 L54 48 L58 58 L50 72 Z" fill="#EF4444" opacity="0.9"/>
    <path d="M37 60 L40 52 L43 56 L46 48 L50 56 L53 52 L56 60 L50 70 Z" fill="#F97316" opacity="0.9"/>
    <path d="M39 62 L41 56 L43 59 L46 53 L50 59 L53 56 L55 62 L50 68 Z" fill="#FBBF24" opacity="0.9"/>
    <ellipse cx="50" cy="65" rx="8" ry="4" fill="#F97316" opacity="0.7"/>
  </svg>
);

// 3. Barbekü Icon - Barbekü ızgarası (Beyaz tema)
export const BBQIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* BBQ Base - White outline */}
    <rect x="20" y="50" width="60" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/>
    {/* Grill Grates - Horizontal lines */}
    <line x1="25" y1="58" x2="75" y2="58" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
    <line x1="25" y1="65" x2="75" y2="65" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
    <line x1="25" y1="72" x2="75" y2="72" stroke="currentColor" strokeWidth="2" opacity="0.8"/>
    {/* Flames from below */}
    <path d="M30 58 L32 50 L35 54 L38 46 L42 54 L45 50 L48 58 L42 65 Z" fill="#EF4444" opacity="0.9"/>
    <path d="M52 58 L54 52 L56 56 L58 50 L60 56 L62 52 L64 58 L60 63 Z" fill="#F97316" opacity="0.9"/>
    <path d="M70 58 L72 50 L74 54 L76 48 L78 54 L80 50 L82 58 L78 65 Z" fill="#EF4444" opacity="0.9"/>
    {/* Legs */}
    <rect x="25" y="80" width="4" height="8" rx="1" fill="currentColor" opacity="0.7"/>
    <rect x="71" y="80" width="4" height="8" rx="1" fill="currentColor" opacity="0.7"/>
  </svg>
);

// 4. Fırınlar Icon - Fırın ikonu (Beyaz tema)
export const OvenIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Oven Body - White outline */}
    <rect x="15" y="20" width="70" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
    {/* Door - White outline */}
    <rect x="20" y="30" width="60" height="45" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    {/* Door Handle */}
    <circle cx="75" cy="52.5" r="3" fill="currentColor" opacity="0.8"/>
    {/* Window/Glass on door */}
    <rect x="28" y="38" width="44" height="28" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    {/* Flames inside - visible through window */}
    <path d="M40 50 L42 44 L45 48 L48 40 L52 48 L55 44 L58 50 L52 58 Z" fill="#EF4444" opacity="0.9"/>
    <path d="M42 52 L44 48 L46 50 L48 46 L50 50 L52 48 L54 52 L50 56 Z" fill="#F97316" opacity="0.9"/>
    {/* Top vent/handle */}
    <rect x="40" y="18" width="20" height="4" rx="1" fill="currentColor" opacity="0.7"/>
  </svg>
);

// 5. Sobalar Icon - Soba ikonu (Beyaz tema)
export const StoveIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stove Body - White outline */}
    <rect x="18" y="25" width="64" height="55" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
    {/* Glass Door - with flames visible */}
    <rect x="22" y="32" width="56" height="42" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    {/* Door Handle */}
    <rect x="72" y="50" width="4" height="16" rx="1" fill="currentColor" opacity="0.8"/>
    {/* Flames visible through glass */}
    <path d="M35 50 L37 42 L40 46 L43 38 L47 46 L50 42 L53 50 L47 58 Z" fill="#EF4444" opacity="0.9"/>
    <path d="M37 52 L39 48 L41 50 L43 46 L45 50 L47 48 L49 52 L45 56 Z" fill="#F97316" opacity="0.9"/>
    <path d="M55 50 L57 44 L59 48 L61 42 L63 48 L65 44 L67 50 L63 56 Z" fill="#EF4444" opacity="0.9"/>
    {/* Top surface */}
    <rect x="18" y="25" width="64" height="6" rx="2" fill="currentColor" opacity="0.7"/>
    {/* Legs */}
    <rect x="22" y="80" width="6" height="8" rx="1" fill="currentColor" opacity="0.7"/>
    <rect x="72" y="80" width="6" height="8" rx="1" fill="currentColor" opacity="0.7"/>
  </svg>
);

// 6. Taş Aksesuarlar Icon - Kase/bowl ikonu (Beyaz tema)
export const StoneAccessoriesIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bowl/Basin - White outline */}
    <ellipse cx="50" cy="60" rx="32" ry="20" fill="none" stroke="currentColor" strokeWidth="2"/>
    {/* Bowl interior - White outline */}
    <ellipse cx="50" cy="58" rx="28" ry="16" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    {/* Rim/Edge - White */}
    <ellipse cx="50" cy="45" rx="30" ry="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    {/* Decorative lines on bowl */}
    <ellipse cx="50" cy="55" rx="24" ry="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
  </svg>
);

// Legacy icons (backward compatibility)
export const StonesMarblesIcon = NaturalStonesIcon;
export const StoneProductsIcon = StoneAccessoriesIcon;

