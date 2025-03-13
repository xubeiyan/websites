const btn = document.querySelector("button");
const [sourceText, destText] = document.querySelectorAll("textarea");

btn.addEventListener("click", () => {
  let str = sourceText.value.split('');
  for (let i = str.length - 1; i > 0; i--) {
    const selectIndex = Math.floor(Math.random() * (i + 1));
    let temp = str[i];
    str[i] = str[selectIndex];
    str[selectIndex] = temp;
  }

  destText.value = str.join('');
});

const checkbox = document.querySelector("input[type=checkbox]");

checkbox.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");
});
