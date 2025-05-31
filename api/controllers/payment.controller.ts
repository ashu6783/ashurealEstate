import { Request, Response } from "express";
import { stripe } from "../utils/stripe";

export const createPaymentIntent = async (req: Request, res: Response): Promise<void> => {
  const { amount, currency = "usd" } = req.body;

  if (!amount || typeof amount !== "number") {
    res.status(400).json({ error: "Amount must be a number" });
    return;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ["card"],
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe PaymentIntent Error:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
};
