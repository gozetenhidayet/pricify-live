// pages/pricing.js
import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Stripe public key (TEST veya LIVE kullanabilirsin)
const stripePromise = loadStripe("pk_test_..."); // Buraya kendi test veya live public key’ini gir

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
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
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
            className="bg-green-600 text-white px-4 py-2 rounded-xl"
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
