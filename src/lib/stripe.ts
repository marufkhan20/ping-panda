import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export const createCheckoutSession = async ({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1QO2VLH3L9RCLevZ5bEbMtXa",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    customer_email: email,
    metadata: {
      userId,
    },
  });

  return session;
};
