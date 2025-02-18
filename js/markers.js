import 'https://unpkg.com/leaflet';
import { getMap, getCurrentPos } from './main.js';

const ICON_SIZE = 30;

function divlog(message){
    document.getElementById("myDiv").innerHTML = message;
}

function getColor(is_next, is_close) {
    if (is_close){
        return "green"
    }
    if (is_next){
        return "blue"
    }
    return "lightgray"
}

function setStoredMarker(marker_id, was_seen, is_next, is_close) {
    var itinerary_id = localStorage.getItem("itinerary_id");
    var value = {
        was_seen: was_seen,
        is_next: is_next,
        is_close: is_close,
    };
    var full_id = itinerary_id + "-" + marker_id.toString()
    //console.log("Setting");
    //console.log(marker_id, value);
    localStorage.setItem(full_id, JSON.stringify(value));
    // localStorage.clear(); //TODO remove
}


function getStoredMarker(marker_id) {
    var itinerary_id = localStorage.getItem("itinerary_id");
    var full_id = itinerary_id + "-" + marker_id.toString()
    var defaultValue = {
        was_seen: false,
        is_next: false,
        is_close: false
    };
    var value = JSON.parse(localStorage.getItem(full_id));
    //console.log("Getting");
    //console.log(marker_id, value);
    return value !== null ? value : defaultValue;
}

class MarkerManager {
    constructor({add_markers_at_init, show_next_marker}) {
        this.map = getMap();
        this.markers = [];
        this.add_markers_at_init = add_markers_at_init;
        this.show_next_marker = show_next_marker;
        this.markers_state = {};
        setInterval(this.activateMarkersNearby.bind(this), 1000);
    }

    addMarker({latlng, title = "Marker", mp3 = null}) {

        console.log(`Adding ${title}`);
        var idx = this.markers.length;
        var stored = getStoredMarker(idx);
        console.log(idx, stored);

        if ((idx > 0) && (stored.is_next)){
            console.log("change next");
            // Then we have a stored next marker, we remove it from marker 1
            var icon = new L.AwesomeNumberMarkers({
                number: 1, 
                markerColor: "lightgray",
            });
            this.markers[0].setIcon(icon);
        }

        var color = getColor(stored.is_next, stored.is_close)

        var icon = new L.AwesomeNumberMarkers({
            number: idx + 1, 
            markerColor: color,
        });

        var marker = L.marker(latlng, {icon: icon});
        marker.title = title;
        marker.idx = idx;
        marker.mp3 = mp3;

        marker.was_seen = stored.was_seen;
        marker.is_next = stored.is_next;
        marker.is_close = stored.is_close;
        marker.is_on_map = false;

        // add click event
        marker.on('click', function() {

            var audio = document.getElementById('audioPlayer');
            if ((!audio.paused) && (audio.src.split('/').pop() == marker.mp3.split('/').pop())){
                // We check if we are on the same marker
                audio.pause();
                // audio.currentTime = 0; // Reset audio to the beginning
            }
            else {
                if (marker.was_seen){
                    console.log("play");
                    audio.src = marker.mp3;
                    if (audio.paused) {
                        audio.play();
                    }
                }
            }
          });

        // add to map 

        if (this.add_markers_at_init){
            // First marker OR any marker but should be shown anyway
            marker.was_seen = true;
        }

        // add to markers list
        console.log("Number of markers: ", this.markers.length)
        if (
            (marker.was_seen == true) || 
            (marker.is_next && this.show_next_marker) || 
            (marker.idx==0)
        ){
            marker.addTo(this.map);
            marker.is_on_map = true;
        }        
        this.markers.push(marker);
        return marker;
    }

    markerIsNearPosition(marker) {
        console.log(marker.idx, "is near");
        divlog(marker.idx);
        var titlediv = document.getElementById('titlediv');
        titlediv.innerHTML = marker.title // Re-rendre le bandeau visible
        marker.is_next = false;
        marker.is_close = true;
        marker.was_seen = true;
        marker.color = getColor(marker.is_next, marker.is_close);
        var icon = new L.AwesomeNumberMarkers({
            number: marker.idx + 1, 
            markerColor: marker.color,
        });
        marker.setIcon(icon);
        if (!marker.is_on_map){
            marker.addTo(this.map);
            marker.is_on_map = true;
        }
        if ((marker.idx < this.markers.length + 1) && !(this.markers[marker.idx + 1].was_seen)){
            this.markerIsNext(this.markers[marker.idx + 1]);
        }
        setStoredMarker(marker.idx, marker.was_seen, marker.is_next, marker.is_close);
    }

    markerIsNext(marker) {
        console.log("Is next: ", marker);
        marker.color = getColor(marker.is_next, marker.is_close);
        marker.is_next = true;
        console
        var icon = new L.AwesomeNumberMarkers({
            number: marker.idx + 1, 
            markerColor: marker.color,
        });
        marker.setIcon(icon);
        if (
            (marker.was_seen == false) &&
            (this.show_next_marker)
        ){
            marker.addTo(this.map);
            marker.is_on_map = true;
        }
        setStoredMarker(marker.idx, marker.was_seen, marker.is_next, marker.is_close);
    }

    markerIsNotNearPosition(marker) {
        var titlediv = document.getElementById('titlediv');
        if (titlediv.innerHTML == marker.title){
            titlediv.innerHTML = "" // Plutot display:none
        }
        if (!(marker.was_seen)){
            // Wasn't seen yet, we do nothing
            return
        }
        marker.is_close = false;
        marker.color = getColor(marker.is_next, marker.is_close)
        var icon = new L.AwesomeNumberMarkers({
            number: marker.idx + 1, 
            markerColor: marker.color,
        });
        marker.setIcon(icon);
        setStoredMarker(marker.idx, marker.was_seen, marker.is_next, marker.is_close);
    }

    removeAllMarkers() {
        this.markers.forEach(marker => marker.remove());
        this.markers = [];
    }

    checkIfChange(){
        var current_state = {}
        const currentPos = getCurrentPos();
        for (const marker of this.markers){
            var isWithinCircle = currentPos.circle.getBounds().contains(marker.getLatLng());
            if (isWithinCircle) {
                current_state[marker.idx] = true;
            } else {
                current_state[marker.idx] = false;
            }
        }
        const no_change = compareDictionaries(current_state, this.markers_state);
        this.markers_state = current_state;
        return no_change
    }

    activateMarkersNearby(){
        window.mycircle = getCurrentPos().circle;
        const self = this;
        function activateMarkerNearBy(marker){
            const currentPos = getCurrentPos();
            var isWithinCircle = currentPos.circle.getBounds().contains(marker.getLatLng());
            if (isWithinCircle) {
                self.markerIsNearPosition(marker);
            } else {
                self.markerIsNotNearPosition(marker);
            }
        }
        this.markers.forEach(activateMarkerNearBy);
    }

}

function compareDictionaries(dict1, dict2) {
    // Check if both dictionaries have the same number of keys
    const keys1 = Object.keys(dict1);
    const keys2 = Object.keys(dict2);

    if (keys1.length !== keys2.length) {
        return false; // Different number of keys, so they are not equal
    }

    // Check if all keys in dict1 are in dict2 and have the same values
    for (const key of keys1) {
        if (dict2[key] !== dict1[key]) {
            return false; // Value for the key does not match
        }
    }

    return true; // All keys and values match
}

export { MarkerManager };