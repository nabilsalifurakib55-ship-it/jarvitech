const button = document.getElementById("greetBtn");
const message = document.getElementById("message");

if (!button || !message) {
  console.error("JARVITECH: greeting button or message element is missing from the page.");
} else {
  button.addEventListener("click", () => {
    message.textContent = "Thanks for visiting my homepage! 🎉";
  });
}
