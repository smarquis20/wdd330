import { addAddressField } from "./address.js";
import { setupCSVUpload } from "./import.js";
import { getRouteByName, getRouteNames } from "./storage.js";

document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("addAddressButton").addEventListener("click", () => addAddressField());

setupCSVUpload("csvUpload", "addressContainer");

const dropdown = document.getElementById("savedRoutesDropdown");

function populateRouteDropdown() {
    const names = getRouteNames();
    dropdown.innerHTML = '<option value="">-- Select a saved route --</option>';
    names.forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        dropdown.appendChild(option);
    });
}

populateRouteDropdown();

document.getElementById("loadSavedRoute").addEventListener("click", () => {
    const selected = dropdown.value;
    if (!selected) {
        alert("Please select a saved route.");
        return;
    }

    const saved = getRouteByName(selected);
    if (!saved || saved.length < 2) {
        alert("Saved route is invalid.");
        return;
    }

    const container = document.getElementById("addressContainer");
    container.innerHTML = "";
    saved.forEach(address => addAddressField("addressContainer", address));
});

document.getElementById("addressForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const addressFields = document.querySelectorAll(".address-field");
    const addresses = Array.from(addressFields)
        .map(input => input.value.trim())
        .filter(Boolean);

    if (addresses.length < 2) {
        alert("Please enter a starting and ending address.");
        return;
    }

    const encoded = encodeURIComponent(JSON.stringify(addresses));
    window.location.href = `maps.html?addresses=${encoded}`;
});