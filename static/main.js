coordinatesOfLeipzig = [51.34, 12.37];
coordinatesOfOkLabLeipzig = [51.32898, 12.3278];

options = {
    /* Welche attribution benötigt wird oder welcher maxZoom unterstützt werden, *
     * hängt von der verwendeten Karte ab!                                       */
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18
};

/* URLs für die Karten. Wichtig sind die x, y und z Werte, da diese die     *
 * Koordinaten und die Zoomstufe angibt. Wir nutzen 3 verschiedene Karten:  *
 * - normalTiles, welches die normale OSM Karte ist                         *
 * - mapnikGreyscaleTiles, die originale OSM Karte in Schwarz/Weiß          *
 * - watercolorTiles, welche so wirken als wären sie mit Wasserfarbe gemalt */
normalTiles = 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png';
mapnikGreyscaleTiles = 'http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
watercolorTiles = 'http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg';

// Erstellung eines eigenen Markers / Icons
var markerIcon = L.icon({
    iconUrl: '../static/marker.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
});


// Instanziieren der Karte, zentriert auf Leipzig
var map = L.map('map').setView(coordinatesOfLeipzig, 14);

// Auswählen der Tiles - diese Funktion wird von den Buttons aufgerufen.
function setMapTiles(tiles) {
    L.tileLayer(tiles, options).addTo(map);
}

/* Wir erstellen den Marker global, damit wir nach dreimaligen Klicken des *
 * Knopfes nur einen Marker haben. Ohne diese, würde der Marker mehrfach   *
 * erstellt und übereinander gelegt.                                       */
var marker = null;

function setMarkerOfOkLab() {
    // Erstellen des Markers mit unser eigenem Icon.
    marker = L.marker(coordinatesOfOkLabLeipzig, {'icon': markerIcon}).addTo(map);
    /* Erstellen des Inhaltes, welcher bei einem Klick angezeigt werden soll. *
     * Hier ist alles möglich, sofern es valides HTML ist.                    */
    var popUpContent = "<b>Hello OpenData Friends!</b><br>We, the #OKLab of Leipzig, " +
        "come together every monday. Why don't you come along?";
    // Hinzufügen des PopUp Textes zu dem Marker.
    marker.bindPopup(popUpContent);
    // Zentrieren der Ansicht über dem Marker.
    map.setView(coordinatesOfOkLabLeipzig);
}

/* Diese Funktion wird am Ende automatisch und einmalig ausgeführt. *
 * Dadurch wird die Karte mit der standard OSM Karte gestartet.     */
setMapTiles(normalTiles);
