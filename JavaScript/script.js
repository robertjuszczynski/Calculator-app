const html = document.querySelector("html");
const inputs = document.querySelectorAll("input");
/*
Fast Click Library for eliminating the 300ms delay
between a physical tap and the firing of a click event on mobile browsers
*/
if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      FastClick.attach(document.body);
    },
    false
  );
}
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
