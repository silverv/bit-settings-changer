function hex2bin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(32, '0');
}
function bin2hex(bin) {
    return (parseInt(bin, 2).toString(16)).padStart(8, '0');
}
window.addEventListener('load', function () {
    let bitsContainer = document.querySelector("#bits-container");
    let numberingContainer = document.querySelector("#numberingContainer");
    let rbitsContainer = document.querySelector("#rbits-container");
    let rnumberingContainer = document.querySelector("#rnumberingContainer");
    let btnConvertToBinary = document.querySelector("#convertToBinary")
    let btnPushBinary = document.querySelector("#btnPushBinary")
    let hexHere = document.querySelector("#hexHere")
    let binHere = document.querySelector("#binHere")
    let outputHere = document.querySelector("#outputHere");
    let outputLabel = document.querySelector("#outputLabel");

    let btnOutputBinaryLiteral = document.querySelector("#outputBinaryLiteral");
    let btnOutputHexLiteral = document.querySelector("#outputHexLiteral");

    btnOutputBinaryLiteral.addEventListener("click", function () {
        let gatheredValue = "0b";
        for (let i = 0; i < 32; i++) {
            let ithElement = document.querySelector("#i" + i);
            gatheredValue += ithElement.value;
        }
        outputHere.value = gatheredValue;
        outputLabel.textContent = "This is your binary literal output";
    });

    btnOutputHexLiteral.addEventListener("click", function () {
        let gatheredValue = "";
        for (let i = 0; i < 32; i++) {
            let ithElement = document.querySelector("#i" + i);
            gatheredValue += ithElement.value;
        }
        outputHere.value = "0x" + bin2hex(gatheredValue);
        outputLabel.textContent = "This is your hex literal output";
    });
    function syncFromNormal() {
        for (let i = 0; i < 32; i++) {
            let ithElement = document.querySelector("#i" + i);
            let rithElement = document.querySelector("#ri" + i);
            rithElement.value = ithElement.value;
        }
    }
    function syncFromReverse() {
        for (let i = 0; i < 32; i++) {
            let ithElement = document.querySelector("#i" + i);
            let rithElement = document.querySelector("#ri" + i);
            ithElement.value = rithElement.value;
        }
    }
    btnConvertToBinary.addEventListener('click', function () {
        let convertedString = hex2bin(hexHere.value)
        for (let i = 0; i < 32; i++) {
            let ithElement = document.querySelector("#i" + i);
            ithElement.value = convertedString[i];
        }
        for (let i = 31; i >= 0; i--) {
            let ithElement = document.querySelector("#ri" + i);
            ithElement.value = convertedString[i];
        }
    });

    btnPushBinary.addEventListener('click', function () {
        let convertedString = binHere.value.replace("0b", "");
        for (let i = 0; i < 32; i++) {
            let ithElement = document.querySelector("#i" + i);
            ithElement.value = convertedString[i];
        }
        for (let i = 31; i >= 0; i--) {
            let ithElement = document.querySelector("#ri" + i);
            ithElement.value = convertedString[i];
        }
    });
    for (let i = 0; i < 32; i++) {
        console.log(i);
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.id = "i" + i
        inputElement.className = "small-input";
        inputElement.setAttribute("maxlength", 1);
        bitsContainer.appendChild(inputElement);
        inputElement.addEventListener('keypress', function (e) {
            if (e.key !== "1" && e.key !== "0") {
                e.preventDefault();
            }
            setTimeout(() => {
                syncFromNormal();
            }, 10);
        });
        let numberingElement = document.createElement("input");
        numberingElement.className = "small-input";
        numberingElement.setAttribute("disabled", true)
        numberingElement.value = 31 - i
        numberingContainer.appendChild(numberingElement);
    }
    for (let i = 31; i >= 0; i--) {
        console.log(i);
        let inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.id = "ri" + i
        inputElement.className = "small-input";
        inputElement.setAttribute("maxlength", 1);
        rbitsContainer.appendChild(inputElement);
        inputElement.addEventListener('keypress', function (e) {
            if (e.key !== "1" && e.key !== "0") {
                e.preventDefault();
            }
            setTimeout(() => {
                syncFromReverse();
            }, 10);

        });
        let numberingElement = document.createElement("input");
        numberingElement.className = "small-input";
        numberingElement.setAttribute("disabled", true)
        numberingElement.value = 31 - i
        rnumberingContainer.appendChild(numberingElement);
    }
});