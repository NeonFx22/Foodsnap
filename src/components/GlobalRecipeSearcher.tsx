import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Globe, 
  Utensils, 
  Clock, 
  Flame, 
  ChefHat, 
  Sparkles, 
  Plus, 
  Check, 
  Copy, 
  BookOpen, 
  X, 
  CookingPot,
  MapPin,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { GlobalRecipe, Recipe } from '../types';
import { 
  searchGlobalRecipes, 
  researchDishGlobally, 
  globalRecipeToAppRecipe,
  GLOBAL_RECIPES_DATABASE 
} from '../services/globalRecipeService';
import { saveCustomRecipe } from '../utils/mlEngine';
import { ImageWithFallback } from './ImageWithFallback';
import { InteractiveCookingAssistant } from './InteractiveCookingAssistant';

interface GlobalRecipeSearcherProps {
  initialQuery?: string;
  onSelectRecipeForScan?: (recipe: Recipe) => void;
  onRecipeAddedToCatalog?: (recipe: Recipe) => void;
  onOpenNearbyRestaurants?: (dishName: string) => void;
}

export const GlobalRecipeSearcher: React.FC<GlobalRecipeSearcherProps> = ({
  initialQuery = '',
  onSelectRecipeForScan,
  onRecipeAddedToCatalog,
  onOpenNearbyRestaurants
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [results, setResults] = useState<GlobalRecipe[]>(GLOBAL_RECIPES_DATABASE);
  const [isSearching, setIsSearching] = useState(false);
  const [detailModalRecipe, setDetailModalRecipe] = useState<GlobalRecipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [savedToCatalogStatus, setSavedToCatalogStatus] = useState<Record<string, boolean>>({});
  const [cookingModalRecipe, setCookingModalRecipe] = useState<Recipe | null>(null);
  
  // Custom dish research input
  const [customDishInput, setCustomDishInput] = useState('');
  const [isResearchingCustom, setIsResearchingCustom] = useState(false);

  const cuisines = [
    'All',
    'West African',
    'Asian',
    'Italian / European',
    'Latin American',
    'Middle Eastern',
    'Mediterranean'
  ];

  // Perform search on query / cuisine change
  useEffect(() => {
    let isCancelled = false;
    const fetchResults = async () => {
      setIsSearching(true);
      try {
        const data = await searchGlobalRecipes(searchQuery, selectedCuisine);
        if (!isCancelled) {
          setResults(data);
        }
      } catch (e) {
        console.error('Global search error:', e);
      } finally {
        if (!isCancelled) setIsSearching(false);
      }
    };

    const timer = setTimeout(fetchResults, 200);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, selectedCuisine]);

  // Handle custom dish research
  const handleResearchCustomDish = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = customDishInput.trim();
    if (!query) return;

    setIsResearchingCustom(true);
    try {
      const researchResult = await researchDishGlobally(query);
      if (researchResult) {
        setDetailModalRecipe(researchResult);
        // Prepend to results if not exists
        setResults((prev) => [researchResult, ...prev.filter((p) => p.id !== researchResult.id)]);
      } else {
        // Fall back to live search query
        setSearchQuery(query);
      }
      setCustomDishInput('');
    } catch (err) {
      console.error('Custom research failed:', err);
      setSearchQuery(query);
    } finally {
      setIsResearchingCustom(false);
    }
  };

  const handleToggleIngredient = (itemKey: string) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleCopyIngredients = (recipe: GlobalRecipe) => {
    const text = recipe.ingredientsList
      .map(
        (i) =>
          `• ${i.amount ? `${i.amount} ` : ''}${i.item}${i.notes ? ` (${i.notes})` : ''}`
      )
      .join('\n');

    navigator.clipboard.writeText(
      `🛒 Recipe Grocery List for ${recipe.name}:\n\n${text}\n\nVia FoodSnap Global Culinary Engine`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveToCatalog = async (gRecipe: GlobalRecipe) => {
    try {
      const appRecipe = globalRecipeToAppRecipe(gRecipe);
      await saveCustomRecipe(
        {
          name: appRecipe.name,
          category: appRecipe.category,
          calories: appRecipe.calories,
          cooking_time: appRecipe.cooking_time,
          servings: appRecipe.servings,
          difficulty: appRecipe.difficulty,
          origin: appRecipe.origin,
          ingredients: appRecipe.ingredients,
          directions: appRecipe.directions,
          tags: appRecipe.tags
        },
        appRecipe.referenceImages[0]
      );
      setSavedToCatalogStatus((prev) => ({ ...prev, [gRecipe.id]: true }));
      if (onRecipeAddedToCatalog) {
        onRecipeAddedToCatalog(appRecipe);
      }
    } catch (e) {
      console.error('Failed to save to catalog:', e);
    }
  };

  return (
    <div className="w-full space-y-6" id="global-recipe-searcher-section">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold font-mono uppercase tracking-wider border border-amber-500/30">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Culinary Research Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif tracking-tight">
              Explore Recipes &amp; Ingredients Worldwide
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Research authentic ingredients, flavor profiles, and cooking methods from hundreds of world cuisines. Click any dish to view complete ingredients, directions, and nearby restaurants.
            </p>
          </div>

          {/* Quick Custom Dish Researcher Input */}
          <form onSubmit={handleResearchCustomDish} className="flex-shrink-0 w-full md:w-80 space-y-2">
            <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Research Any World Dish</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Tagine, Pho, Ramen, Birria..."
                value={customDishInput}
                onChange={(e) => setCustomDishInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950/90 border border-stone-700 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={isResearchingCustom || !customDishInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-xs transition-colors flex-shrink-0 flex items-center gap-1 shadow-md shadow-amber-500/20"
              >
                {isResearchingCustom ? 'Researching...' : 'Research'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Search & Cuisine Filter Bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Main Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by dish name, ingredient (e.g. tamarind, crayfish, saffron, cumin), or country..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Result Count */}
          <div className="text-xs text-stone-400 font-mono flex-shrink-0">
            {isSearching ? (
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Querying global database...
              </span>
            ) : (
              <span>{results.length} {results.length === 1 ? 'dish' : 'dishes'} found</span>
            )}
          </div>
        </div>

        {/* Cuisine Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-stone-500 font-semibold uppercase text-[10px] tracking-wider flex-shrink-0">
            Cuisine:
          </span>
          {cuisines.map((cuisine, idx) => {
            const isSelected = selectedCuisine === cuisine;
            return (
              <button
                key={`${cuisine}-${idx}`}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Dish Cards - Clicking ANY opens modal directly */}
      {results.length === 0 ? (
        <div className="p-12 text-center bg-stone-900 border border-stone-800 rounded-3xl space-y-3">
          <Globe className="w-12 h-12 text-stone-600 mx-auto" />
          <div className="text-base font-bold text-stone-300">No dishes matched &quot;{searchQuery}&quot;</div>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try searching for ingredients like &quot;rice&quot;, &quot;beef&quot;, &quot;spinach&quot;, or enter a dish into the Research bar above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((recipe, idx) => (
            <div
              key={`${recipe.id}-${idx}`}
              onClick={() => setDetailModalRecipe(recipe)}
              className="bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-3xl p-4 space-y-3.5 transition-all cursor-pointer shadow-lg hover:shadow-amber-500/10 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Hero Image & Tags */}
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 relative">
                  <ImageWithFallback
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    foodName={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-950/80 backdrop-blur-sm text-amber-300 border border-amber-500/30">
                      {recipe.cuisine}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-stone-950/80 backdrop-blur-sm text-[10px] font-mono text-stone-300">
                    {recipe.totalTime}
                  </div>
                </div>

                {/* Dish Name & Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>{recipe.origin}</span>
                    <span className="text-amber-400/90 font-semibold">{recipe.difficulty}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors font-serif line-clamp-1">
                    {recipe.name}
                  </h3>

                  <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </div>

              {/* Action Hint */}
              <div className="pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Utensils className="w-3 h-3 text-amber-400" />
                  {recipe.ingredientsList.length} ingredients
                </span>
                <span className="font-semibold text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Full Recipe Details & Culinary Dossier Modal */}
      {detailModalRecipe && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in"
          onClick={() => setDetailModalRecipe(null)}
        >
          <div
            className="bg-stone-900 border border-stone-700/80 rounded-3xl max-w-3xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="flex-shrink-0 bg-stone-900 px-4 sm:px-7 py-4 border-b border-stone-800 flex items-start justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-stone-950 border border-stone-700 flex-shrink-0 shadow-md">
                  <ImageWithFallback
                    src={detailModalRecipe.imageUrl}
                    alt={detailModalRecipe.name}
                    foodName={detailModalRecipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {detailModalRecipe.origin}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">
                      {detailModalRecipe.category}
                    </span>
                    {detailModalRecipe.source && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-stone-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5" />
                        <span>{detailModalRecipe.source}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-serif break-words">
                    {detailModalRecipe.name}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs text-stone-400 pt-0.5 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-500" />
                      {detailModalRecipe.totalTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      {detailModalRecipe.calories}
                    </span>
                    <span>•</span>
                    <span>{detailModalRecipe.difficulty}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setDetailModalRecipe(null)}
                className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors flex-shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-7 space-y-6 overflow-y-auto flex-1">
              {/* Quick Actions Row */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setCookingModalRecipe(globalRecipeToAppRecipe(detailModalRecipe))}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                >
                  <CookingPot className="w-4 h-4" />
                  <span>Start Interactive Cooking</span>
                </button>

                {onSelectRecipeForScan && (
                  <button
                    onClick={() => {
                      const appRec = globalRecipeToAppRecipe(detailModalRecipe);
                      setDetailModalRecipe(null);
                      onSelectRecipeForScan(appRec);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                    title="Scan and recognize this dish in the AI vision engine"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Scan in AI Recognizer</span>
                  </button>
                )}

                {onOpenNearbyRestaurants && (
                  <button
                    onClick={() => {
                      const dishName = detailModalRecipe.name;
                      setDetailModalRecipe(null);
                      onOpenNearbyRestaurants(dishName);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Find restaurants nearby serving this food"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Find Restaurants Selling This</span>
                  </button>
                )}

                <button
                  onClick={() => handleSaveToCatalog(detailModalRecipe)}
                  className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    savedToCatalogStatus[detailModalRecipe.id]
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
                  }`}
                >
                  {savedToCatalogStatus[detailModalRecipe.id] ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Saved to Project Catalog</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-amber-400" />
                      <span>Save to Project Catalog</span>
                    </>
                  )}
                </button>
              </div>

              {savedToCatalogStatus[detailModalRecipe.id] && (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3 text-xs text-emerald-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Saved to your local recipe catalog and 80-D vector database for offline instant recognition!</span>
                  </div>
                  {onSelectRecipeForScan && (
                    <button
                      onClick={() => {
                        const appRec = globalRecipeToAppRecipe(detailModalRecipe);
                        setDetailModalRecipe(null);
                        onSelectRecipeForScan(appRec);
                      }}
                      className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs rounded-xl flex-shrink-0 transition-colors"
                    >
                      Test Scan Now
                    </button>
                  )}
                </div>
              )}

              {/* Cultural Background & About */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Culinary Background &amp; Description
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {detailModalRecipe.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {detailModalRecipe.flavorProfile.map((flavor, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-stone-950 text-stone-300 border border-stone-800 text-[11px] font-medium"
                    >
                      ✦ {flavor}
                    </span>
                  ))}
                  {detailModalRecipe.dietaryTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients Section */}
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3.5">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-stone-800/80">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-amber-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Required Ingredients &amp; Measurements ({detailModalRecipe.ingredientsList.length})
                    </h4>
                  </div>

                  <button
                    onClick={() => handleCopyIngredients(detailModalRecipe)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-stone-400 hover:text-amber-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy List'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                  {detailModalRecipe.ingredientsList.map((ing, idx) => {
                    const key = `${detailModalRecipe.id}-${idx}`;
                    const isChecked = !!checkedIngredients[key];

                    return (
                      <div
                        key={idx}
                        onClick={() => handleToggleIngredient(key)}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 text-xs ${
                          isChecked
                            ? 'bg-stone-900/40 border-stone-800 text-stone-500 line-through'
                            : 'bg-stone-900 border-stone-800/80 text-stone-200 hover:border-amber-500/30'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                            isChecked ? 'bg-amber-500 border-amber-500 text-stone-950' : 'border-stone-600 bg-stone-950'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>

                        <div className="min-w-0">
                          <div className="font-semibold">
                            {ing.amount ? <span className="text-amber-400 font-mono mr-1.5">{ing.amount}</span> : null}
                            <span>{ing.item}</span>
                          </div>
                          {ing.notes && (
                            <div className="text-[10px] text-stone-400">{ing.notes}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step-by-Step Directions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Culinary Directions &amp; Process</span>
                </h4>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {detailModalRecipe.directions.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-950 border border-stone-800/80 flex items-start gap-3 text-xs sm:text-sm text-stone-200"
                    >
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 border border-amber-500/30">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed flex-1 pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chef Secrets */}
              {detailModalRecipe.chefTips && detailModalRecipe.chefTips.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ChefHat className="w-4 h-4 text-amber-400" />
                    <span>Chef&apos;s Pro Secrets</span>
                  </div>
                  <ul className="space-y-1 text-xs text-amber-200/90 list-disc list-inside">
                    {detailModalRecipe.chefTips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Cooking Assistant Modal */}
      {cookingModalRecipe && (
        <InteractiveCookingAssistant
          recipe={cookingModalRecipe}
          isOpen={!!cookingModalRecipe}
          onClose={() => setCookingModalRecipe(null)}
        />
      )}

    </div>
  );
};
