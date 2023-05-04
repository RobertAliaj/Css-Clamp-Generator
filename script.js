calcImage = false;

function init() {
    showStartScreen();
    generateInputs();
}




function copyToClipboard() {
    const el = document.createElement('textarea');
    const text = document.getElementById('resultText');

    if (calcImage) {
        const imageSizeString = text.innerText;
        const imageSizeClampString = imageSizeString.match(/width: (.+);/)[1];
        el.value = `width: ${imageSizeClampString};`;
    } else {
        const fontSizeString = text.innerText;
        const fontSizeClampString = fontSizeString.match(/font-size: (.+);/)[1];
        el.value = `font-size: ${fontSizeClampString};`;
    }

    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

function getFontResult() {
    let minWidthPx = parseFloat(document.getElementById('minWidth').value);
    let maxWidthPx = parseFloat(document.getElementById('maxWidth').value);
    let minFontSizePx = parseFloat(document.getElementById('minFontSize').value);
    let maxFontSizePx = parseFloat(document.getElementById('maxFontSize').value);
    let minFontSizeRem = minFontSizePx / 16;
    let maxFontSizeRem = maxFontSizePx / 16;
    clampBuilder(minWidthPx, maxWidthPx, minFontSizeRem, maxFontSizeRem);
    document.getElementById("overlay-result").classList.remove("hidden");
}


function clampBuilder(minWidthPx, maxWidthPx, minFontSizeRem, maxFontSizeRem) {

    const text = document.getElementById('resultText');

    const root = document.querySelector("html");
    const pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2));

    const minWidth = minWidthPx / pixelsPerRem;
    const maxWidth = maxWidthPx / pixelsPerRem;

    const slope = (maxFontSizeRem - minFontSizeRem) / (maxWidth - minWidth);
    const yAxisIntersection = -minWidth * slope + minFontSizeRem

    let clampFontSize = `font-size: clamp(${minFontSizeRem}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxFontSizeRem}rem);`;

    text.innerHTML = clampFontSize;
    text.classList.remove('hidden');
    clearInputFields();
}


function getImgResult() {
    let minWidthPx = parseFloat(document.getElementById('minWidth').value);
    let maxWidthPx = parseFloat(document.getElementById('maxWidth').value);
    let minImageSizePx = parseFloat(document.getElementById('minFontSize').value);
    let maxImageSizePx = parseFloat(document.getElementById('maxFontSize').value);
    clampBuilderImg(minWidthPx, maxWidthPx, minImageSizePx, maxImageSizePx);
    document.getElementById("overlay-result").classList.remove("hidden");

}

function clampBuilderImg(minWidthPx, maxWidthPx, minImageSizePx, maxImageSizePx) {
    const text = document.getElementById('resultText');

    const slope = (maxImageSizePx - minImageSizePx) / (maxWidthPx - minWidthPx);
    const yAxisIntersection = -minWidthPx * slope + minImageSizePx;

    let clampImageSize = `width: clamp(${minImageSizePx}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxImageSizePx}px);`;

    text.innerHTML = clampImageSize;

    document.getElementById("overlay-result").classList.remove("hidden");
    text.classList.remove('hidden');
    clearInputFields();
}



function clearInputFields() {
    const inputFields = document.querySelectorAll('input[type="number"]');

    inputFields.forEach((input) => {
        input.value = '';
    });
}



function validateInputs() {
    const minWidth = document.getElementById('minWidth');
    const maxWidth = document.getElementById('maxWidth');
    const minFontSize = document.getElementById('minFontSize');
    const maxFontSize = document.getElementById('maxFontSize');

    if (!minWidth.value || !maxWidth.value || !minFontSize.value || !maxFontSize.value) {
        alert('Please fill out all fields.');
        return false;
    }
    return true;
}


function getYourResult() {
    if (!validateInputs()) {
        return;
    }

    calcImage == true ? getImgResult() : getFontResult();
}
