export default async function handler(req, res) {

  console.log("Função chamada");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  return res.status(200).json({
    url: "https://buy.stripe.com/test_123456789"
  });

}