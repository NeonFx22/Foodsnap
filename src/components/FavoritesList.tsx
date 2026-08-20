import React from 'react';
import { Recipe, UploadHistoryItem } from '../types';
import { getAllRecipes } from '../utils/mlEngine';
import { Bookmark, History, Trash2, Clock, Flame, ArrowRight, BookOpen, Camera, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface FavoritesListProps {
  favoriteIds: string[];
  historyItems: UploadHistoryItem[];
  onToggleFavorite: (recipeId: string) => void;
  onClearHistory: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onSelectImage?: (imgSrc: string) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  favoriteIds,
  historyItems,
  onToggleFavorite,
  onClearHistory,
  onSelectRecipe,
  onSelectImage
}) => {
  const allRecipes = getAllRecipes();
  const favoriteRecipes = allRecipes.filter((r) => favoriteIds.includes(r.id));

  const handleHistoryClick = (item: UploadHistoryItem) => {
    if (onSelectImage) {
      onSelectImage(item.imagePreview);
    } else {
      const matchRecipe = allRecipes.find((r) => r.id === item.recipeId || r.name === item.topMatchName);
      if (matchRecipe) {
        onSelectRecipe(matchRecipe);
      }
    }
  };

  return (
    <div className="w-full space-y-8" id="saved-and-history-section">
      {/* Saved Favorites Section */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Saved Favorite Recipes</h2>
              <p className="text-xs text-stone-400">Bookmarked dishes saved to local storage</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-stone-800 text-stone-300">
            {favoriteRecipes.length} saved
          </span>
        </div>

        {favoriteRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {favoriteRecipes.map((recipe, idx) => (
              <div
                key={`${recipe.id}-${idx}`}
                onClick={() => onSelectRecipe(recipe)}
                className="group p-4 rounded-xl bg-stone-950/70 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400">
                      {recipe.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(recipe.id);
                      }}
                      className="text-stone-500 hover:text-red-400 p-1"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-stone-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-400" /> {recipe.calories}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" /> {recipe.cooking_time}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 group-hover:text-amber-400">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    <span>Open in Recognizer</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-stone-500 text-xs">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-stone-600" />
            <p>No favorites saved yet. Click the bookmark icon on any recipe to save it here!</p>
          </div>
        )}
      </div>

      {/* Recognition History Section */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Recognition History Log</h2>
              <p className="text-xs text-stone-400">Click any past scan to re-examine or match again</p>
            </div>
          </div>

          {historyItems.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Log</span>
            </button>
          )}
        </div>

        {historyItems.length > 0 ? (
          <div className="divide-y divide-stone-800 mt-2 max-h-[360px] overflow-y-auto">
            {historyItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleHistoryClick(item)}
                className="py-3.5 px-3 flex items-center justify-between gap-4 text-xs hover:bg-stone-800/80 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-stone-800 overflow-hidden flex-shrink-0 border border-stone-700 group-hover:border-amber-500 transition-colors relative">
                    <ImageWithFallback
                      src={item.imagePreview}
                      alt={item.topMatchName}
                      foodName={item.topMatchName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-200 text-sm group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                      <span>{item.topMatchName}</span>
                    </h4>
                    <span className="text-[11px] text-stone-500">{item.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right font-mono">
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase">Confidence</div>
                    <div className="font-bold text-emerald-400">{item.confidence}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 uppercase">Latency</div>
                    <div className="font-semibold text-amber-400">{item.inferenceMs} ms</div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-amber-400 font-sans font-semibold pl-2">
                    <span>Re-scan</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center text-stone-500 text-xs">
            <History className="w-8 h-8 mx-auto mb-2 text-stone-600" />
            <p>No scans recorded yet. Upload or snap a dish to build your recognition history!</p>
          </div>
        )}
      </div>
    </div>
  );
};
