const html = document.querySelector("html");
const inputs = document.querySelectorAll("input");

// A script to save themes to the browser's local storage
function loadTheme() {
  const theme = localStorage.getItem("data-theme");
  if (theme) {
    html.setAttribute("data-theme", theme);
    inputs.forEach((input) => {
      input.checked = input.getAttribute("id") === theme;
    });
  }
}
inputs.forEach((input) => {
  input.addEventListener("click", () => {
    const theme = input.getAttribute("id");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  });
});

// Load theme on page load
loadTheme();
