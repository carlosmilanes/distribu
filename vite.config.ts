import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), babel({
    include: /\.[jt]sx?$/, // vite-plugin-babel >=1.7 defaults to js/jsx only, which skips StyleX in .ts/.tsx
    exclude: [/node_modules/],
    babelConfig: {
      configFile: true,
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
