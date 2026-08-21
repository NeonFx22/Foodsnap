import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  VolumeX, 
  Flame, 
  Clock, 
  Utensils, 
  ChefHat, 
  Plus, 
  Minus, 
  Sparkles, 
  Check, 
  BookOpen,
  CookingPot,
  Volume1
} from 'lucide-react';
import { Recipe, CookingStep } from '../types';
import { playChimeSound, scaleIngredientsText } from '../utils/mlEngine';
import { ImageWithFallback } from './ImageWithFallback';

interface InteractiveCookingAssistantProps {
  recipe: Recipe;
  servingsMultiplier?: number;
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'prep' | 'focus' | 'overview';
}

export const InteractiveCookingAssistant: React.FC<InteractiveCookingAssistantProps> = ({
  recipe,
  servingsMultiplier: initialMultiplier = 1,
  isOpen,
  onClose
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [multiplier, setMultiplier] = useState(initialMultiplier || 1);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showAllIngredientsDrawer, setShowAllIngredientsDrawer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Scaled full ingredients list
  const fullIngredientsList = useMemo(() => {
    return scaleIngredientsText(recipe.ingredients, multiplier);
  }, [recipe.ingredients, multiplier]);

  // Clean, structured cooking steps
  const steps: CookingStep[] = useMemo(() => {
    if (recipe.steps && recipe.steps.length > 0) {
      return recipe.steps;
    }

    // NLP parsing from directions if not pre-defined
    const rawSentences = recipe.directions
      .split(/(?<=[.!?])\s+|\n+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 8);

    return rawSentences.map((sentence, idx) => {
      let duration = 300;
      let actionType: CookingStep['actionType'] = 'prep';
      let flame: CookingStep['flameLevel'] = 'Off / Prep';
      const text = sentence.toLowerCase();

      if (text.includes('boil') || text.includes('parboil')) {
        duration = 600;
        actionType = 'boil';
        flame = 'High Heat';
      } else if (text.includes('fry') || text.includes('saute') || text.includes('sauté') || text.includes('sear') || text.includes('brown')) {
        duration = 420;
        actionType = 'fry';
        flame = 'Medium-High';
      } else if (text.includes('simmer') || text.includes('stew') || text.includes('braise')) {
        duration = 900;
        actionType = 'simmer';
        flame = 'Low Heat';
      } else if (text.includes('steam')) {
        duration = 1200;
        actionType = 'steam';
        flame = 'Medium Heat';
      } else if (text.includes('grill') || text.includes('roast') || text.includes('char')) {
        duration = 720;
        actionType = 'grill';
        flame = 'High Heat';
      } else if (text.includes('blend') || text.includes('puree') || text.includes('grind')) {
        duration = 180;
        actionType = 'blend';
        flame = 'Off / Prep';
      } else if (text.includes('bake')) {
        duration = 1500;
        actionType = 'bake';
        flame = 'Medium Heat';
      } else if (text.includes('rest') || text.includes('serve') || text.includes('garnish')) {
        duration = 180;
        actionType = 'rest';
        flame = 'Off / Prep';
      }

      // Clean, human-friendly title
      let stepTitle = `Step ${idx + 1}: Preparation`;
      if (actionType === 'boil') stepTitle = `Step ${idx + 1}: Boil & Hydrate`;
      else if (actionType === 'fry') stepTitle = `Step ${idx + 1}: Sauté & Fry Base`;
      else if (actionType === 'simmer') stepTitle = `Step ${idx + 1}: Simmer & Cook Through`;
      else if (actionType === 'steam') stepTitle = `Step ${idx + 1}: Steam`;
      else if (actionType === 'grill') stepTitle = `Step ${idx + 1}: Grill & Roast`;
      else if (actionType === 'blend') stepTitle = `Step ${idx + 1}: Blend Ingredients`;
      else if (actionType === 'bake') stepTitle = `Step ${idx + 1}: Bake in Oven`;
      else if (actionType === 'rest') stepTitle = `Step ${idx + 1}: Rest & Garnish`;

      // Extract matching ingredients for this step
      const matchingIngredients = fullIngredientsList.filter((ing) => {
        const words = ing.toLowerCase().split(/[ ,()]+/);
        return words.some((w) => w.length > 3 && text.includes(w));
      });

      return {
        stepNumber: idx + 1,
        title: stepTitle,
        instruction: sentence,
        durationSeconds: duration,
        formattedDuration: `${Math.round(duration / 60)} min${duration >= 120 ? 's' : ''}`,
        actionType,
        flameLevel: flame,
        stepIngredients: matchingIngredients.length > 0 ? matchingIngredients : undefined,
        tip: idx === 0 
          ? 'Measure and prepare ingredients in advance for a smoother workflow.' 
          : idx === rawSentences.length - 1 
          ? 'Taste for seasoning right before plating.' 
          : undefined
      };
    });
  }, [recipe, fullIngredientsList]);

  const currentStep = steps[activeStepIndex] || steps[0];
  const totalSteps = steps.length;
  const progressPercent = Math.round(((activeStepIndex + 1) / totalSteps) * 100);

  // Sync timer when active step changes
  useEffect(() => {
    if (currentStep) {
      setSecondsRemaining(currentStep.durationSeconds);
      setIsTimerRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [activeStepIndex, currentStep]);

  // Timer interval countdown
  useEffect(() => {
    if (isTimerRunning && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            if (isSoundEnabled) {
              playChimeSound();
            }
            setCompletedSteps((c) => ({ ...c, [activeStepIndex]: true }));
            
            if (autoAdvance) {
              if (activeStepIndex < totalSteps - 1) {
                setTimeout(() => {
                  setActiveStepIndex((idx) => idx + 1);
                }, 1000);
              } else {
                setIsCompleted(true);
              }
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, secondsRemaining, isSoundEnabled, autoAdvance, activeStepIndex, totalSteps]);

  // Keyboard shortcuts (Space = pause/play, Left/Right = steps, Esc = close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsTimerRunning((prev) => !prev);
      } else if (e.code === 'ArrowRight' && activeStepIndex < totalSteps - 1) {
        e.preventDefault();
        setActiveStepIndex((prev) => prev + 1);
      } else if (e.code === 'ArrowLeft' && activeStepIndex > 0) {
        e.preventDefault();
        setActiveStepIndex((prev) => prev - 1);
      } else if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeStepIndex, totalSteps, onClose]);

  if (!isOpen) return null;

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const timerPercentage = currentStep.durationSeconds > 0 
    ? Math.max(0, Math.min(100, (secondsRemaining / currentStep.durationSeconds) * 100))
    : 0;

  // Voice narration
  const handleSpeakStep = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Step ${currentStep.stepNumber}. ${currentStep.instruction}`
      );
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const adjustTime = (deltaSeconds: number) => {
    setSecondsRemaining((prev) => Math.max(0, prev + deltaSeconds));
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setSecondsRemaining(currentStep.durationSeconds);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto overscroll-contain"
      id="clean-cooking-assistant-modal"
    >
      <div className="w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Clean Bar */}
        <div className="bg-stone-950 border-b border-stone-800/80 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3 flex-shrink-0">
          
          {/* Left: Recipe Name & Step Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-800 border border-stone-700 flex-shrink-0">
              <ImageWithFallback
                src={recipe.referenceImages[0]}
                alt={recipe.name}
                foodName={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold font-mono uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Step {activeStepIndex + 1} of {totalSteps}
                </span>
                <span className="text-stone-400 text-xs hidden sm:inline">• {recipe.origin}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white truncate font-serif">
                {recipe.name}
              </h2>
            </div>
          </div>

          {/* Right: Quick Tools (Portions, Ingredients Toggle, Voice, Sound, Close) */}
          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* Portion Scaler */}
            <div className="flex items-center bg-stone-900 border border-stone-800 rounded-xl px-2 py-1 text-xs">
              <button
                onClick={() => setMultiplier((prev) => Math.max(0.5, prev - 0.5))}
                className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                title="Decrease portion"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="font-mono font-bold text-amber-400 px-1.5 text-xs">{multiplier}x</span>
              <button
                onClick={() => setMultiplier((prev) => Math.min(4, prev + 0.5))}
                className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-stone-200"
                title="Increase portion"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Toggle Full Ingredients Drawer */}
            <button
              onClick={() => setShowAllIngredientsDrawer(!showAllIngredientsDrawer)}
              className={`p-2 rounded-xl text-xs font-semibold border transition-colors flex items-center gap-1.5 ${
                showAllIngredientsDrawer 
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold' 
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-800'
              }`}
              title="View all recipe ingredients"
            >
              <Utensils className="w-4 h-4" />
              <span className="hidden sm:inline">Ingredients</span>
            </button>

            {/* Read Aloud Voice Button */}
            <button
              onClick={handleSpeakStep}
              className={`p-2 rounded-xl text-xs border transition-colors ${
                isSpeaking 
                  ? 'bg-amber-500 text-stone-950 border-amber-400 animate-pulse' 
                  : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-800'
              }`}
              title={isSpeaking ? 'Stop voice reading' : 'Read instruction aloud'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-stone-950" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors"
              title="Close cooking mode"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thin Step Progress Bar */}
        <div className="w-full bg-stone-950 h-1 flex-shrink-0">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Completed Celebration View */}
        {isCompleted ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-5 flex-1 my-auto overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl">
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>

            <div className="max-w-md space-y-1.5">
              <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                Cooking Complete
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                {recipe.name} is Ready!
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                All {totalSteps} cooking steps have been completed. Let it rest for 2 minutes before serving hot.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setIsCompleted(false);
                  setActiveStepIndex(0);
                  setCompletedSteps({});
                }}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Cook Again</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors shadow-lg shadow-amber-500/20"
              >
                Done
              </button>
            </div>
          </div>
        ) : (

          /* Clean Main Cooking Space */
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6">
            
            {/* Ingredients Drawer (Collapsible) */}
            {showAllIngredientsDrawer && (
              <div className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-amber-400" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      All Ingredients ({multiplier}x Portions)
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAllIngredientsDrawer(false)}
                    className="text-xs text-stone-400 hover:text-stone-200"
                  >
                    Hide
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 max-h-48 overflow-y-auto overscroll-contain pr-1">
                  {fullIngredientsList.map((ing, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-stone-900/80 border border-stone-800/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Step Card + Timer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              
              {/* Left Column: Focused Step Instructions (8 cols) */}
              <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between space-y-4 bg-stone-950/80 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-sm">
                
                <div className="space-y-3">
                  {/* Step Meta (Flame, Action, Time) */}
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-bold text-amber-400 uppercase tracking-wider">
                      {currentStep.title}
                    </span>
                    {currentStep.flameLevel && currentStep.flameLevel !== 'Off / Prep' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900 text-stone-300 border border-stone-800 font-medium">
                        <Flame className="w-3 h-3 text-orange-400" />
                        <span>{currentStep.flameLevel}</span>
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900 text-stone-400 border border-stone-800 font-mono">
                      <Clock className="w-3 h-3 text-stone-500" />
                      <span>{currentStep.formattedDuration}</span>
                    </span>
                  </div>

                  {/* Main Instruction Text (Clear, readable, uncluttered) */}
                  <div className="text-base sm:text-lg font-medium text-stone-100 leading-relaxed pt-1">
                    {currentStep.instruction}
                  </div>
                </div>

                {/* Step Ingredients Chips (if any required specifically for this step) */}
                {currentStep.stepIngredients && currentStep.stepIngredients.length > 0 && (
                  <div className="pt-3 border-t border-stone-800/80 space-y-2">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                      <CookingPot className="w-3.5 h-3.5 text-amber-400" />
                      <span>Add in this step:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentStep.stepIngredients.map((ing, i) => (
                        <span 
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-200 font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Chef Tip (Compact & clean) */}
                {currentStep.tip && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2">
                    <ChefHat className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="text-amber-300">Tip:</strong> {currentStep.tip}
                    </span>
                  </div>
                )}

              </div>

              {/* Right Column: Clean Kitchen Timer (5 cols) */}
              <div className="md:col-span-5 lg:col-span-4 bg-stone-950 border border-stone-800 rounded-2xl p-5 flex flex-col items-center justify-between text-center space-y-4 shadow-sm">
                
                {/* Circular Timer Display */}
                <div className="flex flex-col items-center justify-center space-y-2 pt-1">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        className="text-stone-800"
                        strokeWidth="6"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="48"
                        className="text-amber-500 transition-all duration-300"
                        strokeWidth="6"
                        strokeDasharray={301.6}
                        strokeDashoffset={301.6 * (1 - timerPercentage / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                        {formatTime(secondsRemaining)}
                      </div>
                      <span className="text-[10px] text-stone-400 font-medium">
                        {isTimerRunning ? 'Running' : 'Paused'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Timer Controls */}
                <div className="w-full space-y-2.5">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md ${
                        isTimerRunning
                          ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                          : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20'
                      }`}
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                    </button>

                    <button
                      onClick={resetTimer}
                      className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-200 border border-stone-800 transition-colors"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Nudges */}
                  <div className="flex items-center justify-center gap-1 text-[11px] font-mono text-stone-400">
                    <button
                      onClick={() => adjustTime(-30)}
                      className="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800"
                    >
                      -30s
                    </button>
                    <button
                      onClick={() => adjustTime(30)}
                      className="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300"
                    >
                      +30s
                    </button>
                    <button
                      onClick={() => adjustTime(60)}
                      className="px-2 py-1 rounded bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300"
                    >
                      +1m
                    </button>
                  </div>
                </div>

                {/* Auto advance toggle */}
                <label className="flex items-center justify-center gap-2 text-[11px] text-stone-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoAdvance}
                    onChange={(e) => setAutoAdvance(e.target.checked)}
                    className="rounded bg-stone-900 border-stone-700 text-amber-500 focus:ring-0"
                  />
                  <span>Auto-advance when timer finishes</span>
                </label>

              </div>

            </div>

          </div>
        )}

        {/* Clean Bottom Navigation */}
        {!isCompleted && (
          <div className="bg-stone-950 border-t border-stone-800/80 px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-shrink-0">
            
            {/* Previous Step */}
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 disabled:opacity-30 disabled:pointer-events-none text-stone-300 font-semibold text-xs border border-stone-800 transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Middle Step Indicator Dots */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] sm:max-w-xs py-1">
              {steps.map((_, idx) => {
                const isCurrent = idx === activeStepIndex;
                const isDone = completedSteps[idx];

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      isCurrent 
                        ? 'w-6 bg-amber-400' 
                        : isDone 
                        ? 'w-2.5 bg-emerald-500' 
                        : 'w-2 bg-stone-700 hover:bg-stone-600'
                    }`}
                    title={`Jump to step ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Next / Finish Step */}
            <div className="flex items-center gap-2">
              {activeStepIndex < totalSteps - 1 ? (
                <button
                  onClick={() => {
                    setCompletedSteps((c) => ({ ...c, [activeStepIndex]: true }));
                    setActiveStepIndex((prev) => prev + 1);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCompletedSteps((c) => ({ ...c, [activeStepIndex]: true }));
                    setIsCompleted(true);
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Finish</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
