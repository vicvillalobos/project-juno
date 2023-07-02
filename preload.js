window.addEventListener("DOMContentLoaded", () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };
    for (const type of ["chrome", "node", "electron"]) {
        const ver = process.versions[type]
        replaceText(`${type}-version`, ver);
    }
});