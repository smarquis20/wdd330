const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const urlParams = new URLSearchParams(window.location.search);
const addressesParam = urlParams.get("addresses");
document.getElementById("currentyear").innerHTML = new Date().getFullYear();

let addresses = [];

try {
    addresses = JSON.parse(decodeURIComponent(addressesParam));
} catch (e) {
    alert("Invalid address provided.");
    throw e;
}

function initMap() {
    if (!addresses || addresses.length < 2) {
        alert("At least two addresses are required (origin and destination).");
        return;
    }

    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();

    const map = new google.maps.Map(document.getElementById("map"), {});

    directionsRenderer.setMap(map);

    const origin = addresses[0];
    const destination = addresses[addresses.length - 1];
    const waypoints = addresses.slice(1, -1).map(add => ({
        location: add,
        stopover: true,
    }));

    directionsService.route(
        {
            origin,
            destination,
            waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                alert("Directions request failed due to " + status);
            }
        }
    );
}

window.initMap = initMap;

function loadGoogleMapsScript() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
}

loadGoogleMapsScript();
