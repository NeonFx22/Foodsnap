import React, { useState, useEffect, useTransition } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  Star,
  Clock,
  Phone,
  ExternalLink,
  UtensilsCrossed,
  SlidersHorizontal,
  ChevronRight,
  X,
  Compass,
  DollarSign,
  Truck,
  ShoppingBag,
  Award,
  CheckCircle2,
  ChefHat,
  Sparkles,
  Layers,
  Store,
  Share2,
  Map as MapIcon,
  Crosshair
} from 'lucide-react';
import {
  Restaurant,
  UserLocation,
  POPULAR_LOCATIONS,
  searchNearbyRestaurants,
  detectUserLocation,
  geocodeCityOrAddress
} from '../services/restaurantService';
import { ImageWithFallback } from './ImageWithFallback';

interface NearbyRestaurantFinderProps {
  initialFoodQuery?: string;
  onSelectRecipeToCook?: (dishName: string) => void;
}

export const NearbyRestaurantFinder: React.FC<NearbyRestaurantFinderProps> = ({
  initialFoodQuery = '',
  onSelectRecipeToCook
}) => {
  const [foodQuery, setFoodQuery] = useState(initialFoodQuery);
  const [activeQuery, setActiveQuery] = useState(initialFoodQuery);
  const [citySearchInput, setCitySearchInput] = useState('');
  const [userLocation, setUserLocation] = useState<UserLocation>(POPULAR_LOCATIONS[0]);
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [cuisineFilter, setCuisineFilter] = useState<string>('All');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'list'>('both');
  const [copiedLink, setCopiedLink] = useState(false);
  const [filterPrice, setFilterPrice] = useState<string>('All');
  const [isPending, startTransition] = useTransition();

  // Sync if initial prop changes
  useEffect(() => {
    if (initialFoodQuery) {
      setFoodQuery(initialFoodQuery);
      setActiveQuery(initialFoodQuery);
    }
  }, [initialFoodQuery]);

  // Initial location detection
  useEffect(() => {
    let isMounted = true;
    const initLocation = async () => {
      try {
        const detected = await detectUserLocation();
        if (isMounted && detected) {
          setUserLocation(detected);
        }
      } catch {
        // use default Lagos
      }
    };
    initLocation();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch spots whenever location, query, radius, or cuisine changes
  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    const performSearch = async () => {
      try {
        const results = await searchNearbyRestaurants(
          activeQuery,
          userLocation,
          radiusKm,
          cuisineFilter
        );

        if (isCurrent) {
          setRestaurants(results);
          if (results.length > 0 && !selectedRestaurant) {
            setSelectedRestaurant(results[0]);
          } else if (results.length === 0) {
            setSelectedRestaurant(null);
          }
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    performSearch();

    return () => {
      isCurrent = false;
    };
  }, [activeQuery, userLocation, radiusKm, cuisineFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(foodQuery.trim());
  };

  const handleLocateMe = async () => {
    setIsLocating(true);
    try {
      const loc = await detectUserLocation();
      setUserLocation(loc);
    } finally {
      setIsLocating(false);
    }
  };

  const handleCitySearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!citySearchInput.trim()) return;
    setIsLocating(true);
    try {
      const loc = await geocodeCityOrAddress(citySearchInput.trim());
      if (loc) {
        setUserLocation(loc);
        setCitySearchInput('');
      }
    } finally {
      setIsLocating(false);
    }
  };

  const handleShare = (r: Restaurant) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${r.name} - ${r.address}. Google Maps: ${r.googleMapsUrl}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Filter restaurants by price if selected
  const displayRestaurants = restaurants.filter((r) => {
    if (filterPrice !== 'All' && r.priceLevel !== filterPrice) {
      return false;
    }
    return true;
  });

  const cuisinesList = [
    'All',
    'West African',
    'African BBQ & Suya',
    'Traditional',
    'Bakery & Pastries',
    'Continental',
    'Street Food'
  ];

  return (
    <div id="nearby-restaurant-finder" className="flex flex-col gap-6 w-full text-stone-100">
      {/* Header & Main Search Bar */}
      <div className="bg-stone-900/90 backdrop-blur-md rounded-2xl border border-stone-800 p-5 md:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Live Food Radar & Map
              </span>
              <span className="text-xs text-stone-400">
                {restaurants.length} spots within {radiusKm}km
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              Find Authentic Dishes Near You
            </h2>
          </div>

          {/* Quick View Switcher */}
          <div className="flex items-center bg-stone-950/80 p-1 rounded-xl border border-stone-800 self-start md:self-auto">
            <button
              id="view-mode-both"
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'both'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Split View
            </button>
            <button
              id="view-mode-map"
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'map'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Radar & Map
            </button>
            <button
              id="view-mode-list"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Places List
            </button>
          </div>
        </div>

        {/* Dual Search Controls: Food Dish Search & City / Location Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Dish / Restaurant Search Input */}
          <form onSubmit={handleSearchSubmit} className="md:col-span-6 relative flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              id="food-search-input"
              type="text"
              value={foodQuery}
              onChange={(e) => {
                setFoodQuery(e.target.value);
                if (e.target.value === '') {
                  setActiveQuery('');
                }
              }}
              placeholder="Search restaurant, dish or area (e.g. The Place, Mega Chicken, Suya, Lekki)..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-24 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            {foodQuery && (
              <button
                type="button"
                onClick={() => {
                  setFoodQuery('');
                  setActiveQuery('');
                }}
                className="absolute right-14 text-stone-400 hover:text-stone-200 p-1"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              id="food-search-submit"
              type="submit"
              className="absolute right-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-lg transition-colors"
            >
              Search
            </button>
          </form>

          {/* City / Address Search Input */}
          <form onSubmit={handleCitySearchSubmit} className="md:col-span-4 relative flex items-center">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
            <input
              id="city-search-input"
              type="text"
              value={citySearchInput}
              onChange={(e) => setCitySearchInput(e.target.value)}
              placeholder={`Change city (Current: ${userLocation.city || userLocation.label})`}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-16 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            <button
              id="city-search-submit"
              type="submit"
              className="absolute right-1.5 px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg font-medium transition-colors"
            >
              Go
            </button>
          </form>

          {/* GPS Auto-locate Button */}
          <button
            id="gps-locate-btn"
            onClick={handleLocateMe}
            disabled={isLocating}
            className="md:col-span-2 flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 py-3 px-4 rounded-xl text-xs font-semibold border border-stone-700 transition-colors disabled:opacity-50"
            title="Use Device GPS Location"
          >
            <Crosshair className={`w-4 h-4 text-amber-400 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Use My GPS'}</span>
          </button>
        </div>

        {/* Popular Metropolitan Quick Chips */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-stone-400 flex items-center gap-1 shrink-0 font-medium">
            <MapIcon className="w-3.5 h-3.5 text-stone-400" /> Presets:
          </span>
          {POPULAR_LOCATIONS.map((loc) => {
            const isSelected =
              userLocation.city?.toLowerCase() === loc.city?.toLowerCase() ||
              userLocation.label === loc.label;
            return (
              <button
                key={loc.label}
                onClick={() => setUserLocation(loc)}
                className={`px-3 py-1 rounded-lg border shrink-0 transition-all font-medium ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                {loc.city || loc.label}
              </button>
            );
          })}
        </div>

        {/* Filter Toolbar: Cuisine, Radius, Price */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-stone-800/80">
          {/* Cuisine Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {cuisinesList.map((c) => (
              <button
                key={c}
                onClick={() => setCuisineFilter(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                  cuisineFilter === c
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Radius & Price selectors */}
          <div className="flex items-center gap-3">
            {/* Radius Selector */}
            <div className="flex items-center gap-1 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800 text-xs">
              <span className="text-stone-400">Radius:</span>
              {[3, 5, 10, 15].map((r) => (
                <button
                  key={r}
                  onClick={() => setRadiusKm(r)}
                  className={`px-2 py-0.5 rounded text-xs transition-colors font-medium ${
                    radiusKm === r
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {r}km
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800 text-xs">
              <span className="text-stone-400">Price:</span>
              {['All', '$', '$$', '$$$'].map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPrice(p)}
                  className={`px-1.5 py-0.5 rounded text-xs transition-colors font-medium ${
                    filterPrice === p
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / TOP: Interactive Spatial Radar & Visual Proximity Map (Zero API Key needed) */}
        {(viewMode === 'both' || viewMode === 'map') && (
          <div
            className={`${
              viewMode === 'both' ? 'lg:col-span-7' : 'lg:col-span-12'
            } bg-stone-900/90 rounded-2xl border border-stone-800 p-5 shadow-xl flex flex-col gap-4 overflow-hidden relative`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Proximity Map & Radar
                </h3>
                <span className="text-xs text-stone-400">
                  Centered on {userLocation.label}
                </span>
              </div>
              <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Interactive Coordinates
              </span>
            </div>

            {/* Visual Radar Canvas & Interactive Node Mesh */}
            <div className="relative w-full h-[380px] md:h-[420px] bg-stone-950 rounded-xl border border-stone-800/80 overflow-hidden flex items-center justify-center select-none shadow-inner">
              {/* Radar Rings & Grid Lines */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[120px] h-[120px] rounded-full border border-amber-500/15" />
                <div className="w-[240px] h-[240px] rounded-full border border-amber-500/15" />
                <div className="w-[360px] h-[360px] rounded-full border border-stone-800/60" />
                <div className="absolute w-full h-[1px] bg-stone-800/40" />
                <div className="absolute h-full w-[1px] bg-stone-800/40" />
                {/* Rotating scanner beam */}
                <div className="absolute w-1/2 h-1/2 origin-bottom-right bg-gradient-to-tl from-amber-500/10 to-transparent animate-spin duration-[8000ms] pointer-events-none" />
              </div>

              {/* Center User Pin */}
              <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 animate-ping absolute" />
                  <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-stone-950 flex items-center justify-center text-stone-950 shadow-lg">
                    <Navigation className="w-3 h-3 fill-stone-950" />
                  </div>
                </div>
                <span className="mt-1 text-[10px] font-bold bg-stone-900/90 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 whitespace-nowrap shadow">
                  You are here
                </span>
              </div>

              {/* Interactive Restaurant Nodes */}
              {displayRestaurants.map((r, idx) => {
                const isSelected = selectedRestaurant?.id === r.id;
                // Calculate spatial offset relative to user location
                const latDiff = (r.coordinates.lat - userLocation.lat) * 111; // km
                const lngDiff = (r.coordinates.lng - userLocation.lng) * 111 * Math.cos((userLocation.lat * Math.PI) / 180); // km

                // Scale into radar box (-150px to +150px)
                const scale = 140 / Math.max(radiusKm, 10);
                const xOffset = Math.max(-150, Math.min(150, lngDiff * scale));
                const yOffset = Math.max(-150, Math.min(150, -latDiff * scale));

                return (
                  <button
                    key={r.id}
                    id={`radar-pin-${r.id}`}
                    onClick={() => setSelectedRestaurant(r)}
                    style={{
                      transform: `translate(${xOffset}px, ${yOffset}px)`
                    }}
                    className={`absolute z-30 group transition-all duration-300 ${
                      isSelected ? 'scale-125 z-40' : 'hover:scale-110'
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow-lg border backdrop-blur-md transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-white ring-4 ring-amber-500/30'
                          : 'bg-stone-900/95 text-stone-200 border-stone-700 hover:border-amber-400'
                      }`}
                    >
                      <UtensilsCrossed
                        className={`w-3 h-3 ${
                          isSelected ? 'text-stone-950' : 'text-amber-400'
                        }`}
                      />
                      <span className="max-w-[90px] truncate text-[11px]">
                        {r.name}
                      </span>
                      <span
                        className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                          isSelected
                            ? 'bg-stone-950 text-amber-400'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {r.distanceKm ?? 0}km
                      </span>
                    </div>
                  </button>
                );
              })}

              {displayRestaurants.length === 0 && !isLoading && (
                <div className="text-center z-20 p-4 bg-stone-900/80 rounded-xl border border-stone-800 max-w-sm">
                  <Store className="w-8 h-8 text-stone-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-stone-200">
                    No spots within {radiusKm}km
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Try expanding the search radius or selecting a preset city like Lagos or Abuja.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Map Legend & Directions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400 pt-2 border-t border-stone-800/80">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Center (User)
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-700 border border-stone-500" /> Nearby Venue Pin
                </span>
              </div>
              <span className="text-[11px] text-stone-400">
                Click any venue pin to view menu details & directions
              </span>
            </div>
          </div>
        )}

        {/* RIGHT / DETAILS: Selected Restaurant Spotlight & Curated List */}
        <div
          className={`${
            viewMode === 'both'
              ? 'lg:col-span-5'
              : viewMode === 'list'
              ? 'lg:col-span-12'
              : 'lg:col-span-12'
          } flex flex-col gap-5`}
        >
          {/* Spotlight Card for Selected Restaurant */}
          {selectedRestaurant ? (
            <div
              id="selected-restaurant-card"
              className="bg-stone-900/90 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl transition-all"
            >
              {/* Cover Photo with ImageWithFallback */}
              <div className="relative w-full h-48 sm:h-52 bg-stone-950">
                <ImageWithFallback
                  src={selectedRestaurant.imageUrl}
                  alt={selectedRestaurant.name}
                  foodName={
                    selectedRestaurant.matchingDish?.name ||
                    selectedRestaurant.name
                  }
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                {/* Badges on Cover */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-amber-500 text-stone-950 font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-stone-950" />
                    {selectedRestaurant.rating || 4.7}
                  </span>
                  <span className="bg-stone-950/80 backdrop-blur-md text-stone-200 text-xs px-2.5 py-1 rounded-full border border-stone-700 font-medium">
                    {selectedRestaurant.priceLevel || '$$'}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex gap-1.5">
                  <button
                    onClick={() => handleShare(selectedRestaurant)}
                    className="p-2 rounded-full bg-stone-950/80 text-stone-300 hover:text-white border border-stone-700 hover:border-amber-400 transition-colors"
                    title="Copy venue link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  {selectedRestaurant.isOpen ? (
                    <span className="bg-emerald-500/90 text-stone-950 font-bold text-xs px-2.5 py-1 rounded-full shadow">
                      Open Now
                    </span>
                  ) : (
                    <span className="bg-stone-800 text-stone-300 text-xs px-2.5 py-1 rounded-full">
                      Closed
                    </span>
                  )}
                </div>

                {/* Bottom title on photo */}
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">
                    {selectedRestaurant.cuisine}
                  </span>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {selectedRestaurant.name}
                  </h3>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-5 flex flex-col gap-4">
                {/* Distance & Address */}
                <div className="flex items-start gap-2.5 text-xs text-stone-300">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">
                      {selectedRestaurant.address}
                    </p>
                    <p className="text-stone-400 mt-0.5">
                      {selectedRestaurant.distanceKm ?? 0} km away ({selectedRestaurant.distanceMiles ?? 0} miles)
                    </p>
                  </div>
                </div>

                {/* Phone & Hours */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-stone-800">
                  <div className="flex items-center gap-2 text-stone-300">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">
                      {selectedRestaurant.openingHours || '10:00 AM – 10:30 PM'}
                    </span>
                  </div>
                  {selectedRestaurant.phoneNumber && (
                    <div className="flex items-center gap-2 text-stone-300">
                      <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <a
                        href={`tel:${selectedRestaurant.phoneNumber}`}
                        className="hover:text-amber-400 transition-colors truncate"
                      >
                        {selectedRestaurant.phoneNumber}
                      </a>
                    </div>
                  )}
                </div>

                {/* Matching Food / Signature Specialty */}
                <div className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Signature Specialties
                    </span>
                    <span className="text-stone-400 text-[11px]">
                      Authentic Recipe
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {selectedRestaurant.matchingDish?.name ||
                      selectedRestaurant.featuredDishes[0]?.name ||
                      'Authentic Jollof, Suya & Delicacies'}
                  </p>
                  <p className="text-xs text-stone-400">
                    {selectedRestaurant.matchingDish?.description ||
                      selectedRestaurant.featuredDishes[0]?.description ||
                      'Prepared fresh using authentic herbs, spices, and traditional techniques.'}
                  </p>

                  {/* Cook it yourself action */}
                  {onSelectRecipeToCook && (
                    <button
                      id="cook-this-dish-btn"
                      onClick={() =>
                        onSelectRecipeToCook(
                          selectedRestaurant.matchingDish?.name ||
                            selectedRestaurant.featuredDishes[0]?.name ||
                            activeQuery ||
                            'Jollof Rice'
                        )
                      }
                      className="mt-2 flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 hover:text-amber-300 py-2 px-3 rounded-lg border border-amber-500/30 text-xs font-semibold transition-colors"
                    >
                      <ChefHat className="w-3.5 h-3.5" />
                      <span>Cook This Recipe with AI Guide</span>
                    </button>
                  )}
                </div>

                {/* Action Buttons: Get Directions & Open Map */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    id="open-directions-link"
                    href={selectedRestaurant.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md text-center"
                  >
                    <Navigation className="w-3.5 h-3.5 fill-stone-950" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    id="open-maps-search-link"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${selectedRestaurant.name} ${selectedRestaurant.address}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs py-3 px-4 rounded-xl border border-stone-700 transition-colors text-center"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Maps</span>
                  </a>
                </div>

                {copiedLink && (
                  <p className="text-[11px] text-emerald-400 text-center font-medium animate-fade-in">
                    Venue details & map link copied to clipboard!
                  </p>
                )}
              </div>
            </div>
          ) : null}

          {/* Places List / Stream */}
          <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-400" />
                All Nearby Spots ({displayRestaurants.length})
              </h3>
              <span className="text-xs text-stone-400">
                Sorted by proximity
              </span>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-stone-400">
                <div className="w-7 h-7 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs">Scanning nearby authentic eateries...</span>
              </div>
            ) : displayRestaurants.length === 0 ? (
              <div className="text-center py-8 text-stone-400 flex flex-col items-center gap-3">
                <p className="text-sm font-medium">No places found within {radiusKm}km.</p>
                <p className="text-xs text-stone-500 max-w-xs">
                  Try widening the search radius or resetting cuisine and dish filters.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {radiusKm < 25 && (
                    <button
                      onClick={() => setRadiusKm(25)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-lg transition-colors"
                    >
                      Expand Radius (25km)
                    </button>
                  )}
                  {(activeQuery || cuisineFilter !== 'All' || filterPrice !== 'All') && (
                    <button
                      onClick={() => {
                        setFoodQuery('');
                        setActiveQuery('');
                        setCuisineFilter('All');
                        setFilterPrice('All');
                      }}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                {displayRestaurants.map((r) => {
                  const isSelected = selectedRestaurant?.id === r.id;
                  return (
                    <button
                      key={r.id}
                      id={`place-item-${r.id}`}
                      onClick={() => setSelectedRestaurant(r)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-white'
                          : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700 text-stone-300 hover:bg-stone-950'
                      }`}
                    >
                      {/* Mini Thumbnail with ImageWithFallback */}
                      <div className="w-14 h-14 rounded-lg bg-stone-900 shrink-0 overflow-hidden border border-stone-800">
                        <ImageWithFallback
                          src={r.imageUrl}
                          alt={r.name}
                          foodName={r.matchingDish?.name || r.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4 className="font-bold text-sm text-white truncate">
                            {r.name}
                          </h4>
                          <span className="text-xs font-mono font-bold text-amber-400 shrink-0">
                            {r.distanceKm ?? 0}km
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 truncate">
                          {r.cuisine} • {r.priceLevel || '$$'}
                        </p>
                        <p className="text-[11px] text-stone-400 truncate mt-0.5">
                          {r.address}
                        </p>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-amber-400 translate-x-0.5' : 'text-stone-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
