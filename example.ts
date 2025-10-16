import { PayifClient, type CheckoutSessionCreate } from "./src/index";

// Initialize the Payif client
const client = new PayifClient({
  apiKey: "pk_c3ae89c984f29ad40b5f7063fada6f3c98b82c6eaba209b525abe4798f2d5b15",
  baseUrl: "http://127.0.0.1:5001/demo-project/us-central1/api", // optional
});

// Example checkout session data
const sessionData: CheckoutSessionCreate = {
  session: {
    order: {
      currency: "USD",
      items: [
        {
          name: "Premium Widget",
          amount: 2,
          pricePerUnit: 2999, // $29.99 in cents
        },
        {
          name: "Shipping",
          amount: 1,
          pricePerUnit: 500, // $5.00 in cents
        },
      ],
      deliveryAddress: {
        country: "US",
        state: "CA",
        city: "San Francisco",
        street: "123 Main Street, Apt 4B",
        zipCode: "94102",
      },
      deliveryDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
      deliveryCarrier: "UPS",
    },
    recipient: "0x1234567890123456789012345678901234567890", // Ethereum address
    redirectUrl: "https://your-app.com/checkout/success",
  },
};

// Create a checkout session
async function createCheckoutSession() {
  try {
    const result = await client.createSession(sessionData);
    console.log("✅ Checkout session created successfully!");
    console.log("Checkout URL:", result.url);
    return result;
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    throw error;
  }
}

// Run the example
createCheckoutSession();
