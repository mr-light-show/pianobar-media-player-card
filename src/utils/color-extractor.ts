/**
 * Color extraction utility using node-vibrant.
 *
 * Color extraction logic adapted from mini-media-player by kalkih
 * Source: https://github.com/kalkih/mini-media-player
 * File: src/utils/colorGenerator.js
 * License: MIT
 */

// @ts-expect-error - node-vibrant types
import Vibrant from 'node-vibrant/dist/vibrant';

export interface ExtractedColors {
  background: string;
  foreground: string;
  /** Foreground color optimized for metadata area (left side in full mode) */
  metadataForeground?: string;
  /** Foreground color optimized for controls area (bottom in full mode) */
  controlsForeground?: string;
}

/**
 * Constants for color contrast calculations
 * From mini-media-player's colorGenerator.js
 */
const CONTRAST_RATIO = 4.5;
const COLOR_SIMILARITY_THRESHOLD = 150;

// Default colors when extraction fails
const DEFAULT_COLORS: ExtractedColors = {
  background: '#1c1c1c',
  foreground: '#ffffff',
};

// Cache to avoid re-extracting colors for the same image
const colorCache = new Map<string, ExtractedColors>();

/**
 * Calculate relative luminance of an RGB color
 * From mini-media-player's colorGenerator.js
 */
const luminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    const w = v / 255;
    return w <= 0.03928 ? w / 12.92 : ((w + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

/**
 * Calculate contrast ratio between two RGB colors
 * From mini-media-player's colorGenerator.js
 */
const contrast = (rgb1: number[], rgb2: number[]): number => {
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const getContrastRatio = (rgb1: number[], rgb2: number[]): number =>
  Math.round((contrast(rgb1, rgb2) + Number.EPSILON) * 100) / 100;

/**
 * Custom color generator for node-vibrant
 * Adapted from mini-media-player's colorGenerator.js
 *
 * This generator sorts colors by population and finds a foreground color
 * with sufficient contrast against the background (most prominent) color.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const colorGenerator = (colors: any[]): [string, string] => {
  colors.sort((colorA, colorB) => colorB.population - colorA.population);

  const backgroundColor = colors[0];
  let foregroundColor: number[] | undefined;

  const contrastRatios = new Map<string, number>();
  const approvedContrastRatio = (hex: string, rgb: number[]): boolean => {
    if (!contrastRatios.has(hex)) {
      contrastRatios.set(hex, getContrastRatio(backgroundColor.rgb, rgb));
    }
    return (contrastRatios.get(hex) || 0) > CONTRAST_RATIO;
  };

  // We take each next color and find one that has better contrast.
  for (let i = 1; i < colors.length && foregroundColor === undefined; i++) {
    // If this color matches, score, take it.
    if (approvedContrastRatio(colors[i].hex, colors[i].rgb)) {
      foregroundColor = colors[i].rgb;
      break;
    }

    // This color has the wrong contrast ratio, but it is the right color.
    // Let's find similar colors that might have the right contrast ratio
    const currentColor = colors[i];

    for (let j = i + 1; j < colors.length; j++) {
      const compareColor = colors[j];

      // difference. 0 is same, 765 max difference
      const diffScore =
        Math.abs(currentColor.rgb[0] - compareColor.rgb[0]) +
        Math.abs(currentColor.rgb[1] - compareColor.rgb[1]) +
        Math.abs(currentColor.rgb[2] - compareColor.rgb[2]);

      if (diffScore > COLOR_SIMILARITY_THRESHOLD) {
        continue;
      }

      if (approvedContrastRatio(compareColor.hex, compareColor.rgb)) {
        foregroundColor = compareColor.rgb;
        break;
      }
    }
  }

  if (foregroundColor === undefined) {
    foregroundColor = backgroundColor.getYiq() < 200 ? [255, 255, 255] : [0, 0, 0];
  }

  // Return [foreground, background] hex colors
  return [new backgroundColor.constructor(foregroundColor, 0).hex, backgroundColor.hex];
};

/**
 * Register custom generator with Vibrant pipeline
 * This approach is from mini-media-player's main.ts
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Vibrant as any)._pipeline.generator.register('default', colorGenerator);

/**
 * Extract colors from an image using node-vibrant
 * Approach from mini-media-player's main.ts
 */
const colorsFromPicture = async (picture: string): Promise<[string, string]> =>
  new Vibrant(picture, { colorCount: 16 }).getPalette();

/**
 * Extract colors from an artwork image URL.
 * Results are cached per URL.
 */
export async function extractColors(imageUrl: string | undefined): Promise<ExtractedColors> {
  if (!imageUrl) {
    return DEFAULT_COLORS;
  }

  // Check cache first
  const cached = colorCache.get(imageUrl);
  if (cached) {
    return cached;
  }

  try {
    const [foregroundColor, backgroundColor] = await colorsFromPicture(imageUrl);

    const result: ExtractedColors = {
      background: backgroundColor,
      foreground: foregroundColor,
    };

    // Cache the result
    colorCache.set(imageUrl, result);

    // Limit cache size
    if (colorCache.size > 50) {
      const firstKey = colorCache.keys().next().value;
      if (firstKey) colorCache.delete(firstKey);
    }

    return result;
  } catch (err) {
    console.error('Error extracting colors:', err);
    return DEFAULT_COLORS;
  }
}

/**
 * Region definition for sampling
 */
interface SampleRegion {
  x: number; // 0-1 fraction of width
  y: number; // 0-1 fraction of height
  width: number; // 0-1 fraction of width
  height: number; // 0-1 fraction of height
}

// Regions for full cover mode
const METADATA_REGION: SampleRegion = { x: 0, y: 0, width: 0.4, height: 0.7 };
const CONTROLS_REGION: SampleRegion = { x: 0, y: 0.7, width: 1, height: 0.3 };

// Overlay opacity values matching .fullcover-overlay CSS gradient
// gradient: to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%
const METADATA_OVERLAY_OPACITY = 0.3; // ~average for top 70% (0.2 to 0.4)
const CONTROLS_OVERLAY_OPACITY = 0.7; // ~average for bottom 30% (0.6 to 0.8)

/**
 * Get average color from a region of image data
 */
function getRegionAverageColor(
  imageData: ImageData,
  region: SampleRegion,
  imgWidth: number,
  imgHeight: number
): number[] {
  const startX = Math.floor(region.x * imgWidth);
  const startY = Math.floor(region.y * imgHeight);
  const endX = Math.floor((region.x + region.width) * imgWidth);
  const endY = Math.floor((region.y + region.height) * imgHeight);

  let r = 0, g = 0, b = 0, count = 0;

  // Sample every 4th pixel for performance
  for (let y = startY; y < endY; y += 4) {
    for (let x = startX; x < endX; x += 4) {
      const i = (y * imgWidth + x) * 4;
      r += imageData.data[i];
      g += imageData.data[i + 1];
      b += imageData.data[i + 2];
      count++;
    }
  }

  if (count === 0) return [128, 128, 128];
  return [Math.round(r / count), Math.round(g / count), Math.round(b / count)];
}

/**
 * Convert RGB array to hex string
 */
function rgbToHex(rgb: number[]): string {
  return '#' + rgb.map(c => c.toString(16).padStart(2, '0')).join('');
}

/**
 * Simulate blending a color with a black overlay
 * @param rgb - Original RGB color
 * @param overlayOpacity - Opacity of black overlay (0-1)
 * @returns RGB color after overlay is applied
 */
function applyBlackOverlay(rgb: number[], overlayOpacity: number): number[] {
  // Blend with black: result = original * (1 - opacity) + black * opacity
  // Since black is [0,0,0], this simplifies to: result = original * (1 - opacity)
  const factor = 1 - overlayOpacity;
  return [
    Math.round(rgb[0] * factor),
    Math.round(rgb[1] * factor),
    Math.round(rgb[2] * factor),
  ];
}

/**
 * Find a contrasting color for a given background, accounting for overlay
 * @param bgRgb - Original background RGB from the image
 * @param overlayOpacity - Opacity of black overlay applied over this region (0-1)
 * Returns white or black based on luminance after overlay is applied
 */
function getContrastingColor(bgRgb: number[], overlayOpacity: number = 0): string {
  // Apply the overlay effect to simulate what the user actually sees
  const effectiveBg = applyBlackOverlay(bgRgb, overlayOpacity);
  const lum = luminance(effectiveBg[0], effectiveBg[1], effectiveBg[2]);
  
  // If effective background is dark, use white; if light, use dark gray
  // With overlay applied, light regions become darker, so we're more likely to use white
  if (lum < 0.5) {
    return '#ffffff';
  } else {
    return '#1a1a1a';
  }
}

/**
 * Extract colors with regional sampling for full cover mode.
 * Samples specific regions of the artwork to get better color matches
 * for metadata (left side) and controls (bottom) areas.
 */
export async function extractRegionalColors(imageUrl: string | undefined): Promise<ExtractedColors> {
  // First get the base colors using existing method
  const baseColors = await extractColors(imageUrl);
  
  if (!imageUrl) {
    return baseColors;
  }

  // Check if we already have regional colors cached
  const cacheKey = `regional:${imageUrl}`;
  const cached = colorCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    // Load image into canvas to sample regions
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return baseColors;
    }

    // Use smaller size for performance
    const maxSize = 100;
    const scale = Math.min(maxSize / img.width, maxSize / img.height);
    canvas.width = Math.floor(img.width * scale);
    canvas.height = Math.floor(img.height * scale);
    
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Sample regions
    const metadataAvg = getRegionAverageColor(imageData, METADATA_REGION, canvas.width, canvas.height);
    const controlsAvg = getRegionAverageColor(imageData, CONTROLS_REGION, canvas.width, canvas.height);

    // Get contrasting colors for each region, accounting for the dark overlay
    const metadataForeground = getContrastingColor(metadataAvg, METADATA_OVERLAY_OPACITY);
    const controlsForeground = getContrastingColor(controlsAvg, CONTROLS_OVERLAY_OPACITY);

    const result: ExtractedColors = {
      ...baseColors,
      metadataForeground,
      controlsForeground,
    };

    // Cache the result
    colorCache.set(cacheKey, result);

    return result;
  } catch (err) {
    console.error('Error extracting regional colors:', err);
    return baseColors;
  }
}

/**
 * Clear the color cache
 */
export function clearColorCache(): void {
  colorCache.clear();
}