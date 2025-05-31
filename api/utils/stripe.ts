import Stripe from "stripe";
// import dotenv from "dotenv";
// dotenv.config();

// Optional: Add this just to be sure dotenv is loaded
// (If you already run dotenv.config() in your entry file, this is not necessary)
// import dotenv from "dotenv";
// dotenv.config();

console.log("STRIPE_SECRET_KEY in stripe.ts:", process.env.STRIPE_SECRET_KEY);

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY environment variable is missing!");
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-04-30.basil",
});
