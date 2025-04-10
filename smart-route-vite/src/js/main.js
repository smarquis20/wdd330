import { addAddressField } from "./address.js";
import { setupCSVUpload } from "./import.js";

document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("addAddressButton").addEventListener("click", () => addAddressField());

setupCSVUpload("csvUpload", "addressContainer");

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
    window.location.href = `maps?addresses=${encoded}`;
});