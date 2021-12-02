function hex2bin(hex, pad) {
    return (parseInt(hex, 16).toString(2)).padStart(pad, '0');
}
function bin2hex(bin, pad) {
    return (parseInt(bin, 2).toString(16)).padStart(pad, '0');
}
window.addEventListener('load', function () {
    let bitCount = document.querySelector("#bitCount");
    let bitsCount = bitCount.value;
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    bitCount.addEventListener('keypress', function (e) {
        if (!numbers.includes(e.key)) {
            console.log("does not contain")
            e.preventDefault();
            return;
        }
        setTimeout(() => {
            bitsCount = bitCount.value
            bitCount.Value = bitsCount
            refresh();
        }, 30);
    });
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
        for (let i = 0; i < bitsCount; i++) {
            let ithElement = document.querySelector("#i" + i);
            gatheredValue += ithElement.value;
        }
        outputHere.value = gatheredValue;
        outputLabel.textContent = "This is your binary literal output";
    });

    btnOutputHexLiteral.addEventListener("click", function () {
        let gatheredValue = "";
        for (let i = 0; i < bitsCount; i++) {
            let ithElement = document.querySelector("#i" + i);
            gatheredValue += ithElement.value;
        }
        outputHere.value = "0x" + bin2hex(gatheredValue, Math.ceil(bitsCount / 8));
        outputLabel.textContent = "This is your hex literal output";
    });
    function syncFromNormal() {
        for (let i = 0; i < bitsCount; i++) {
            let ithElement = document.querySelector("#i" + i);
            let rithElement = document.querySelector("#ri" + i);
            rithElement.value = ithElement.value;
        }
    }
    function syncFromReverse() {
        for (let i = 0; i < bitsCount; i++) {
            let ithElement = document.querySelector("#i" + i);
            let rithElement = document.querySelector("#ri" + i);
            ithElement.value = rithElement.value;
        }
    }
    btnConvertToBinary.addEventListener('click', function () {
        if (hexHere.value.startsWith("0x")) {
            let convertedString = hex2bin(hexHere.value, bitsCount)
            for (let i = 0; i < bitsCount; i++) {
                let ithElement = document.querySelector("#i" + i);
                ithElement.value = convertedString[i];
            }
            for (let i = bitsCount - 1; i >= 0; i--) {
                let ithElement = document.querySelector("#ri" + i);
                ithElement.value = convertedString[i];
            }
        } else {
            alert("A hex literal should start with the two characters: \"0x\"");
        }
    });

    btnPushBinary.addEventListener('click', function () {
        if (binHere.value.startsWith("0b")) {
            let convertedString = binHere.value.replace("0b", "");
            for (let i = 0; i < bitsCount; i++) {
                let ithElement = document.querySelector("#i" + i);
                ithElement.value = convertedString[i];
            }
            for (let i = bitsCount - 1; i >= 0; i--) {
                let ithElement = document.querySelector("#ri" + i);
                ithElement.value = convertedString[i];
            }
        } else {
            alert("A binary literal should start with the two characters: \"0b\"");
        }

    });
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
    function refresh() {
        removeAllChildNodes(bitsContainer)
        removeAllChildNodes(numberingContainer)
        removeAllChildNodes(rbitsContainer)
        removeAllChildNodes(rnumberingContainer);
        setTimeout(() => {
            for (let i = 0; i < bitsCount; i++) {
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
                numberingElement.value = bitsCount - 1 - i
                numberingContainer.appendChild(numberingElement);
            }
            for (let i = bitsCount - 1; i >= 0; i--) {
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
                numberingElement.value = bitsCount - 1 - i
                rnumberingContainer.appendChild(numberingElement);
            }
        }, 10);

    }
    refresh();
});