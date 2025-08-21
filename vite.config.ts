import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { stylex } from '@stylex-extend/vite';
import babel from "vite-plugin-babel";

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), stylex(), babel({
    filter: /\.[jt]sx?$/,
    babelConfig: {
      presets: ["@babel/preset-typescript"], // if you use TypeScript
      plugins: [
        ["babel-plugin-react-compiler", ReactCompilerConfig],
      ],
    },
  }),],
  build: {
    target: 'es2022', // Support modern JavaScript features including top-level await
    minify: 'esbuild',
  },
  esbuild: {
    target: 'es2022', // Ensure esbuild also uses modern target
  },
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
    esbuildOptions: {
      target: 'es2022', // Modern target for dependency optimization
    },
  },
});
