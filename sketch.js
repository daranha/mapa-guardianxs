
var demoMap = L.map('map').setView([19.353191, -96.929236], 10);
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

var osm = new L.TileLayer(osmUrl, {
    minZoom: 5,
    maxZoom: 18,
    attribution: osmAttrib
});
osm.addTo(demoMap);

 // Satelite Layer
 googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
 googleSat.addTo(demoMap);


 var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
        maxZoom: 19
    });
    CartoDB_DarkMatter.addTo(demoMap);
    
    // Google Map Layer
    
    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
     });
     googleStreets.addTo(demoMap);
    
    
    
    var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
     attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
    });
    Stamen_Watercolor.addTo(demoMap);



/*===================================================
                      GEOJSON               
===================================================*/

var capa_GWW = L.geoJSON(blitz_gww, {
    onEachFeature: function(feature,layer){
        layer.bindPopup('<b>status: </b>' + feature.properties.CATEGORIA)
    },
    style:{
        fillColor: 'red',
        fillOpacity:1,
        color: 'green'
    },
    pointToLayer: function(feature, latlng) {
        return new L.Marker(latlng, 
            { icon: categoriaColor(feature.properties.CATEGORIA) });
    }
}).addTo(demoMap);


// var capa_OE = L.geoJSON(capa_moe).addTo(demoMap);

var capa_OE = new L.geoJSON(capa_moe, {
    onEachFeature: function(feature,layer){
        layer.bindPopup('<b>status: </b>' + feature.properties.POL_GEN);
    },
    // icon:{
    //     fillColor: 'red',
    //     fillOpacity:1,
    //     color: 'green'
    // }
}).addTo(demoMap);


/*===================================================
                      LAYER CONTROL               
===================================================*/

var baseLayers = {
    "Satélite":googleSat,
    "Google Map":googleStreets,
    "Oscuro": CartoDB_DarkMatter,
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



/*===================================================
        INTENTO INTERACTIVIDAD OET
===================================================*/

// L.geoJSON(blitz_gww, pointToLayer).addTo(demoMap);

        


L.geoJson(capa_moe).addTo(demoMap);

function categoriaColor(d) {
    console.log(d);
    return d === 'Apta para beber y uso recreativo'  ? greenIcon :
           d === 'no apta para potabilización y peligrosa para uso recreativo'  ? redIcon :
           d === 'peligrosa'   ? violetIcon :
           d === 'posible riesgo'   ? yellowIcon :
           d === 'segura'  ? blueIcon :
                 greyIcon;
}


// function categoriaColor(d) {
//     console.log(d);
//     return d === 'Apta para beber y uso recreativo'  ? '#E31A1C' :
//            d === 'no apta para potabilización y peligrosa para uso recreativo'  ? '#FC4E2A' :
//            d === 'peligrosa'   ? '#FD8D3C' :
//            d === 'posible riesgo'   ? '#FEB24C' :
//            d === 'segura'  ? '#FED976' :
//                  '#FFEDA0';
// }
// {'Apta para beber y uso recreativo',
//  'no apta para potabilización y peligrosa para uso recreativo',
//  'peligrosa',
//  'posible riesgo',
//  'segura'}


L.geoJson(capa_moe).addTo(demoMap);

function getColor(d) {
    console.log(d);
    return d < 100 ? '#800026' :
           d < 50  ? '#BD0026' :
           d < 20  ? '#E31A1C' :
           d < 10  ? '#FC4E2A' :
           d < 5   ? '#FD8D3C' :
           d < 2   ? '#FEB24C' :
           d < 1   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.POL_GEN),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

new L.geoJson(capa_moe, {style: style}).addTo(demoMap);




function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

var geojson;
// ... our listeners
geojson = L.geoJson(capa_moe);

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(capa_moe, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(demoMap);

var info = L.control();

info.onAdd = function (demoMap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Mapa Guardianxs</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
        : 'usa el mouse para explorar' );
};

info.addTo(demoMap);






// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (demoMap) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(demoMap);
