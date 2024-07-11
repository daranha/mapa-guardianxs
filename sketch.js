
var demoMap = L.map('map').setView([19.453191, -98.509236], 8);
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var osm = new L.TileLayer(osmUrl, {
    minZoom: 5,
    maxZoom: 16,
    attribution: osmAttrib
});
osm.addTo(demoMap);

 // Satelite Layer
 googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
 googleSat.addTo(demoMap);


/*===================================================
                      GEOJSON               
===================================================*/

var capa_OE = L.geoJSON(capa_moe).addTo(demoMap);
var capa_GWW = L.geoJSON(blitz_gww).addTo(demoMap);


/*===================================================
                      LAYER CONTROL               
===================================================*/

var baseLayers = {
    "Satellite":googleSat,
    // "Google Map":googleStreets,
    // "Water Color":Stamen_Watercolor,
    "OpenStreetMap": osm,
};

var overlays = {
    "Ordenamiento Territorial": capa_OE,
    "Global Water Watch": capa_GWW,
    // "LineData":linedata,
    // "PolygonData":polygondata
};

L.control.layers(baseLayers, overlays).addTo(demoMap);


/*===================================================
                      SEARCH BUTTON               
===================================================*/

// L.Control.geocoder().addTo(demoMap);