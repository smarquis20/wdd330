export function addAddressField(containerId = "addressContainer", value = "") {
    const container = document.getElementById(containerId);
    const addressDiv = document.createElement("div");
    addressDiv.className = "address-input";

    const input = document.createElement("input");
    input.type = "text";
    input.name = "address[]";
    input.placeholder = "Enter Address";
    input.className = "address-field";
    input.required = true;
    input.value = value;

    const removeAddress = document.createElement("button");
    removeAddress.className = "remove-address";
    removeAddress.innerHTML = "X";
    removeAddress.onclick = function () {
        container.removeChild(addressDiv);
    };

    addressDiv.appendChild(input);
    addressDiv.appendChild(removeAddress);
    container.appendChild(addressDiv);
}