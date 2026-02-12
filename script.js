const API_URL = "https://script.google.com/macros/s/AKfycbwsWtadIOV_KnTwhorY_tZVnQyxkMOJKW5K5w_F3qq-wlDowmFoqK16U8DyPG6Gmm-O_g/exec";

const form = document.getElementById("leadForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e)=>{
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  msg.innerText = "Enviando...";

  try{
    await fetch(API_URL,{
      method:"POST",
      body: JSON.stringify(data)
    });

    msg.innerText = "✅ Inscrição realizada!";
    form.reset();

  }catch{
    msg.innerText = "Erro ao enviar.";
  }
});
