'use client';

/**
 * Category Icons - Custom SVG icons for product categories
 */

// Elektrikli Şömine Icon
export const FireplaceIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fireplace Frame - Dark gray */}
    <rect x="12" y="18" width="76" height="64" rx="5" fill="#374151" stroke="#4B5563" strokeWidth="2"/>
    {/* Top Vent Section - Light gray with grooves */}
    <rect x="20" y="22" width="60" height="12" rx="2" fill="#9CA3AF"/>
    <line x1="30" y1="25" x2="30" y2="32" stroke="#6B7280" strokeWidth="1"/>
    <line x1="40" y1="25" x2="40" y2="32" stroke="#6B7280" strokeWidth="1"/>
    <line x1="50" y1="25" x2="50" y2="32" stroke="#6B7280" strokeWidth="1"/>
    <line x1="60" y1="25" x2="60" y2="32" stroke="#6B7280" strokeWidth="1"/>
    <line x1="70" y1="25" x2="70" y2="32" stroke="#6B7280" strokeWidth="1"/>
    {/* Glass Screen - Light blue */}
    <rect x="18" y="38" width="64" height="38" rx="3" fill="#93C5FD" opacity="0.4"/>
    {/* Flames - Realistic */}
    <path d="M35 58 L38 48 L42 52 L46 42 L50 52 L54 48 L58 58 L50 72 Z" fill="#EF4444"/>
    <path d="M37 60 L40 52 L43 56 L46 48 L50 56 L53 52 L56 60 L50 70 Z" fill="#F97316"/>
    <path d="M39 62 L41 56 L43 59 L46 53 L50 59 L53 56 L55 62 L50 68 Z" fill="#FBBF24"/>
    <ellipse cx="50" cy="65" rx="8" ry="4" fill="#F97316" opacity="0.6"/>
  </svg>
);

// Barbekü Sistemleri Icon
export const BBQIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Upper Wall Cabinets */}
    <rect x="8" y="12" width="20" height="22" rx="2" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1.5"/>
    <rect x="30" y="12" width="20" height="22" rx="2" fill="#92400E" stroke="#78350F" strokeWidth="1.5"/>
    <rect x="52" y="12" width="20" height="22" rx="2" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1.5"/>
    {/* Base Cabinet - Brown wood */}
    <rect x="18" y="38" width="44" height="38" rx="3" fill="#92400E" stroke="#78350F" strokeWidth="1.5"/>
    {/* Cabinet Door Lines - Vertical slats */}
    <line x1="28" y1="48" x2="28" y2="70" stroke="#78350F" strokeWidth="2"/>
    <line x1="50" y1="48" x2="50" y2="70" stroke="#78350F" strokeWidth="2"/>
    {/* Horizontal slats on doors */}
    <line x1="20" y1="52" x2="38" y2="52" stroke="#78350F" strokeWidth="1"/>
    <line x1="20" y1="58" x2="38" y2="58" stroke="#78350F" strokeWidth="1"/>
    <line x1="52" y1="52" x2="60" y2="52" stroke="#78350F" strokeWidth="1"/>
    <line x1="52" y1="58" x2="60" y2="58" stroke="#78350F" strokeWidth="1"/>
    {/* Countertop - Light gray */}
    <rect x="16" y="36" width="48" height="5" rx="2" fill="#D1D5DB"/>
    {/* Sink */}
    <ellipse cx="50" cy="42" rx="8" ry="4" fill="#4B5563" opacity="0.5"/>
    {/* Faucet - Silver */}
    <rect x="48.5" y="20" width="3" height="18" rx="1" fill="#E5E7EB"/>
    <path d="M48.5 20 L50 17 L51.5 20" stroke="#D1D5DB" strokeWidth="1.5" fill="none"/>
  </svg>
);

// Taştan Yapılma Ürünler Icon
export const StoneProductsIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base - Yellow */}
    <rect x="32" y="68" width="36" height="10" rx="3" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5"/>
    {/* Bust Torso - Light blue */}
    <ellipse cx="50" cy="48" rx="20" ry="28" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
    {/* Head - Light blue */}
    <circle cx="50" cy="28" r="14" fill="#60A5FA" stroke="#3B82F6" strokeWidth="2"/>
    {/* Face details */}
    <ellipse cx="46" cy="26" rx="2" ry="3" fill="#1E40AF" opacity="0.6"/>
    <ellipse cx="54" cy="26" rx="2" ry="3" fill="#1E40AF" opacity="0.6"/>
    <path d="M46 32 Q50 35 54 32" stroke="#1E40AF" strokeWidth="1.5" fill="none" opacity="0.6"/>
    {/* Chisel - Gray */}
    <rect x="66" y="42" width="4" height="14" rx="1" fill="#9CA3AF" stroke="#6B7280" strokeWidth="1"/>
    {/* Hammer Head - Yellow */}
    <rect x="69" y="34" width="10" height="4" rx="1" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"/>
    {/* Hammer Handle - Brown */}
    <rect x="78" y="32" width="3" height="8" rx="1" fill="#92400E"/>
    {/* Strike effect - Red spark */}
    <line x1="69" y1="36" x2="66" y2="42" stroke="#EF4444" strokeWidth="2" opacity="0.8"/>
    <circle cx="66" cy="42" r="2" fill="#EF4444" opacity="0.6"/>
  </svg>
);

// Taşlar ve Mermerler Icon
export const StonesMarblesIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stone 1 - Dark gray with facets */}
    <path d="M22 52 L32 34 L44 40 L38 58 L28 62 Z" fill="#374151" stroke="#4B5563" strokeWidth="2"/>
    <path d="M26 50 L32 38 L38 42" stroke="#6B7280" strokeWidth="1.5" fill="none"/>
    <path d="M28 48 L34 40" stroke="#9CA3AF" strokeWidth="1" fill="none"/>
    {/* Stone 2 - Dark gray with facets */}
    <path d="M48 46 L58 28 L70 36 L64 56 L54 60 Z" fill="#374151" stroke="#4B5563" strokeWidth="2"/>
    <path d="M52 48 L58 36 L64 40" stroke="#6B7280" strokeWidth="1.5" fill="none"/>
    <path d="M54 46 L60 38" stroke="#9CA3AF" strokeWidth="1" fill="none"/>
    {/* Stone 3 - Dark gray with facets */}
    <path d="M38 62 L48 50 L58 58 L52 74 L42 76 Z" fill="#374151" stroke="#4B5563" strokeWidth="2"/>
    <path d="M42 64 L48 54 L54 60" stroke="#6B7280" strokeWidth="1.5" fill="none"/>
    <path d="M44 62 L50 56" stroke="#9CA3AF" strokeWidth="1" fill="none"/>
  </svg>
);

