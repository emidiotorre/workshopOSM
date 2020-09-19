import L from "leaflet";
import data from "./data/comuni_italiani.js";

const coords = {
  bari: [41.117143, 16.871871],
};

L.Icon.Default = L.Icon.extend({
  iconUrl: "https://www.flaticon.com/svg/static/icons/svg/678/678100.svg",
  iconSize: [64, 64],
});

const map = L.map("map", {
  center: coords.bari,
  zoom: 10,
  maxZoom: 18,
});

/* L.tileLayer(
  "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=BbRkFHV6XvPHPDamG2nz",
  {
    attribution:
      'Map data &copy; <a href="https://www.openseamap.org/">OpenSeaMap</a> contributors',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map); */

L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

/* 
L.tileLayer("http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png", {
  attribution:
    'Map data &copy; <a href="https://www.openseamap.org/">OpenSeaMap</a> contributors',
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map); */

L.tileLayer(
  "https://api.maptiler.com/tiles/hillshades/{z}/{x}/{y}.png?key=BbRkFHV6XvPHPDamG2nz",
  {
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

var circle = L.circle(coords.bari, {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 50,
}).addTo(map);

L.geoJSON(data)
  .bindPopup(function (layer) {
    return (
      '<a href="' +
      layer.feature.properties.link +
      '" target="_blank">' +
      layer.feature.properties.nome_com +
      "</a>"
    );
  })
  .addTo(map);
