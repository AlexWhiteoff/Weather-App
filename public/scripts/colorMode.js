const toggleColorModeButton = document.getElementById("toggleColorMode");
const html = document.documentElement;

const colorModeScheme = () => {
    let colorMode = html.getAttribute("data-bs-theme");

    if (colorMode === "dark") {
        toggleColorModeButton.innerHTML = '<i class="bi bi-moon-stars"></i>';
    } else {
        toggleColorModeButton.innerHTML = '<i class="bi bi-sun"></i>';
    }
};

const applyColorMode = (colorMode) => {
    console.log("colorMode changed to: " + colorMode);
    html.setAttribute("data-bs-theme", colorMode);
    localStorage.setItem("color-mode", colorMode);
    colorModeScheme();
};

(() => {
    let colorMode = localStorage.getItem("color-mode");

    if (!colorMode) {
        colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    applyColorMode(colorMode);
})();

toggleColorModeButton.addEventListener("click", () => {
    let colorMode = document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    applyColorMode(colorMode);
});
