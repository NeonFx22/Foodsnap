import React, { useState, useEffect } from 'react';
import { Recipe } from '../types';
import { 
  getAllRecipes, 
  saveCustomRecipe, 
  deleteCustomRecipe, 
  scaleIngredientsText,
  playChimeSound
} from '../utils/mlEngine';
import { ImageWithFallback } from './ImageWithFallback';
import { InteractiveCookingAssistant } from './InteractiveCookingAssistant';
import { 
  Search, 
  Clock, 
  Flame, 
  Globe, 
  Bookmark, 
  ChefHat, 
  Sparkles, 
  Filter, 
  X, 
  Plus, 
  Trash2, 
  Upload, 
  Volume2, 
  VolumeX, 
  Check, 
  Minus, 
  Layers,
  Utensils,
  Camera
} from 'lucide-react';

interface RecipeExplorerProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
}

export const RecipeExplorer: React.FC<RecipeExplorerProps> = ({
  onSelectRecipe,
  onToggleFavorite,
  isFavorite
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<string>('All');
  const [activeModalRecipe, setActiveModalRecipe] = useState<Recipe | null>(null);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);

  // Custom Recipe Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState('Soups & Stews');
  const [customOrigin, setCustomOrigin] = useState('West Africa');
  const [customCalories, setCustomCalories] = useState('450 kcal');
  const [customTime, setCustomTime] = useState('35 mins');
  const [customServings, setCustomServings] = useState('4 servings');
  const [customDifficulty, setCustomDifficulty] = useState('Medium');
  const [customIngredients, setCustomIngredients] = useState('');
  const [customDirections, setCustomDirections] = useState('');
  const [customTags, setCustomTags] = useState('homemade, dinner');
  const [customImageSrc, setCustomImageSrc] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Scaler in modal
  const [modalServingMultiplier, setModalServingMultiplier] = useState(1);
  const [modalIsSpeaking, setModalIsSpeaking] = useState(false);

  const categories = [
    'All',
    'Rice & Grains',
    'Soups & Stews',
    'Legumes & Steamed Dishes',
    'Grilled & Street Food',
    'Swallows & Tubers',
    'Snacks & Pastries',
    'Pasta & Noodles',
    'Poultry & BBQ',
    'Salads & Healthy'
  ];

  const loadAllRecipes = () => {
    setRecipes(getAllRecipes());
  };

  useEffect(() => {
    loadAllRecipes();
  }, []);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCustomImageSrc(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveCustomRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customIngredients.trim() || !customDirections.trim()) {
      alert('Please fill out name, ingredients, and directions.');
      return;
    }

    // Default sample image if none provided
    const imageToUse = customImageSrc || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80';

    setIsSubmitting(true);
    try {
      await saveCustomRecipe(
        {
          name: customName.trim(),
          category: customCategory,
          origin: customOrigin.trim() || 'Traditional',
          calories: customCalories.trim() || '400 kcal',
          cooking_time: customTime.trim() || '30 mins',
          servings: customServings.trim() || '4 servings',
          difficulty: customDifficulty,
          ingredients: customIngredients.trim(),
          directions: customDirections.trim(),
          tags: customTags.split(',').map((t) => t.trim()).filter(Boolean)
        },
        imageToUse
      );

      playChimeSound();
      loadAllRecipes();
      setIsAddModalOpen(false);

      // Reset form
      setCustomName('');
      setCustomIngredients('');
      setCustomDirections('');
      setCustomImageSrc(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save recipe.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRecipe = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete custom dish "${name}"?`)) {
      deleteCustomRecipe(id);
      loadAllRecipes();
      if (activeModalRecipe?.id === id) {
        setActiveModalRecipe(null);
      }
    }
  };

  const handleModalSpeak = (recipe: Recipe) => {
    if (!('speechSynthesis' in window)) return;
    if (modalIsSpeaking) {
      window.speechSynthesis.cancel();
      setModalIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(`${recipe.name}. Ingredients: ${recipe.ingredients}. Directions: ${recipe.directions}`);
    utterance.onend = () => setModalIsSpeaking(false);
    utterance.onerror = () => setModalIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setModalIsSpeaking(true);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || recipe.category === selectedCategory;

    let matchesTime = true;
    const timeNum = parseInt(recipe.cooking_time, 10) || 30;
    if (selectedTimeFilter === '<30m') matchesTime = timeNum < 30;
    if (selectedTimeFilter === '30-60m') matchesTime = timeNum >= 30 && timeNum <= 60;
    if (selectedTimeFilter === '>60m') matchesTime = timeNum > 60;

    return matchesSearch && matchesCategory && matchesTime;
  });

  return (
    <div className="w-full space-y-6" id="recipe-explorer-section">
      {/* Search and filters bar */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipes, ingredients (e.g. jollof, egusi, tomato, yam)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950/80 border border-stone-700 text-stone-200 placeholder-stone-500 text-sm focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md shadow-amber-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Dish & Train</span>
            </button>

            {/* Results count */}
            <div className="text-xs text-stone-400 self-center hidden sm:block whitespace-nowrap">
              <span className="text-amber-400 font-bold">{filteredRecipes.length}</span> recipes
            </div>
          </div>
        </div>

        {/* Time filters & Category Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-stone-800/80 mt-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <Filter className="w-3.5 h-3.5 text-stone-500 flex-shrink-0 mr-1" />
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-stone-950 font-bold shadow'
                      : 'bg-stone-800/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 self-end sm:self-auto text-xs">
            <span className="text-stone-500 mr-1">Time:</span>
            {['All', '<30m', '30-60m', '>60m'].map((timeOpt) => (
              <button
                key={timeOpt}
                onClick={() => setSelectedTimeFilter(timeOpt)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedTimeFilter === timeOpt
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {timeOpt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Cards Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecipes.map((recipe, idx) => {
            const isFav = isFavorite(recipe.id);
            return (
              <div
                key={`${recipe.id}-${idx}`}
                className="group bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image / Header area */}
                  <div className="relative h-48 w-full bg-stone-800 overflow-hidden">
                    <ImageWithFallback
                      src={recipe.referenceImages[0]}
                      alt={recipe.name}
                      foodName={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none"></div>

                    <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md border border-stone-700/80 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                        {recipe.category}
                      </span>
                      {recipe.isCustom && (
                        <span className="px-2 py-0.5 rounded-full bg-sky-500/90 text-stone-950 font-bold text-[10px]">
                          Custom
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {recipe.isCustom && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRecipe(recipe.id, recipe.name);
                          }}
                          className="p-2 rounded-full bg-stone-900/80 text-stone-400 hover:text-red-400 border border-stone-700 backdrop-blur-md transition-colors"
                          title="Delete custom dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(recipe.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                          isFav
                            ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30'
                            : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700'
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                      <h3 className="text-xl font-bold text-white font-serif tracking-tight drop-shadow">
                        {recipe.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-orange-400" />
                        <span>{recipe.calories}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>{recipe.cooking_time}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      <span className="font-semibold text-stone-300">Ingredients:</span> {recipe.ingredients}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => setCookingRecipe(recipe)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-[0.98]"
                  >
                    <Flame className="w-4 h-4 fill-current text-stone-950" />
                    <span>Start Cooking Suite</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setActiveModalRecipe(recipe);
                        setModalServingMultiplier(1);
                      }}
                      className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ChefHat className="w-3.5 h-3.5 text-amber-400" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onSelectRecipe(recipe)}
                      className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-400" />
                      <span>Scan Photo</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-12 text-center space-y-4">
          <Utensils className="w-10 h-10 text-stone-600 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-stone-200">No dishes match your filter</h3>
            <p className="text-xs text-stone-400 mt-1">
              Try adjusting your search terms or category/time filters.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedTimeFilter('All');
            }}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-semibold border border-stone-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Modal for adding a Custom Recipe & Computing 80-D Embedding */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div 
            className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-6 relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Add Custom Dish & Train Vector</h2>
                  <p className="text-xs text-stone-400">
                    Extracts 80-D spatial RGB & HSV features so this dish can be recognized via photo scan
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveCustomRecipe} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-stone-300 block mb-1">Dish Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Roasted Plantain & Fish"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-300 block mb-1">Category</label>
                    <select
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 outline-none"
                    >
                      {categories.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-300 block mb-1">Estimated Calories</label>
                    <input
                      type="text"
                      placeholder="e.g. 520 kcal"
                      value={customCalories}
                      onChange={(e) => setCustomCalories(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-300 block mb-1">Cooking Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 45 mins"
                      value={customTime}
                      onChange={(e) => setCustomTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-300 block mb-1">
                    Upload Reference Photo (Used to build 80-D vector)
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer border border-stone-700">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Select Photo</span>
                      <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                    </label>
                    {customImageSrc && (
                      <div className="flex items-center gap-2">
                        <img src={customImageSrc} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-amber-400" />
                        <span className="text-[11px] text-emerald-400 font-medium">Image loaded</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-300 block mb-1">Ingredients (comma-separated) *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="e.g. 4 ripe plantains, 2 fresh mackerel fish, 1 tbsp pepper, 2 tbsp palm oil, 1 tsp salt"
                    value={customIngredients}
                    onChange={(e) => setCustomIngredients(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-stone-300 block mb-1">Preparation & Cooking Steps *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Step by step directions for cooking..."
                    value={customDirections}
                    onChange={(e) => setCustomDirections(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-700 text-stone-200 text-xs focus:border-amber-400 outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isSubmitting ? 'Computing Features...' : 'Save & Train Model'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal for full recipe details & Scaler */}
      {activeModalRecipe && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto"
          onClick={() => setActiveModalRecipe(null)}
        >
          <div 
            className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-6 relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModalRecipe(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {activeModalRecipe.category} • {activeModalRecipe.origin}
                  </span>
                  {activeModalRecipe.isCustom && (
                    <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold">
                      Custom Dish
                    </span>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif mt-1">
                  {activeModalRecipe.name}
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-stone-950/70 border border-stone-800 text-center">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Calories</div>
                  <div className="text-xs font-bold text-stone-200 mt-0.5">{activeModalRecipe.calories}</div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Time</div>
                  <div className="text-xs font-bold text-stone-200 mt-0.5">{activeModalRecipe.cooking_time}</div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Difficulty</div>
                  <div className="text-xs font-bold text-stone-200 mt-0.5">{activeModalRecipe.difficulty}</div>
                </div>
              </div>

              {/* Scalable Ingredients */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-200">Ingredients (Scaled)</h3>
                  <div className="flex items-center gap-1 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold mr-1">Multiplier:</span>
                    <button
                      onClick={() => setModalServingMultiplier((prev) => Math.max(0.5, prev - 0.5))}
                      className="p-0.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-xs font-bold text-amber-400 px-1">{modalServingMultiplier}x</span>
                    <button
                      onClick={() => setModalServingMultiplier((prev) => Math.min(5, prev + 0.5))}
                      className="p-0.5 rounded hover:bg-stone-800 text-stone-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-stone-300 leading-relaxed flex flex-wrap gap-2">
                  {scaleIngredientsText(activeModalRecipe.ingredients, modalServingMultiplier).map((ing, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-stone-200">
                      • {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-stone-200">Preparation & Cooking Steps</h3>
                  <button
                    onClick={() => handleModalSpeak(activeModalRecipe)}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    {modalIsSpeaking ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{modalIsSpeaking ? 'Stop Voice' : 'Read Aloud'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-sm text-stone-300 leading-relaxed">
                  {activeModalRecipe.directions}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
                {activeModalRecipe.isCustom ? (
                  <button
                    onClick={() => handleDeleteRecipe(activeModalRecipe.id, activeModalRecipe.name)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 border border-red-500/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Custom Dish</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const rec = activeModalRecipe;
                      setActiveModalRecipe(null);
                      setCookingRecipe(rec);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-md shadow-amber-500/10"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Start Cooking</span>
                  </button>

                  <button
                    onClick={() => {
                      const recipeToScan = activeModalRecipe;
                      setActiveModalRecipe(null);
                      onSelectRecipe(recipeToScan);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>Scan in Camera</span>
                  </button>

                  <button
                    onClick={() => onToggleFavorite(activeModalRecipe.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                      isFavorite(activeModalRecipe.id)
                        ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                        : 'bg-stone-800 text-stone-300 border-stone-700'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{isFavorite(activeModalRecipe.id) ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Automated Cooking Assistant Modal */}
      {cookingRecipe && (
        <InteractiveCookingAssistant
          recipe={cookingRecipe}
          servingsMultiplier={modalServingMultiplier}
          isOpen={!!cookingRecipe}
          onClose={() => setCookingRecipe(null)}
        />
      )}
    </div>
  );
};
