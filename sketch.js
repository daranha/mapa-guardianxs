
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
    
    // googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    //     maxZoom: 20,
    //     subdomains:['mt0','mt1','mt2','mt3']
    //  });
    //  googleStreets.addTo(demoMap);
    
    
    
    // var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    //  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // subdomains: 'abcd',
    // minZoom: 1,
    // maxZoom: 16,
    // ext: 'jpg'
    // });
    // Stamen_Watercolor.addTo(demoMap);



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

// var capa_OE = new L.geoJSON(capa_moe, {
//     onEachFeature: function(feature,layer){
//         layer.bindPopup('<b>status: </b>' + feature.properties.POL_GEN);
//     },
//     // icon:{
//     //     fillColor: 'red',
//     //     fillOpacity:1,
//     //     color: 'green'
//     // }
// }).addTo(demoMap);

var capa_OE = L.geoJson(capa_moe, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(demoMap);

/*===================================================
                      LAYER CONTROL               
===================================================*/

var baseLayers = {
    "Satélite":googleSat,
    // "Google Map":googleStreets,
    // "Oscuro": CartoDB_DarkMatter,
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

      

function categoriaColor(d) {
    console.log(d);
    return d === 'Apta para beber y uso recreativo'  ? greenIcon :
           d === 'no apta para potabilización y peligrosa para uso recreativo'  ? redIcon :
           d === 'peligrosa'   ? violetIcon :
           d === 'posible riesgo'   ? yellowIcon :
           d === 'segura'  ? blueIcon :
                 greyIcon;
}


function getColor(d) {
    console.log(d);
    return  d.includes('URBAN') ? 'grey' :
            d.includes('APROVE') ? 'yellow' :
            d.includes('CONSER') ? 'green' :
            d.includes('RESTAU') ? 'blue' :
    //        d.includes(substring) ? 'violet' :
    //        d.includes(substring) ? 'red' :
           'white';
}

/// 

// 'CONSER' OR 'RESTA' ? Verdosas
// 'APROVECHA' ? 'yellow'
// 'URBAN' ? 'grey'

/// Verdosas las categorías de conservación y restauración. 
// Amarillos a las zonas agrícolas. 
// Gris la zona urbanizada.

//    OPCIONES 

//    {'APROVECHAMIENTO SUSTENTABLE',
//    'APROVECHAMIENTO SUSTENTABLE-CONSERVACION',
//    'APROVECHAMIENTO SUSTENTABLE-RESTAURACION',
//    'CONSERVACION',
//    'CONSERVACION-APROVECHAMIENTO SUSTENTABLE',
//    'CONSERVACION-RESTAURACION',
//    'ENP CON PROGRAMA DE MANEJO',
//    'ENP SIN PROGRAMA DE MANEJO',
//    'PRESERVACION',
//    'PRESERVACION-APROVECHAMIENTO SUSTENTABLE',
//    'PRESERVACION-CONSERVACION',
//    'PRESERVACION-RESTAURACION',
//    'RESTAURACION',
//    'RESTAURACION-APROVECHAMIENTO SUSTENTABLE',
//    'RESTAURACION-CONSERVACION',
//    'RESTAURACION-PRESERVACION',
//    'SIN INSTRUMENTO DE PLANEACION URBANA ACTUAL',
//    'SUJETO A INSTRUMENTO DE PLANEACION URBANA',
//    'SUJETO A INSTRUMENTO DE PLANEACIÓN URBANA'}





function style(feature) {
    return {
        fillColor: getColor(feature.properties.POL_GEN),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}



function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        color: 'cyan', // getColor(layer.properties.POL_GEN),
        dashArray: '',
        fillOpacity: 0.8
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

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.bindPopup('<b>status: </b>' + feature.properties.POL_GEN);
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(capa_moe, {
    style: style,
    onEachFeature: onEachFeature
})

var info = L.control();

info.onAdd = function (demoMap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Mapa Guardianxs</h4>' +  (props ?
        '<b>' + props.POL_GEN + '</b><br />'+ 'Sup_ha: ' + props.Sup_ha
        : 'Usa el mouse para explorar, doble click para hacer zoom.' );
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
