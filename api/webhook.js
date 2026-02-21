import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  const buf = await new Promise(resolve => {
    const chunks = [];
    req.on("data", chunk => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
  });

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {

    const session = event.data.object;

    if (session.payment_status === "paid") {

      await fetch("https://script.google.com/macros/s/AKfycbyfcCdFthcKv2O5gE9c3LwjyBDOZsrfDMJwzETXx5ETrSeOjbVuU4uGVaaXBEM8PztopA/exec", {
        method: "POST",
        body: JSON.stringify({
          name: session.customer_details?.name || "Cliente",
          email: session.customer_details?.email || "",
          amount: session.amount_total / 100,
          payment_status: session.payment_status
        })
      });

    }
  }

  res.status(200).json({ received: true });
}