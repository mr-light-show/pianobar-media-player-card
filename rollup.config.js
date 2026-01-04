import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;
const buildTimestamp = new Date().toISOString();

export default {
  input: 'src/pianobar-media-player-card.ts',
  output: {
    file: 'dist/pianobar-media-player-card.js',
    format: 'es',
    sourcemap: !production,
    inlineDynamicImports: true,
  },
  plugins: [
    replace({
      preventAssignment: true,
      __BUILD_TIMESTAMP__: JSON.stringify(buildTimestamp),
    }),
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationMap: false,
      sourceMap: !production,
    }),
    production && terser({
      format: {
        comments: false,
      },
    }),
  ],
};

