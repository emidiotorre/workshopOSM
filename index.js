import L from "leaflet";

const coords = {
  bari: [41.117143, 16.871871],
};
var map = L.map("map", {
  center: coords.bari,
  zoom: 12,
});

L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

var circle = L.circle(coords.bari, {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
}).addTo(map);

/* L.tileLayer("http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
  attribution: '© <a href="https://www.openseamap.org/">OpenSeaMap</a> contributors',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map); */
