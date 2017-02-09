module.exports = {
 entry: './src/svg-pan-zoom-rotate.ts',
 output: {
   filename: '/svg-pan-zoom-rotate.js',
   path: 'dist',
   library: 'svgPanZoomRotate',
   libraryTarget: 'umd'
 },
 module: {
   rules: [
     {
       test: /\.ts?$/,
       loader: 'ts-loader',
       exclude: /node_modules/,
     },
   ]
 },
 resolve: {
   extensions: [".ts"]
 },
};