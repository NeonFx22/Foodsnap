import React, { useState, useRef, useEffect } from 'react';
import { Upload, Camera, Image as ImageIcon, RefreshCw, X, AlertCircle, Sparkles, Zap, ArrowRight, HelpCircle, Globe, BookmarkCheck } from 'lucide-react';
import { SAMPLE_PRESET_IMAGES } from '../data/foodsnapData';
import { ImageWithFallback } from './ImageWithFallback';
import { getCustomRecipes } from '../utils/mlEngine';
import { getVerifiedFoodImage } from '../utils/foodImageHelper';
import { Recipe } from '../types';

interface ImageUploaderProps {
  onImageSelected: (imageSrc: string) => void;
  isLoading: boolean;
  selectedImage: string | null;
  onOpenGuide?: () => void;
  onOpenGlobalSearch?: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  isLoading,
  selectedImage,
  onOpenGuide,
  onOpenGlobalSearch
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [sampleCategoryFilter, setSampleCategoryFilter] = useState<string>('All');
  const [customSavedDishes, setCustomSavedDishes] = useState<Array<{ name: string; category: string; url: string; hint: string }>>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load custom saved recipes (filtered against preset names to avoid duplicates)
  useEffect(() => {
    try {
      const saved = getCustomRecipes();
      if (saved && saved.length > 0) {
        const builtInNames = new Set(SAMPLE_PRESET_IMAGES.map((p) => p.name.toLowerCase().trim()));
        const mapped = saved
          .filter((r) => !builtInNames.has(r.name.toLowerCase().trim()))
          .map((r) => ({
            name: r.name,
            category: 'Saved Dishes',
            url: getVerifiedFoodImage(r.name, r.category, r.referenceImages?.[0]),
            hint: `${r.origin || 'Custom'} - ${r.calories || '500 kcal'}`
          }));
        setCustomSavedDishes(mapped);
      }
    } catch {
      // Ignore localStorage read errors
    }
  }, []);

  // Clean up camera stream when unmounting or switching off
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onImageSelected(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error('Camera access failed:', err);
      setCameraError('Unable to access camera. Please allow camera permissions or upload a photo.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      stopCamera();
      onImageSelected(dataUrl);
    }
  };

  const sampleCategories = [
    'All',
    ...(customSavedDishes.length > 0 ? ['Saved Dishes'] : []),
    'Rice & Grains',
    'Soups & Stews',
    'Grilled & Street Food',
    'Snacks & Pastries',
    'Pasta & Noodles',
    'Salads & Healthy'
  ];

  const allSamples = [...customSavedDishes, ...SAMPLE_PRESET_IMAGES];

  const filteredSamples = allSamples.filter((item) => {
    if (sampleCategoryFilter === 'All') return true;
    if (sampleCategoryFilter === 'Saved Dishes') return item.category === 'Saved Dishes';
    return item.category.toLowerCase().includes(sampleCategoryFilter.toLowerCase()) || sampleCategoryFilter.toLowerCase().includes(item.category.toLowerCase());
  });

