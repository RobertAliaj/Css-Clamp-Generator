function generateInputs() {
    let inputDiv = document.getElementById('input-div');
    inputDiv.innerHTML = generateInputsHtml();
}


function showStartScreen() {
    document.getElementById('startScreen').classList.remove('hidden');
}
function closePopUp() {
    document.getElementById("overlay-result").classList.add("hidden");
    document.getElementById('info-popup').classList.add('hidden');
    document.getElementById('startScreen').classList.add('hidden');

}

function openInfoPopUp() {
    document.getElementById('info-popup').classList.remove('hidden');
}


function calculateImage() {
    showImageText();
    closePopUp();
    calcImage = true;
}


function showImageText() {
    document.getElementById('minWidthText').innerHTML = 'Image Min-Width';
    document.getElementById('maxWidthText').innerHTML = 'Image Max-Width';
    document.getElementById('imageWidthSwitch').classList.add('active-switch');
    document.getElementById('fontSizeSwitch').classList.remove('active-switch');

}


function calculateFont() {
    showFontText()
    closePopUp();
    calcImage = false;
}


function showFontText() {
    document.getElementById('minWidthText').innerHTML = 'Min-Font-Size';
    document.getElementById('maxWidthText').innerHTML = 'Max-Font-Size';
    document.getElementById('fontSizeSwitch').classList.add('active-switch');
    document.getElementById('imageWidthSwitch').classList.remove('active-switch');

}



function generateInputsHtml() {
    return `
    <div class="main-parent">
            <div class="input-parent">

                <span> <b>Min-Screen-Width </b></span>
                <input required id="minWidth" type="number" placeholder="in PX">

            </div>

            <div class="input-parent">

                <span> <b>Max-Screen-Width</b></span>
                <input id="maxWidth" type="number" placeholder="in PX" required>

            </div>
        </div>

        <div class="main-parent">

            <div class="input-parent">
                <span><b id="minWidthText">Min-Font-Size</b></span>
                <input id="minFontSize" type="number" placeholder="in PX">
            </div>

            <div class="input-parent">
                <span><b id="maxWidthText"> Max-Font-Size </b></span>
                <input id="maxFontSize" type="number" placeholder="in PX">
            </div>
        
        </div>
    `;
}