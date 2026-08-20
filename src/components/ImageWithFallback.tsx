import React, { useState, useEffect } from 'react';
import { Utensils } from 'lucide-react';
import { AUTHENTIC_DISH_IMAGES, LOCAL_BUNDLED_DISH_IMAGES } from '../utils/foodImageHelper';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackGradient?: string;
  foodName?: string;
}

// Convert any space-separated or legacy dataset path to clean bundled asset
function sanitizeImagePath(url: string, foodName?: string, alt?: string): string {
  const label = `${foodName || ''} ${alt || ''} ${url || ''}`.toLowerCase();

  // If local foundational dish is referenced anywhere, prefer local bundled asset
  for (const [key, assetUrl] of Object.entries(LOCAL_BUNDLED_DISH_IMAGES)) {
    if (label.includes(key)) {
      return assetUrl;
    }
  }

  if (url && (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('http'))) {
    return url;
  }

  return LOCAL_BUNDLED_DISH_IMAGES['jollof'] || url;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackGradient = 'from-amber-950 via-stone-900 to-stone-950',
  foodName,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>(() => sanitizeImagePath(src, foodName, alt));

  // Helper to find authentic image by dish keyword
  const findAuthenticFallback = (): string => {
    const key = `${foodName || ''} ${alt || ''} ${src || ''}`.toLowerCase().trim();
    for (const [k, assetUrl] of Object.entries(LOCAL_BUNDLED_DISH_IMAGES)) {
      if (key.includes(k)) {
        return assetUrl;
      }
    }
    // Check dictionary
    for (const [k, url] of Object.entries(AUTHENTIC_DISH_IMAGES)) {
      if (key.includes(k)) {
        return url;
      }
    }
    return LOCAL_BUNDLED_DISH_IMAGES['jollof'];
  };

  useEffect(() => {
    setHasError(false);
    const resolved = sanitizeImagePath(src, foodName, alt);
    setCurrentSrc(resolved || findAuthenticFallback());
  }, [src, foodName, alt]);

  const handleImageError = () => {
    const fallback = findAuthenticFallback();
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
      return;
    }
    // Fallback to foundational jollof rice bundled asset before showing icon
    const defaultJollof = LOCAL_BUNDLED_DISH_IMAGES['jollof'];
    if (currentSrc !== defaultJollof) {
      setCurrentSrc(defaultJollof);
      return;
    }
    setHasError(true);
  };

  if (hasError || !currentSrc) {
    const displayName = foodName || alt || 'Dish';
    return (
      <div
        className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex flex-col items-center justify-center p-2 text-center select-none border border-stone-800/80 ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mb-1 border border-amber-500/30">
          <Utensils className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-bold text-stone-200 line-clamp-1 px-1">
          {displayName}
        </span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={handleImageError}
      {...props}
    />
  );
};
