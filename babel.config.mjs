import styleXPlugin from '@stylexjs/babel-plugin';
import path from 'node:path';

const ReactCompilerConfig = { /* ... */ };

const config = {
  presets: ["@babel/preset-typescript"], 
  plugins: [
    ["babel-plugin-react-compiler", ReactCompilerConfig],
    [
      styleXPlugin,
      {
        aliases: {
          '@/*': [path.join(process.cwd(), './*')], // maps "@/..." to "<projectRoot>/...",
        },
        // Required for this plugin
        runtimeInjection: false,
        dev: true,
        // Set this to true for snapshot testing
        // default: false
        test: false,
        // Required for CSS variable support
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: process.cwd(),
          // themeFileExtension: '.stylex.ts',
        },
      },
    ],
  ],
};

export default config;

