const btn = document.querySelector("button");
const [sourceText, destText] = document.querySelectorAll("textarea");

btn.addEventListener("click", () => {
  destText.value = sourceText.value
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
});
