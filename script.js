/* SCROLL MOBILE */
document.querySelector(".scroll-btn")
?.addEventListener("click", () => {
  document.querySelector(".form-section")
    .scrollIntoView({ behavior: "smooth" });
});


/* CHECKOUT + GOOGLE SHEETS */

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = form.querySelector("button");
  btn.innerText = "Processando...";
  btn.disabled = true;

  const data = {
    name: form.querySelector("input[placeholder='Nome']").value,
    email: form.querySelector("input[placeholder='E-mail']").value,
    whatsapp: form.querySelector("input[placeholder='DDD+WhatsApp']").value
  };

  try {

    // 1️⃣ Salva lead no Google Sheets
    await fetch("https://script.google.com/macros/s/AKfycbyfcCdFthcKv2O5gE9c3LwjyBDOZsrfDMJwzETXx5ETrSeOjbVuU4uGVaaXBEM8PztopA/exec", {
      method: "POST",
      body: JSON.stringify(data)
    });

    // 2️⃣ Cria checkout Stripe
    const response = await fetch("/api/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const checkout = await response.json();

    if (checkout.url) {
      window.location.href = checkout.url;
    } else {
      alert("Erro ao criar checkout");
      btn.disabled = false;
    }

  } catch (err) {
    alert("Erro ao processar");
    btn.disabled = false;
  }
});