function addAddressField() {
    const container = document.getElementById("addressContainer");
    const addressDiv = document.createElement("div");
    addressDiv.className = "address-input";
    
    const input = document.createElement("input");
    input.type = "text";
    input.name = "address[]";
    input.placeholder = "Enter Address";
    input.className = "address-field";
    input.required = true;

    const removeAddress = document.createElement("button");
    removeAddress.className = "remove-address";
    removeAddress.innerHTML = "X";
    removeAddress.onclick = function() {
        container.removeChild(addressDiv);
    };

    addressDiv.appendChild(input);
    addressDiv.appendChild(removeAddress);
    container.appendChild(addressDiv);
}

document.getElementById("addAddressButton").addEventListener("click", addAddressField);