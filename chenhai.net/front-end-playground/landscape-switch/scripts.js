let root = document.querySelector(":root");
let checkbox = document.querySelector("input[type=checkbox]");


checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    root.classList.add('dark');
    return;
  }

  root.classList.remove('dark');
});
