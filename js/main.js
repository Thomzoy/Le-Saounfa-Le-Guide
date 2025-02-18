import 'https://unpkg.com/leaflet';
import { setItinerary } from './itinerary.js';
import { Fallback } from './tileFallback.js';
import "./numbered_markers.js"

const default_tile = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tile = "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=3e5104ec-9859-4ec2-b391-1f9caf641112"

const ZOOM_LEVEL = 150;
const RADIUS = 50;
const MATHIS_ICON = L.icon({
    iconUrl: './assets/mathis_icon.png',
    iconSize: [50, 50],
});

let map;

// Tile definition
var theTile = new Fallback(tile, {
    minZoom: 1,
    maxZoom: 16,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}, default_tile);

// Choosing the itinerary
const dropdown = document.getElementById('itineraryDropdown');
var marker_manager
dropdown.addEventListener('change', function () {
    if (marker_manager != null){
        marker_manager.removeAllMarkers()
    }
    const selectedValue = dropdown.value;
    marker_manager = setItinerary(selectedValue);
    localStorage.setItem("itinerary_id", selectedValue);
});

// Marker indicating the current position
class CurrentPosition {
    // Current position of the user
    // Stores the marker + the circle around it
    constructor(map, icon, radius, color) {
        this.map = map;
        this.icon = icon;
        this.radius = radius;
        this.marker = null;
        this.circle = null;
        this.color = null;
        this.displayed = false;
    }
    setInitial(latlng) {
        if (this.displayed) {
            return
        }
        this.marker = new L.marker(latlng, { icon: this.icon })
        this.marker.addTo(this.map)
        this.circle = L.circle(latlng, this.radius);
        this.circle.setStyle({color: this.color})
        this.circle.addTo(this.map);
        this.displayed = true;
    }

    updateLocation(latlng) {
        this.marker.setLatLng(latlng);
        this.circle.setLatLng(latlng);
    }
}

// Setting up the map
map = L.map('map')
map.locate({setView: true});
map.setZoom(ZOOM_LEVEL);

// Add tile to map
theTile.addTo(map);

// Setting up current position
let currentPos = new CurrentPosition(map, MATHIS_ICON, RADIUS, "blue");

function onLocationFound(e) {
    // 1. Logs the found location
    // 2. Set the map position to the location
    // 3. Adds a listener that will automaticaly move the currentPos marker to the location

    console.log("Location found");
    var latlngStruct = {lat:e.coords.latitude, lng: e.coords.longitude};
    console.log(latlngStruct);
    currentPos.setInitial(latlngStruct)
    // FOR DEBUG: map.on('move', () => {currentPos.updateLocation(map.getCenter());});
}

// For debbuging: move current position where clicked
/* function onLongPress(latlng) {
    console.log('Long press at', latlng);
    currentPos.updateLocation(latlng)
} */

/* function registerOnLongPress(){
    var longPressTimeout;
    var longPressDuration = 500; // in milliseconds
    
    map.on('mousedown', function (e) {
        longPressTimeout = setTimeout(function () {
            onLongPress(e.latlng);
        }, longPressDuration);
    });
    
    map.on('mouseup', function () {
        clearTimeout(longPressTimeout);
    });
} */

function moveToPosition(e) {

    // e: contains the lat/long informations from the GPS
    // THis function is called to move the mathis icon to GPS pos + to pan the map
    // For debug: log time + position
    var myDiv = document.getElementById("myDiv");
    var latlngStruct = {lat:e.coords.latitude, lng: e.coords.longitude};
    console.log('Location updated:', latlngStruct);
    const dateTime = new Date().toLocaleString()
    myDiv.innerHTML = dateTime + " - " + latlngStruct.lat.toString() + " - " + latlngStruct.lng.toString();

    // Smoothly move to position
    currentPos.updateLocation(latlngStruct);
    map.panTo([latlngStruct.lat, latlngStruct.lng], {animate:true, duration:1});
}

function moveToCurrentPosition() {
    // 
    navigator.geolocation.getCurrentPosition(
        (position) => {
            moveToPosition(position); 
        },
        (error) => {
            console.error("Error getting location: ", error.message);
        }
    );
}

var itinerary_id = localStorage.getItem("itinerary_id");
if (itinerary_id != null) {
    dropdown.value = itinerary_id; 
    const event = new Event('change');
    dropdown.dispatchEvent(event);
}

// Register everything
//registerOnLongPress()
// map.on('locationfound', onLocationFound); 

// setInterval(moveToCurrentPosition, 1000);

// START

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
  
let lastUpdate = 0;
let isLocInit = false;
let nPos = 0;

function divlog(message){
    document.getElementById("myDiv").innerHTML = message;
}

  // Start tracking location changes with a minimum time interval between updates
function startTrackingLocation(onLocationChange, onError, minInterval) {
    if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by your browser');
    }
    ;
    navigator.geolocation.watchPosition(
        // Success callback with throttling
        (position) => {
            nPos += 1;
            if (!isLocInit){
                onLocationFound(position);
                isLocInit = true;
            }
            const now = Date.now();
            // Check if enough time has passed since last update
            if (now - lastUpdate >= minInterval) {
                lastUpdate = now;
                onLocationChange(position);
            }
        },
        // Error callback
        (error) => {
        const errorMessage = {
            1: 'Permission denied',
            2: 'Position unavailable',
            3: 'Timeout'
        };
        
        if (onError) {
            onError(errorMessage[error.code] || 'Unknown error');
        }
        },
        options
    );
}
  
  // Example usage with a 5-second minimum interval between updates:
startTrackingLocation(
    moveToPosition,
    (error) => {
    document.getElementById("myDiv").innerHTML = error;
    },
    1000  // Only update every 1 seconds
);

export function getMap() {
    return map; // Export a function to get the map object
}

export function getCurrentPos() {
    return currentPos; // Export a function to get the map object
}
