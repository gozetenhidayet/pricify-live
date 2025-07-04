import React from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_live_51RZ9VBHQV8Xgme4Y6F6rtqtxPK66d87gqyufEYkBCsApD8yAOEJzPYlDQwuXgfOK6iAl3ylPuvEDV1c2h2srC6bH00n2S0GnET"); // Kendi Stripe PUBLIC KEY’inle değiştir

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
