import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import apiRequest from "../../lib/ApiRequest";

interface CheckoutFormProps {
  amount: number; // payment amount in your currency units (e.g. dollars)
  onPaymentSuccess: () => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create PaymentIntent on backend
      const response = await apiRequest.post("/payment/create-payment-intent", {
        amount,
        currency: "usd",
      });

      const clientSecret = response.data.clientSecret;

      // 2. Confirm the card payment on frontend
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        setError("Card element not found");
        setLoading(false);
        return;
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message || "Payment failed");
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        onPaymentSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || "Payment error");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4 border rounded-md">
      <CardElement options={{ hidePostalCode: true }} />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 w-full bg-[#B8860B] text-white py-2 rounded hover:bg-yellow-700 transition"
      >
        {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
