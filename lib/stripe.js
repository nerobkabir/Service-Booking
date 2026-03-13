// lib/stripe.js
import Stripe from 'stripe'

// ✅ Runtime এ initialize হবে, build time এ না
let stripe

export function getStripe() {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-04-10',
    })
  }
  return stripe
}

export default getStripe