import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Search,
  Sliders,
  Check,
  X,
  Camera,
  Layers,
  ArrowRightLeft,
  Flame,
  Globe
} from 'lucide-react';
import {
  aiImageVerifier,
  DishImageVerification
} from '../services/aiImageVerifierService';
import { ImageWithFallback } from './ImageWithFallback';

interface AIImageVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetDishId?: string;
}

export const AIImageVerifierModal: React.FC<AIImageVerifierModalProps> = ({
  isOpen,
  onClose,
  targetDishId
}) => {
  const [dishes, setDishes] = useState<DishImageVerification[]>([]);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [progress, setProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const [continuousActive, setContinuousActive] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedDishId, setSelectedDishId] = useState<string | null>(targetDishId || null);
  const [inspectingDish, setInspectingDish] = useState<DishImageVerification | null>(null);

  useEffect(() => {
    const update = () => {
      setDishes(aiImageVerifier.getAll());
      setIsBatchRunning(aiImageVerifier.getIsBatchVerifying());
      setContinuousActive(aiImageVerifier.getIsContinuousChecking());
    };

    update();
    const unsub = aiImageVerifier.subscribe(update);
    return unsub;
  }, []);

  useEffect(() => {
    if (targetDishId) {
      setSelectedDishId(targetDishId);
      const found = aiImageVerifier.getById(targetDishId);
      if (found) setInspectingDish(found);
    }
  }, [targetDishId]);

  if (!isOpen) return null;

  const handleRunBatchVerification = async () => {
    setIsBatchRunning(true);
    await aiImageVerifier.runFullAppVerification((curr, tot) => {
      setProgress({ current: curr, total: tot });
    });
    setIsBatchRunning(false);
  };

  const handleToggleDishMode = (id: string, newMode: 'original' | 'ai_verified') => {
    aiImageVerifier.setImageMode(id, newMode);
  };

  const filteredDishes = dishes.filter(d =>
    d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
    d.origin.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const avgScore = dishes.length > 0
    ? Math.round(dishes.reduce((acc, d) => acc + d.authenticityScore, 0) / dishes.length)
    : 98;

  return (
    <div
      className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex flex-col items-center justify-start p-2.5 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full my-auto sm:my-8 shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 bg-stone-900/95 backdrop-blur-md px-4 sm:px-7 py-4 border-b border-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-white font-serif">
                  AI Image Verifier &amp; Real-Time Search Engine
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Continuous culinary verification &amp; authentic original dataset photo restoration
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors flex-shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-7 overflow-y-auto overscroll-contain space-y-6 flex-1">
          {/* Top Metric & Control Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-3.5 space-y-1">
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Average Authenticity
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-amber-400 font-mono">{avgScore}%</span>
                <span className="text-xs text-stone-400">Verified Culinary Match</span>
              </div>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-3.5 space-y-1">
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Foundational Dataset Photos
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-400 font-mono">10/10</span>
                <span className="text-xs text-stone-400">Primary Local Photos Loaded</span>
              </div>
            </div>

            <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-3.5 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Continuous Web Checker
                </div>
                <div className="text-xs text-stone-300">
                  {continuousActive ? 'Auto-checking every 45s' : 'Paused'}
                </div>
              </div>
              <button
                onClick={() => aiImageVerifier.toggleContinuousChecking()}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  continuousActive
                    ? 'bg-amber-500 text-stone-950'
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {continuousActive ? 'Running' : 'Enable'}
              </button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pb-2 border-b border-stone-800/80">
            <button
              onClick={handleRunBatchVerification}
              disabled={isBatchRunning}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isBatchRunning ? 'animate-spin' : ''}`} />
              <span>{isBatchRunning ? `Verifying (${progress.current}/${progress.total})...` : 'Run Full AI Web Scan'}</span>
            </button>

            <button
              onClick={() => aiImageVerifier.restoreAllOriginalDatasetPhotos()}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>Restore All Original Project Photos</span>
            </button>

            <button
              onClick={() => aiImageVerifier.autoCorrectAllWithAIWeb()}
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Auto-Correct All with AI Web Photos</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter dishes by name, category, or origin..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Dish Verification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDishes.map((dish, idx) => {
              const isOriginalMode = dish.mode === 'original';
              const isSelected = selectedDishId === dish.id;

              return (
                <div
                  key={`${dish.id}-${idx}`}
                  className={`bg-stone-950/70 border rounded-2xl p-4 space-y-3.5 transition-all ${
                    isSelected
                      ? 'border-amber-500/70 shadow-lg shadow-amber-500/10'
                      : 'border-stone-800 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Dual-image Preview Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-stone-900 border border-stone-800 relative flex-shrink-0 shadow-md">
                      <ImageWithFallback
                        src={dish.activeUrl}
                        alt={dish.name}
                        foodName={dish.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-stone-950/90 text-[9px] font-mono font-bold text-amber-300 border border-stone-700">
                        {isOriginalMode ? 'ORIGINAL' : 'AI WEB'}
                      </span>
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-stone-400 uppercase">
                          {dish.origin}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                          <span>{dish.authenticityScore}% match</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white font-serif line-clamp-1">
                        {dish.name}
                      </h4>
                      <p className="text-[11px] text-stone-400 line-clamp-2">
                        {dish.culinaryNotes || `Authentic recipe photo for ${dish.name}`}
                      </p>
                    </div>
                  </div>

                  {/* Mode Selector Toggle */}
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-stone-900 border border-stone-800 text-[11px] font-semibold">
                    <button
                      onClick={() => handleToggleDishMode(dish.id, 'original')}
                      className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                        isOriginalMode
                          ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <Camera className="w-3 h-3" />
                      <span>Original Dataset Photo</span>
                    </button>

                    <button
                      onClick={() => handleToggleDishMode(dish.id, 'ai_verified')}
                      className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1 ${
                        !isOriginalMode
                          ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                    >
                      <Globe className="w-3 h-3" />
                      <span>AI Web Verified</span>
                    </button>
                  </div>

                  {/* Visual Hallmarks Checklist */}
                  <div className="space-y-1 pt-1 border-t border-stone-800/80">
                    <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                      Authentic Visual Hallmarks:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {dish.visualHallmarks.map((hallmark, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-stone-900 text-stone-300 border border-stone-800 text-[10px] flex items-center gap-1"
                        >
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span>{hallmark}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Individual AI Verification Button */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-stone-500">
                      ID: <span className="font-mono text-stone-400">{dish.id}</span>
                    </span>
                    <button
                      onClick={() => aiImageVerifier.verifySingleDish(dish.name, dish.id)}
                      className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-amber-300 border border-stone-800 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>AI Re-Verify</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
