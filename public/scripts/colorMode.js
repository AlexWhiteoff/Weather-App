const toggleColorModeButton = document.getElementById("toggleColorMode");
const html = document.documentElement;

const applyColorMode = (colorMode) => {
    localStorage.setItem("color-mode", colorMode);
    html.setAttribute("data-bs-theme", colorMode);
    toggleColorModeButton.innerHTML =
        colorMode === "dark" ? '<i class="bi bi-moon-stars"></i>' : '<i class="bi bi-sun"></i>';
};

const colorMode =
    localStorage.getItem("color-mode") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

applyColorMode(colorMode);

toggleColorModeButton.addEventListener("click", () => {
    const currentMode = document.documentElement.getAttribute("data-bs-theme");
    applyColorMode(currentMode === "dark" ? "light" : "dark");
});
