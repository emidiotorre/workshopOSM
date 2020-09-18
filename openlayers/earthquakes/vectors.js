import "ol/ol.css";
import KML from "ol/format/KML";
import Map from "ol/Map";
import Stamen from "ol/source/Stamen";
import { XYZ } from "ol/source";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import TileWMS from "ol/source/TileWMS";

var styleCache = {};
var styleFunction = function (feature) {
  // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
  // standards-violating <magnitude> tag in each Placemark.  We extract it from
  // the Placemark's name instead.
  var name = feature.get("name");
  var magnitude = parseFloat(name.substr(2));
  var radius = 5 + 20 * (magnitude - 5);
  var style = styleCache[radius];
  if (!style) {
    style = new Style({
      image: new CircleStyle({
        radius: radius,
        fill: new Fill({
          color: "rgba(255, 153, 0, 0.4)",
        }),
        stroke: new Stroke({
          color: "rgba(255, 204, 0, 0.2)",
          width: 1,
        }),
      }),
    });
    styleCache[radius] = style;
  }
  return style;
};
const data = require("./data/kml/2012_Earthquakes_Mag5.kml");

var vector = new VectorLayer({
  source: new VectorSource({
    url: data,
    format: new KML({
      extractStyles: false,
    }),
  }),
  style: styleFunction,
});

var raster = new TileLayer({
  source: new Stamen({
    layer: "toner",
  }),
});

var otherTiles = new TileLayer({
  source: new TileWMS({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new TileWMS({
      url: "https://ahocevar.com/geoserver/wms",
      params: { LAYERS: "topp:states", TILED: true },
      serverType: "geoserver",
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
  }),
});

var maptiler = new TileLayer({
  source: new XYZ({
    url:
      "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=BbRkFHV6XvPHPDamG2nz",
    maxZoom: 20,
  }),
});

var map = new Map({
  layers: [maptiler, vector],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

var info = $("#info");
info.tooltip({
  animation: false,
  trigger: "manual",
});

var displayFeatureInfo = function (pixel) {
  info.css({
    left: pixel[0] + "px",
    top: pixel[1] - 15 + "px",
  });
  var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
    return feature;
  });
  if (feature) {
    info.attr("data-original-title", feature.get("name")).tooltip("show");
  } else {
    info.tooltip("hide");
  }
};

map.on("pointermove", function (evt) {
  if (evt.dragging) {
    info.tooltip("hide");
    return;
  }
  displayFeatureInfo(map.getEventPixel(evt.originalEvent));
});

map.on("click", function (evt) {
  displayFeatureInfo(evt.pixel);
});
