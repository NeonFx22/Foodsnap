import React, { useState } from 'react';
import { FeatureVector, Recipe } from '../types';
import { getAllEncodings, getAllRecipes } from '../utils/mlEngine';
import { SAMPLE_PRESET_IMAGES } from '../data/foodsnapData';
import { Cpu, Grid3X3, Palette, Activity, Info, BarChart2, Camera, ArrowRight, Sparkles } from 'lucide-react';

interface FeatureVisualizerProps {
  queryFeatures: FeatureVector | null;
  matchedSampleName?: string;
  onSelectImage?: (imgSrc: string) => void;
  onSelectRecipe?: (recipe: Recipe) => void;
}

export const FeatureVisualizer: React.FC<FeatureVisualizerProps> = ({
  queryFeatures,
  matchedSampleName,
  onSelectImage,
  onSelectRecipe
}) => {
  const allEncodings = getAllEncodings();
  const allRecipes = getAllRecipes();

  const [selectedDatasetEntry, setSelectedDatasetEntry] = useState<string>(
    matchedSampleName || (allEncodings[0]?.filename ?? '')
  );

  const currentDatasetEntry = allEncodings.find(
    (d) => d.filename === selectedDatasetEntry
  ) || allEncodings[0] || {
    filename: 'default.jpg',
    recipeId: '1',
    recipeName: 'Spaghetti Carbonara',
    vector: Array(80).fill(0.1)
  };

  const matchedRecipe = allRecipes.find((r) => r.id === currentDatasetEntry.recipeId || r.name === currentDatasetEntry.recipeName);

  const handleTestReference = () => {
    if (matchedRecipe && onSelectRecipe) {
      onSelectRecipe(matchedRecipe);
    } else if (matchedRecipe?.referenceImages[0] && onSelectImage) {
      onSelectImage(matchedRecipe.referenceImages[0]);
    }
  };

  const renderSpatialGrid = (grid: number[][]) => {
    return (
      <div className="grid grid-cols-4 gap-1.5 p-3 bg-stone-950 rounded-xl border border-stone-800 w-fit mx-auto">
        {grid.map((cellRGB, idx) => {
          const r = Math.round((cellRGB[0] || 0) * 255);
          const g = Math.round((cellRGB[1] || 0) * 255);
          const b = Math.round((cellRGB[2] || 0) * 255);
          return (
            <div
              key={idx}
              className="w-10 h-10 rounded-md border border-stone-700/60 shadow-sm relative group cursor-pointer transition-transform hover:scale-105"
              style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-stone-900 text-[10px] text-stone-200 border border-stone-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                RGB({r},{g},{b})
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6" id="feature-visualizer-section">
      {/* Header card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Deep Learning & Color-Texture Feature Space
              </h2>
              <p className="text-xs text-stone-400">
                80-Dimensional vector representation (48 Spatial Grid RGB + 32 HSV Color Histograms)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-stone-400">Compare Reference:</label>
            <select
              value={selectedDatasetEntry}
              onChange={(e) => setSelectedDatasetEntry(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-stone-200 text-xs focus:ring-1 focus:ring-amber-400 outline-none"
            >
              {allEncodings.map((d) => (
                <option key={d.filename} value={d.filename}>
                  {d.recipeName} ({d.filename})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Overview banner */}
        <div className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <span className="font-bold text-amber-300">How FoodSnap Recognizes Dishes:</span> When an image is submitted, FoodSnap computes a 4x4 spatial color grid (16 cells × 3 color channels = 48 values) plus a 32-bin HSV color spectrum histogram (24 Hue bins + 4 Saturation bins + 4 Value bins). The resulting 80-D vector is compared against all reference dishes via high-dimensional Cosine Similarity.
          </div>
        </div>

        {/* Feature comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Query Image Features */}
          <div className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Query Photo Embedding
                </h3>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                {queryFeatures ? 'Live Photo' : 'Preset Required'}
              </span>
            </div>

            {queryFeatures ? (
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-stone-400 mb-2 text-center font-medium">
                    Spatial 4×4 RGB Grid Means (48 Dims)
                  </div>
                  {renderSpatialGrid(queryFeatures.spatialGrid)}
                </div>

                {/* Hue Histogram */}
                <div>
                  <div className="text-xs text-stone-400 mb-2 flex items-center justify-between">
                    <span>Hue Color Spectrum (24 Bins)</span>
                    <span className="font-mono text-[10px] text-stone-500">0° → 360°</span>
                  </div>
                  <div className="h-16 flex items-end gap-1 p-2 bg-stone-950 rounded-lg border border-stone-800">
                    {queryFeatures.hsvHistogram.hue.map((val, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t transition-all hover:opacity-80 relative group"
                        style={{
                          height: `${Math.min(100, (val / 1) * 100)}%`,
                          backgroundColor: `hsl(${i * 15}, 80%, 55%)`,
                          minHeight: val > 0 ? '4px' : '0'
                        }}
                      >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded bg-stone-900 text-[9px] text-white opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                          {Math.round(val * 100) / 100}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Saturation & Value */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <div className="text-[11px] text-stone-400 mb-1.5">Saturation (4 Bins)</div>
                    <div className="h-10 flex items-end gap-1 p-1.5 bg-stone-950 rounded-lg border border-stone-800">
                      {queryFeatures.hsvHistogram.saturation.map((val, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-sky-500 rounded-t"
                          style={{ height: `${Math.min(100, (val / 1) * 100)}%`, minHeight: '3px' }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] text-stone-400 mb-1.5">Lightness Value (4 Bins)</div>
                    <div className="h-10 flex items-end gap-1 p-1.5 bg-stone-950 rounded-lg border border-stone-800">
                      {queryFeatures.hsvHistogram.value.map((val, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-amber-400 rounded-t"
                          style={{ height: `${Math.min(100, (val / 1) * 100)}%`, minHeight: '3px' }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center space-y-4">
                <p className="text-stone-400 text-xs leading-relaxed">
                  No active image scan in memory. Pick a quick sample below to extract live 80-D features immediately:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SAMPLE_PRESET_IMAGES.slice(0, 6).map((preset, idx) => (
                    <button
                      key={`${preset.recipeId || preset.name}-${idx}`}
                      onClick={() => onSelectImage && onSelectImage(preset.url)}
                      className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/50 text-left transition-all group"
                    >
                      <div className="h-16 rounded-lg overflow-hidden mb-1.5">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-stone-200 group-hover:text-amber-400 truncate block">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reference Dataset Image Features */}
          <div className="p-5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Dataset: {currentDatasetEntry.recipeName}
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                  {currentDatasetEntry.filename}
                </span>
              </div>

              {/* Reconstructed Spatial Grid for reference */}
              <div>
                <div className="text-xs text-stone-400 mb-2 text-center font-medium">
                  Reference Spatial RGB Grid (48 Dims)
                </div>
                {renderSpatialGrid(
                  Array.from({ length: 16 }, (_, i) => [
                    currentDatasetEntry.vector[i * 3] || 0,
                    currentDatasetEntry.vector[i * 3 + 1] || 0,
                    currentDatasetEntry.vector[i * 3 + 2] || 0
                  ])
                )}
              </div>

              {/* Reference Hue Histogram */}
              <div>
                <div className="text-xs text-stone-400 mb-2 flex items-center justify-between">
                  <span>Reference Hue Color Spectrum (24 Bins)</span>
                  <span className="font-mono text-[10px] text-stone-500">0° → 360°</span>
                </div>
                <div className="h-16 flex items-end gap-1 p-2 bg-stone-950 rounded-lg border border-stone-800">
                  {currentDatasetEntry.vector.slice(48, 72).map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t"
                      style={{
                        height: `${Math.min(100, (val / 1) * 100)}%`,
                        backgroundColor: `hsl(${i * 15}, 80%, 55%)`,
                        minHeight: val > 0 ? '4px' : '0'
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Raw Vector Snapshot */}
              <div className="pt-2">
                <div className="text-[11px] text-stone-400 mb-1.5 flex items-center justify-between">
                  <span>80-Dimensional Vector (First 12 Values)</span>
                  <span className="font-mono text-[10px] text-emerald-400">80 floats</span>
                </div>
                <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-800 font-mono text-[10px] text-stone-400 overflow-x-auto">
                  [{currentDatasetEntry.vector.slice(0, 12).map((v) => v.toFixed(3)).join(', ')}, ...]
                </div>
              </div>
            </div>

            {/* Quick Test in Scanner button */}
            <div className="pt-4 border-t border-stone-800">
              <button
                onClick={handleTestReference}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/10"
              >
                <Camera className="w-4 h-4" />
                <span>Test & Match "{currentDatasetEntry.recipeName}" in Scanner</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
