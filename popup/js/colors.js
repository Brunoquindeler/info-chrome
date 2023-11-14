const defaultColors = {
    backgroundColor: "#191C21",
    textColor: "#1273E2",
    backgroundButtonColor: "#9BC9FF",
    textButtonColor: "#191C21"
};

document.addEventListener('DOMContentLoaded', function () {
    const backgroundColorPicker = document.getElementById("backgroundColorPicker");
    backgroundColorPicker.addEventListener("input", function () {
        changeBackgroundColor(this.value);
    });
    function changeBackgroundColor(color) {
        document.body.style.backgroundColor = color;
        chrome.storage.local.set({ backgroundColor: color });
    };

    const textColorPicker = document.getElementById("textColorPicker");
    textColorPicker.addEventListener("input", function () {
        changeTextColor(this.value);
    });
    function changeTextColor(color) {
        document.body.style.color = color;
        chrome.storage.local.set({ textColor: color });
    };

    const buttons = document.querySelectorAll(".btn")
    const backgroundButtonColorPicker = document.getElementById("backgroundButtonColorPicker");
    backgroundButtonColorPicker.addEventListener("input", function () {
        changeBackgroundButtonColor(this.value);
    });
    function changeBackgroundButtonColor(color) {
        buttons.forEach(btn => {
            btn.style.backgroundColor = color;
        });
        chrome.storage.local.set({ backgroundButtonColor: color });
    };

    const textButtonColorPicker = document.getElementById("textButtonColorPicker");
    textButtonColorPicker.addEventListener("input", function () {
        changeTextButtonColor(this.value);
    });
    function changeTextButtonColor(color) {
        buttons.forEach(btn => {
            btn.style.color = color;
        });
        chrome.storage.local.set({ textButtonColor: color });
    };

    const resetColors = document.getElementById("resetColors")
    resetColors.addEventListener("click", function () {
        changeBackgroundColor(defaultColors.backgroundColor);
        backgroundColorPicker.value = defaultColors.backgroundColor;

        changeTextColor(defaultColors.textColor);
        textColorPicker.value = defaultColors.textColor;

        changeBackgroundButtonColor(defaultColors.backgroundButtonColor);
        backgroundButtonColorPicker.value = defaultColors.backgroundButtonColor;

        changeTextButtonColor(defaultColors.textButtonColor);
        textButtonColorPicker.value = defaultColors.textButtonColor;
    });

    chrome.storage.local.get(["backgroundColor"]).then((result) => {
        const color = result.backgroundColor || defaultColors.backgroundColor;
        changeBackgroundColor(color);
        backgroundColorPicker.value = color;
    });

    chrome.storage.local.get(["textColor"]).then((result) => {
        const color = result.textColor || defaultColors.textColor;
        changeTextColor(color);
        textColorPicker.value = color;
    });

    chrome.storage.local.get(["backgroundButtonColor"]).then((result) => {
        const color = result.backgroundButtonColor || defaultColors.backgroundButtonColor;
        changeBackgroundButtonColor(color);
        backgroundButtonColorPicker.value = color;
    });

    chrome.storage.local.get(["textButtonColor"]).then((result) => {
        const color = result.textButtonColor || defaultColors.textButtonColor;
        changeTextButtonColor(color);
        textButtonColorPicker.value = color;
    });

    const clearCache = document.getElementById("clearCache")
    clearCache.addEventListener("click", function () {
        chrome.storage.local.clear();
    });
});
