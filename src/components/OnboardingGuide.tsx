import React, { useState } from 'react';
import { 
  Sparkles, 
  Camera, 
  Layers, 
  ChefHat, 
  ArrowRight, 
  X, 
  Globe, 
  Cpu, 
  HelpCircle,
  Utensils,
  Lightbulb,
  Compass,
  CheckCircle2,
  Clock,
  Volume2,
  Scale
} from 'lucide-react';
import { ActiveTab } from './Navbar';
import { SAMPLE_PRESET_IMAGES } from '../data/foodsnapData';
import { ImageWithFallback } from './ImageWithFallback';

interface OnboardingGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onSelectSample: (imgUrl: string) => void;
}

export const OnboardingGuide: React.FC<OnboardingGuideProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onSelectSample
}) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'features' | 'engine' | 'samples'>('flow');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto overscroll-contain animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-stone-900 border border-stone-800 rounded-3xl max-w-4xl w-full shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-800 flex-shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-inner">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white font-serif tracking-tight">
                  How FoodSnap Works
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                  User Guide
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Instant photographic dish recognition, global culinary recipes, and step-by-step cooking.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white border border-stone-700 transition-colors flex-shrink-0"
            title="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-5 sm:px-6 pt-4 pb-2 border-b border-stone-800/80 flex-shrink-0 overflow-x-auto scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab('flow')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 min-h-[38px] ${
              activeTab === 'flow'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>1. 4-Step Recognition Flow</span>
          </button>

          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 min-h-[38px] ${
              activeTab === 'features'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>2. Worldwide Culinary Database</span>
          </button>

          <button
            onClick={() => setActiveTab('engine')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 min-h-[38px] ${
              activeTab === 'engine'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>3. 80-D Vector Math</span>
          </button>

          <button
            onClick={() => setActiveTab('samples')}
            className={`px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 min-h-[38px] ${
              activeTab === 'samples'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-bold'
                : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>4. Test Preset Dishes</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: 4-STEP RECOGNITION FLOW */}
          {activeTab === 'flow' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Step 1 */}
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      01
                    </span>
                    <Camera className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Capture or Upload Meal Photo</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Take a live snapshot with your camera, drop any food photo, or click one of the 10 quick presets. The image is parsed directly inside the browser.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      02
                    </span>
                    <Layers className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Vector Extraction & Cosine Match</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    FoodSnap extracts an 80-dimensional spatial RGB &amp; HSV color vector, computing cosine similarity against reference embeddings in &lt; 20 milliseconds.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      03
                    </span>
                    <Globe className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Culinary Research & Measurements</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    View authentic ingredients, exact grams and cups, regional variations, flavor profiles, and nutrition facts for the recognized dish.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800/90 space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center border border-amber-500/30">
                      04
                    </span>
                    <ChefHat className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Interactive Step-by-Step Cooking</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Launch the distraction-free cooking mode equipped with integrated countdown timers, voice narration, and dynamic portion scaling.
                  </p>
                </div>

              </div>

              {/* Quick Call to Action */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-stone-900 to-stone-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-white">Ready to test dish recognition?</h5>
                    <p className="text-xs text-stone-300">Upload any photo or try sample dishes like Jollof Rice, Suya, or Egusi.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onNavigate('scanner');
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors flex items-center gap-2 whitespace-nowrap shadow-md shadow-amber-500/20"
                >
                  <span>Open Scanner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: WORLDWIDE DATABASE & FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                
                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Authentic Global Recipes</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Search hundreds of classic dishes across West African, Asian, Mediterranean, and Latin American culinary traditions.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Scale className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Dynamic Portion Scaling</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Scale recipe servings from 0.5x up to 5x with automatic recalculated ingredient quantities and volume measurements.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Smart Kitchen Timers</h4>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    Interactive countdown timers embedded within each step, accompanied by voice speech synthesis for hands-free cooking.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: 80-D VECTOR MATH */}
          {activeTab === 'engine' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                  <Cpu className="w-4 h-4" />
                  <span>Mathematical Representation (80 Dimensions)</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Every food image is decomposed into an 80-element numerical vector combining spatial quadrant RGB averages and an HSV color histogram:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                    <div className="text-xs font-bold text-amber-300">1. Spatial 4×4 RGB Grid (48 Dims)</div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      Divided into 16 grid cells with average R, G, B color values (16 × 3 = 48 dimensions) to capture layout and food placement.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 space-y-1.5">
                    <div className="text-xs font-bold text-emerald-300">2. HSV Color Histogram (32 Dims)</div>
                    <p className="text-[11px] text-stone-400 leading-relaxed">
                      24 Hue bins (15° increments), 4 Saturation bins, and 4 Value bins (24 + 4 + 4 = 32 dimensions) to capture seasonings and sauces.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-center font-mono text-xs text-amber-300">
                  Cosine Similarity (q, r) = (q · r) / (||q|| × ||r||)
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SAMPLE PRESET DISHES */}
          {activeTab === 'samples' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-stone-400">
                Click any dish below to instantly load its authentic photography and run visual recognition:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={`${preset.recipeId || preset.name}-${idx}`}
                    onClick={() => {
                      onSelectSample(preset.url);
                      onClose();
                    }}
                    className="flex flex-col rounded-2xl bg-stone-950 border border-stone-800 hover:border-amber-500/50 overflow-hidden text-left group transition-all p-2 hover:bg-stone-900/90 shadow-md"
                  >
                    <div className="w-full h-24 rounded-xl overflow-hidden bg-stone-900 relative">
                      <ImageWithFallback
                        src={preset.url}
                        alt={preset.name}
                        foodName={preset.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="pt-2 px-1">
                      <div className="text-xs font-bold text-stone-200 group-hover:text-amber-400 transition-colors truncate">
                        {preset.name}
                      </div>
                      <div className="text-[10px] text-stone-500 truncate">
                        {preset.category}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-t border-stone-800 bg-stone-900/90 flex-shrink-0">
          <button
            onClick={() => {
              onNavigate('global');
              onClose();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold border border-stone-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Explore Global Recipes</span>
          </button>

          <button
            onClick={() => {
              onNavigate('scanner');
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
          >
            <span>Start Recognition</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
