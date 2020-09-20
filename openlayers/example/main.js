import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { View } from "ol";
import { fromLonLat } from "ol/proj";
import { FullScreen, defaults as defaultControls } from "ol/control";

const view = new View({
  center: fromLonLat([16.871871, 41.117143], "EPSG:3857"),
  zoom: 18,
});

const map = new Map({
  controls: defaultControls().extend([
    new FullScreen({
      source: "fullscreen",
    }),
  ]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: "map",
  view: view,
});

view.centerOn([41.117143, 16.871871]);
