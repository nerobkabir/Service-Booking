// lib/stripe.js
// Stripe instance তৈরি করে export করে

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})

export default stripe
