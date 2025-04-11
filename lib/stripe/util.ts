import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
export const createStripeCustomer = async (email: string) => {
  const customer = await stripe.customers.create({
    email,
  });
  return customer;
};
