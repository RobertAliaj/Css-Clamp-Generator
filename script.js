function copyToClipboard() {
    const el = document.createElement('textarea');
    const fontSizeString = document.getElementById('resultText').innerText; // Change 'text' to 'resultText'
    const clampString = fontSizeString.match(/font-size: (.+);/)[1];
    el.value = `font-size: ${clampString}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}


function getYourResult() {
    let minWidthPx = parseFloat(document.getElementById('minWidth').value);
    let maxWidthPx = parseFloat(document.getElementById('maxWidth').value);
    let minFontSizePx = parseFloat(document.getElementById('minFontSize').value);
    let maxFontSizePx = parseFloat(document.getElementById('maxFontSize').value);

    let minFontSize = minFontSizePx / 16;
    console.log(minFontSize);
    let maxFontSize = maxFontSizePx / 16;

    clampBuilder(minWidthPx, maxWidthPx, minFontSize, maxFontSize);

    // Show the popup and overlay
    document.getElementById("overlay").classList.remove("hidden");
}


function clampBuilder(minWidthPx, maxWidthPx, minFontSize, maxFontSize) {

    const text = document.getElementById('resultText');
    
    const root = document.querySelector("html");
    const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2));

    const minWidth = minWidthPx / pixelsPerRem;
    const maxWidth = maxWidthPx / pixelsPerRem;

    const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
    const yAxisIntersection = -minWidth * slope + minFontSize

    let clampFontSize = `clamp(${minFontSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxFontSize}rem)`;

    text.innerHTML = 'font-size: ' + clampFontSize + ';';

    // return `clamp( ${minFontSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxFontSize}rem )`;
}


function closePopup() {
    document.getElementById("overlay").classList.add("hidden");
}



function openInfoPopUp() {
    document.getElementById('info-popup').classList.remove('hidden');
}


function closeInfoPopUp() {
    document.getElementById('info-popup').classList.add('hidden');
}
