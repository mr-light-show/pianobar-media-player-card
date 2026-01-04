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
 * Clear the color cache
 */
export function clearColorCache(): void {
  colorCache.clear();
}
