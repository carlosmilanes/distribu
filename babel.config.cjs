const path = require('node:path');

const ReactCompilerConfig = { /* ... */ };

module.exports = {
  presets: ["@babel/preset-typescript"], 
  plugins: [
    ["babel-plugin-react-compiler", ReactCompilerConfig],
    [
      '@stylexjs/babel-plugin',
      {
        aliases: {
          '@/*': [path.join(process.cwd(), './*')],
        },
        runtimeInjection: false,
        treeshakeCompensation: true,
        dev: process.env.NODE_ENV === "development",
        test: process.env.NODE_ENV === "test",
        unstable_moduleResolution: {
          type: 'commonJS',
        },
      },
    ],
  ],
};