  return (
    <div className="w-full space-y-6" id="image-uploader-section">
      {/* Friendly New User Banner if no image selected yet */}
      {!selectedImage && (
        <div className="bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 border border-amber-500/30 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Recognize Any Food in &lt;25ms</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-semibold">
                  Zero Cloud Delay
                </span>
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Snap a food dish with your camera, upload an image, or click any sample below to extract 80-D vectors and match recipes.
              </p>
            </div>
          </div>

          {onOpenGuide && (
            <button
              onClick={onOpenGuide}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold border border-stone-700 transition-colors flex-shrink-0"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>How It Works Guide</span>
            </button>
          )}
        </div>
      )}

      {/* Upload card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-amber-500" />
              <span>Input Food Photo</span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Upload an image, snap via camera, or select a sample dish to extract color-spatial features.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenGlobalSearch && (
              <button
                onClick={onOpenGlobalSearch}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
                title="Search worldwide recipe database and ingredients"
              >
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Global Search</span>
              </button>
            )}
            {!isCameraActive ? (
              <button
                id="btn-open-camera"
                onClick={startCamera}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
              >
                <Camera className="w-4 h-4 text-amber-400" />
                <span>Open Camera</span>
              </button>
            ) : (
              <button
                id="btn-close-camera"
                onClick={stopCamera}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 text-red-300 text-xs font-semibold border border-red-800 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Close Camera</span>
              </button>
            )}
          </div>
        </div>

        {/* Camera Live Mode */}
        {isCameraActive && (
          <div className="mt-5 relative rounded-2xl overflow-hidden bg-black aspect-video max-h-[380px] flex items-center justify-center border border-amber-500/40 shadow-inner">
            {cameraError ? (
              <div className="p-6 text-center text-red-300">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <p className="text-sm">{cameraError}</p>
                <button
                  onClick={stopCamera}
                  className="mt-3 px-4 py-1.5 bg-stone-800 text-white rounded-lg text-xs"
                >
                  Return to File Upload
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Viewfinder crosshairs */}
                <div className="absolute inset-0 border-2 border-amber-400/40 rounded-2xl pointer-events-none m-6"></div>
                <div className="absolute bottom-4 inset-x-0 flex justify-center">
                  <button
                    id="btn-capture-photo"
                    onClick={capturePhoto}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg active:scale-95 transition-transform"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Dish Photo</span>
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Standard Drag & Drop Zone */}
        {!isCameraActive && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`mt-4 border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-150 ${
              isDragging
                ? 'border-amber-400 bg-amber-500/10'
                : selectedImage
                ? 'border-stone-700 bg-stone-950/60 hover:border-amber-500/50'
                : 'border-stone-700 bg-stone-950/40 hover:border-stone-600 hover:bg-stone-950/60'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {selectedImage ? (
              <div className="flex flex-col items-center">
                <div className="relative group max-w-[280px] rounded-xl overflow-hidden shadow-lg border border-stone-700">
                  <ImageWithFallback
                    src={selectedImage}
                    alt="Selected Food"
                    foodName="Selected Food"
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold p-4 text-center">
                    Click to replace photo or choose another sample below
                  </div>
                </div>
                <p className="mt-3 text-xs text-amber-400 font-medium flex items-center gap-1.5">
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  {isLoading ? 'Extracting feature vectors & running cosine search...' : 'Photo loaded & classified — click to choose another'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 shadow mb-3">
                  <Upload className="w-7 h-7" />
                </div>
                <h3 className="text-base font-semibold text-stone-200">
                  Drag and drop a food image here, or click to browse
                </h3>
                <p className="text-xs text-stone-400 mt-1 max-w-sm">
                  Supports JPEG, PNG, and WebP formats.
                </p>
                <span className="mt-4 inline-flex items-center px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-colors">
                  Select Image File
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Test Sample Dataset with Category Chips */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-stone-200 uppercase tracking-wider">
              1-Click Sample Dataset Dishes
            </h3>
          </div>
          <span className="text-[11px] text-stone-400">Click any dish to instantly test recognition</span>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-1.5">
          {sampleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSampleCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                sampleCategoryFilter === cat
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
          {filteredSamples.map((preset, idx) => {
            const isCurrent = selectedImage === preset.url;
            return (
              <button
                key={`${preset.category}-${preset.name}-${idx}`}
                onClick={() => onImageSelected(preset.url)}
                className={`flex flex-col items-start p-2 rounded-xl border text-left transition-all group ${
                  isCurrent
                    ? 'bg-amber-600/20 border-amber-400 ring-2 ring-amber-400/40 shadow-lg'
                    : 'bg-stone-950/60 border-stone-800 hover:border-amber-500/50 hover:bg-stone-850'
                }`}
              >
                <div className="w-full h-20 rounded-lg overflow-hidden bg-stone-800 mb-2 relative">
                  <ImageWithFallback
                    src={preset.url}
                    alt={preset.name}
                    foodName={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent pointer-events-none"></div>
                  <span className="absolute bottom-1.5 left-1.5 text-[11px] font-bold text-white truncate max-w-[95%] pointer-events-none drop-shadow-sm">
                    {preset.name}
                  </span>
                </div>
                <div className="px-0.5 w-full">
                  <span className="text-[10px] text-amber-400/90 font-medium block truncate">
                    {preset.category}
                  </span>
                  <span className="text-[9px] text-stone-500 block truncate mt-0.5">
                    {preset.hint}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
