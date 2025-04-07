import { addAddressField } from "./address.js";

export function setupCSVUpload(inputId, containerId) {
    const fileInput = document.getElementById(inputId);
    const container = document.getElementById(containerId);

    if (!fileInput || !container) return;

    fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {
            let lines = event.target.result
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(Boolean);

            const firstLine = lines[0].toLowerCase();
            const headerKeywords = ["address", "location", "street"];
            const isHeader = headerKeywords.some(keyword => firstLine.includes(keyword));
            if (isHeader) {
                lines = lines.slice(1);
            }

            if (lines.length < 2) {
                alert("Please upload a csv file with at least two addresses.  A starting address and destination.");
                return;
            }

            container.innerHTML = "";
            lines.forEach(address => addAddressField(containerId, address));
        };

        reader.readAsText(file);
    });
}