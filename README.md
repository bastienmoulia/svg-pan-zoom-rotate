# svg-pan-zoom-rotate
JS Library to allow pan, zoom and rotate on an SVG

Based on [svg-pan-zoom](https://github.com/ariutta/svg-pan-zoom/).

How To Use
----------

Reference the [svg-pan-zoom-rotate.js file](http://bastienmoulia.github.io/svg-pan-zoom-rotate/dist/svg-pan-zoom-rotate.js) from your HTML document. Then call the init method:

```js
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');
// or
var svgElement = document.querySelector('#demo-tiger')
var panZoomRotateTiger = svgPanZoomRotate.init(svgElement)
```

First argument to the init function should be a CSS selector of SVG element or a DOM Element.

If you want to override the defaults, you can optionally specify one or more arguments:

```js
svgPanZoomRotate.init('#demo-tiger', {
  viewportSelector: '.svg-pan-zoom_viewport'
, panEnabled: true
, controlIconsEnabled: false
, zoomEnabled: true
, dblClickZoomEnabled: true
, mouseWheelZoomEnabled: true
, preventMouseEventsDefault: true
, zoomScaleSensitivity: 0.2
, minZoom: 0.5
, maxZoom: 10
, fit: true
, contain: false
, center: true
, refreshRate: 'auto'
, beforeZoom: function(){}
, onZoom: function(){}
, beforePan: function(){}
, onPan: function(){}
, customEventsHandler: {}
, eventsListenerElement: null
});
```

If any arguments are specified, they must have the following value types:
* 'viewportSelector' can be querySelector string or SVGElement.
* 'panEnabled' must be true or false. Default is true.
* 'controlIconsEnabled' must be true or false. Default is false.
* 'zoomEnabled' must be true or false. Default is true.
* 'dblClickZoomEnabled' must be true or false. Default is true.
* 'mouseWheelZoomEnabled' must be true or false. Default is true.
* 'preventMouseEventsDefault' must be true or false. Default is true.
* 'zoomScaleSensitivity' must be a scalar. Default is 0.2.
* 'minZoom' must be a scalar. Default is 0.5.
* 'maxZoom' must be a scalar. Default is 10.
* 'fit' must be true or false. Default is true.
* 'contain' must be true or false. Default is false.
* 'center' must be true or false. Default is true.
* 'refreshRate' must be a number or 'auto'
* 'beforeZoom' must be a callback function to be called before zoom changes.
* 'onZoom' must be a callback function to be called when zoom changes.
* 'beforePan' must be a callback function to be called before pan changes.
* 'onPan' must be a callback function to be called when pan changes.
* 'customEventsHandler' must be an object with `init` and `destroy` arguments as functions.
* 'eventsListenerElement' must be an SVGElement or null.

`beforeZoom` will be called with 2 float attributes: oldZoom and newZoom.
If `beforeZoom` will return `false` then zooming will be halted.

`onZoom` callbacks will be called with one float attribute representing new zoom scale.

`beforePan` will be called with 2 attributes:
* `oldPan`
* `newPan`

Each of these objects has two attributes (x and y) representing current pan (on X and Y axes).

If `beforePan` will return `false` or an object `{x: true, y: true}` then panning will be halted.
If you want to prevent panning only on one axis then return an object of type `{x: true, y: false}`.
You can alter panning on X and Y axes by providing alternative values through return `{x: 10, y: 20}`.

> *Caution!* If you alter panning by returning custom values `{x: 10, y: 20}` it will update only current pan step. If panning is done by mouse/touch you have to take in account that next pan step (after the one that you altered) will be performed with values that do not consider altered values (as they even did not existed).

`onPan` callback will be called with one attribute: `newPan`.

> *Caution!* Calling zoom or pan API methods form inside of `beforeZoom`, `onZoom`, `beforePan` and `onPan` callbacks may lead to infinite loop.

`panEnabled` and `zoomEnabled` are related only to user interaction. If any of this options are disabled - you still can zoom and pan via API.

`fit` takes precedence over `contain`. So if you set `fit: true` then `contain`'s value doesn't matter.

Public API
----------

When you call `svgPanZoomMethod.init` method it returns an object with following methods:
* enablePan
* disablePan
* isPanEnabled
* pan
* panBy
* getPan
* setBeforePan
* setOnPan
* enableZoom
* disableZoom
* isZoomEnabled
* enableControlIcons
* disableControlIcons
* isControlIconsEnabled
* enableDblClickZoom
* disableDblClickZoom
* isDblClickZoomEnabled
* enableMouseWheelZoom
* disableMouseWheelZoom
* isMouseWheelZoomEnabled
* setZoomScaleSensitivity
* setMinZoom
* setMaxZoom
* setBeforeZoom
* setOnZoom
* zoom
* zoomBy
* zoomAtPoint
* zoomAtPointBy
* zoomIn
* zoomOut
* getZoom
* rotate
* rotateRelative
* getRotate
* resetZoom
* resetPan
* resetRotate
* reset
* fit
* contain
* center
* updateBBox
* resize
* getSizes
* destroy

To programmatically pan, call the pan method with vector as first argument:

```js
// Get instance
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');

// Pan to rendered point x = 50, y = 50
panZoomRotateTiger.pan({x: 50, y: 50})

// Pan by x = 50, y = 50 of rendered pixels
panZoomRotateTiger.panBy({x: 50, y: 50})
```

To programmatically zoom, you can use the zoom method to specify your desired scale value:

```js
// Get instance
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');

// Set zoom level to 2
panZoomRotateTiger.zoom(2)

// Zoom by 130%
panZoomRotateTiger.zoomBy(1.3)

// Set zoom level to 2 at point
panZoomRotateTiger.zoomAtPoint(2, {x: 50, y: 50})

// Zoom by 130% at given point
panZoomRotateTiger.zoomAtPointBy(1.3, {x: 50, y: 50})
```

> Zoom is relative to initial SVG internal zoom level. If your SVG was fit at the beginning (option `fit: true`) and thus zoomed in or out to fit available space - initial scale will be 1 anyway.

Or you can use the zoomIn or zoomOut methods:

```js
// Get instance
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');

panZoomRotateTiger.zoomIn()
panZoomRotateTiger.zoomOut()
panZoomRotateTiger.resetZoom()
```

If you want faster or slower zooming, you can override the default zoom increment with the setZoomScaleSensitivity method.

To programmatically enable/disable pan or zoom:

```js
// Get instance
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');

panZoomRotateTiger.enablePan();
panZoomRotateTiger.disablePan();

panZoomRotateTiger.enableZoom();
panZoomRotateTiger.disableZoom();
```

To fit and center (you may try `contain` instead of `fit`):

```js
// Get instance
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');

panZoomRotateTiger.fit();
panZoomRotateTiger.center();
```

If you want to fit and center your SVG after its container resize:

```js
// Get instance
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');

panZoomRotateTiger.resize(); // update SVG cached size and controls positions
panZoomRotateTiger.fit();
panZoomRotateTiger.center();
```

If you update SVG (viewport) contents so its border box (virtual box that contains all elements) changes, you have to call `updateBBox`:

```js
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');
panZoomRotateTiger.fit();

// Update SVG rectangle width
document.getElementById('demo-tiger').querySelector('rect').setAttribute('width', 200)

// fit does not work right anymore as viewport bounding box changed
panZoomRotateTiger.fit();

panZoomRotateTiger.updateBBox(); // Update viewport bounding box
panZoomRotateTiger.fit(); // fit works as expected
```

If you need more data about SVG you can call `getSizes`. It will return an object that will contain:
* `width` - SVG cached width
* `height` - SVG cached height
* `realZoom` - _a_ and _d_ attributes of transform matrix applied over viewport
* `viewBox` - an object containing cached sizes of viewport boxder box
  * `width`
  * `height`
  * `x` - x offset
  * `y` - y offset
  * `rotate` - rotation angle in degrees

Destroy SvgPanZoomRotate instance:

```js
// Get instance
var panZoomRotateTiger = svgPanZoomRotate.init('#demo-tiger');

panZoomRotateTiger.destroy();
delete panZoomRotateTiger;
```