import "ol/ol.css";
import "ol-geocoder/dist/ol-geocoder.min.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { View } from "ol";
import { fromLonLat } from "ol/proj";
import {
  FullScreen,
  defaults as defaultControls,
  ZoomSlider,
} from "ol/control";
import { Heatmap } from "ol/layer";
import VectorSource from "ol/source/Vector";
import KML from "ol/format/KML";
import Geocoder from "ol-geocoder";

const view = new View({
  center: fromLonLat([16.871871, 41.117143], "EPSG:3857"),
  zoom: 18,
});

const map = new Map({
  controls: defaultControls().extend([
    new FullScreen({
      source: "fullscreen",
    }),
    new ZoomSlider(),
  ]),
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new Heatmap({
      source: new VectorSource({
        url: require("./data/kml/2012_Earthquakes_Mag5.kml"),
        format: new KML({
          extractStyles: false,
        }),
      }),
      weight: function (feature) {
        var name = feature.get("name");
        var magnitude = parseFloat(name.substr(2));
        return magnitude - 5;
      },
      blur: 5,
      radius: 5,
    }),
  ],
  target: "map",
  view: view,
});

var geocoder = new Geocoder("nominatim", {
  provider: "osm",
  key: "",
  lang: "pt-BR", //en-US, fr-FR
  placeholder: "Search for ...",
  targetType: "text-input",
  limit: 5,
  keepOpen: true,
});
map.addControl(geocoder);

geocoder.on("addresschosen", function (evt) {
  var feature = evt.feature,
    coord = evt.coordinate,
    address = evt.address;
  // some popup solution
  content.innerHTML = "<p>" + address.formatted + "</p>";
});
