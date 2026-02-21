/* scroll suave mobile */

document.querySelector(".scroll-btn")
?.addEventListener("click", () => {
  document.querySelector(".form-section")
    .scrollIntoView({ behavior: "smooth" });
});


/* GOOGLE SHEETS */
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.querySelector("input[placeholder='Nome']").value,
    email: form.querySelector("input[placeholder='E-mail']").value,
    whatsapp: form.querySelector("input[placeholder='DDD+WhatsApp']").value
  };

  /* BOTÃO CHECKOUT */

const checkoutBtn = document.querySelector("#checkout-btn");

if(checkoutBtn){
  checkoutBtn.addEventListener("click", async () => {

    checkoutBtn.innerText = "Redirecionando...";
    checkoutBtn.disabled = true;

    const response = await fetch("/api/create-checkout", {
      method: "POST",
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Erro ao criar checkout");
      checkoutBtn.disabled = false;
    }
  });
}
})
