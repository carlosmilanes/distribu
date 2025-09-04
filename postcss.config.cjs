module.exports = {
  plugins: [
    require('@stylexjs/postcss-plugin')({
      include: ['app/**/*.{js,jsx,ts,tsx}'],
    }),
    require('autoprefixer'),
  ]
}