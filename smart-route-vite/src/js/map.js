import { saveNamedRoute } from "./storage";

const VITE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
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
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

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
            drivingOptions:{
                departureTime: new Date(),
                trafficModel: "bestguess"
            }
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                const routeDetailsDiv = document.getElementById("routeDetails");
                const route = response.routes[0];
                let summary = "";

                route.legs.forEach((leg, i) => {
                    summary += `<p><strong>Stop ${i + 1}</strong>: ${leg.start_address}<br>to ${leg.end_address}<br>`;
                    summary += `Distance: ${leg.distance.text}, Duration: ${leg.duration.text}</p>`;
                });

                routeDetailsDiv.innerHTML = summary;

            } else {
                alert("Directions request failed due to " + status);
            }
        }
    );
}

window.initMap = initMap;

function loadGoogleMapsScript() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${VITE_API_KEY}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
}

loadGoogleMapsScript();

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("saveRouteButton").addEventListener("click", () => {
        const name = document.getElementById("routeNameInput").value.trim();
        if (!name) {
            alert("Please enter a name from the route.");
            return;
        }
        saveNamedRoute(name, addresses);
    });
    
    const sidebar = document.getElementById("sidebar");
    document.getElementById("toggleSidebar").addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    const addressList = document.getElementById("addressList");
    addresses.forEach((addr, idx) => {
        const div = document.createElement("div");
        div.className = "address-input";
        const input = document.createElement("input");
        input.type = "text";
        input.value = addr;
        input.className = "address-field";
        input.addEventListener("change", () => {
            addresses[idx] = input.value;
        });
        div.appendChild(input);
        addressList.appendChild(div);
    });
});