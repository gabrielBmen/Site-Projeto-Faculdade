const navButtons = document.querySelectorAll(".nav-btn");
const feedbackForm = document.getElementById("feedbackForm");
const formMessage = document.getElementById("formMessage");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

feedbackForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent =
      "Preencha todos os campos para enviar o feedback.";
    formMessage.style.color = "#ff6b6b";
    return;
  }

  formMessage.textContent = `Obrigado, ${name}! Seu feedback foi enviado com sucesso.`;
  formMessage.style.color = "#8bff9c";

  feedbackForm.reset();
});
