require.config({
  paths: {
    'svg-pan-zoom': '../dist/svg-pan-zoom'
  }
})

require(["svg-pan-zoom"], function(svgPanZoomRotate) {
  svgPanZoomRotate.init('#demo-tiger', {
    zoomEnabled: true,
    controlIconsEnabled: true
  });
});
