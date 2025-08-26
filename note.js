const button = document.getElementById("greetBtn");
const message = document.getElementById("message");

button.addEventListener("click", () => {
  message.textContent = "Thanks for visiting my homepage! 🎉";
});
