import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Inscrição Evento",
            },
            unit_amount: 4970, // R$ 49,70
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/sucesso.html`,
      cancel_url: `${req.headers.origin}/cancelado.html`,
    });

    return res.status(200).json({ url: session.url });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}