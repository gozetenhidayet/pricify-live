// pages/pricing.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// LIVE Stripe Public Key (seninkini buraya yerleştirdim)
const stripePromise = loadStripe(
  "pk_live_51RZ9V8HQV8Xgme4Y6F6rtq6tP6K6d87gquyfeFYkBCsApD8yAOEzJ2PY1D0wuXgF0K6iAl3y1puvEDVl2Ch2srcB6H00n25eGNtE"
);

const Pricing = () => {
  const handleCheckout = async (priceId) => {
    const stripe = await stripePromise;
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Plan */}
        <div className="border p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Monthly Plan</h2>
          <p className="mb-4">$29 per month</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            onClick={() => handleCheckout("price_1RakXdHQV8Xgme4YaaUZaayL")}
          >
            Subscribe Monthly
          </button>
        </div>

        {/* Yearly Plan */}
        <div className="border p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-2">Yearly Plan</h2>
          <p className="mb-4">$300 per year (save $48!)</p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
            onClick={() => handleCheckout("price_1RakjYHQV8Xgme4YjYOLe78r")}
          >
            Subscribe Yearly
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
