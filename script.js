
    // Scroll mobile
    document.querySelector(".scroll-btn")
      ?.addEventListener("click", () => {
        document.querySelector(".form-section")
          .scrollIntoView({ behavior: "smooth" });
      });

    // FORM + STRIPE
    const form = document.getElementById("leadForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const btn = form.querySelector("button");
      btn.innerText = "Processando...";
      btn.disabled = true;

      const data = {
        name: form.name.value,
        email: form.email.value,
        whatsapp: form.whatsapp.value
      };

      try {

        // 1️⃣ Salva lead no Google Sheets
        await fetch("https://script.google.com/macros/s/AKfycbyfcCdFthcKv2O5gE9c3LwjyBDOZsrfDMJwzETXx5ETrSeOjbVuU4uGVaaXBEM8PztopA/exec", {
          method: "POST",
          body: JSON.stringify(data)
        });

        // 2️⃣ Cria sessão Stripe
        const response = await fetch("/api/create-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const checkout = await response.json();

        if (checkout.url) {
          window.location.href = checkout.url;
        } else {
          alert("Erro ao criar checkout.");
          btn.disabled = false;
          btn.innerText = "QUERO GARANTIR MINHA VAGA";
        }

      } catch (error) {
        alert("Erro ao processar.");
        btn.disabled = false;
        btn.innerText = "QUERO GARANTIR MINHA VAGA";
      }

    });
 