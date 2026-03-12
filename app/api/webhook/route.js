// app/api/webhook/route.js
// Stripe Webhook - Payment successful হলে Stripe এই endpoint এ notify করে
// এখানে booking update করা হয় এবং email পাঠানো হয়

import { NextResponse } from 'next/server'
import stripe from '@/lib/stripe'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { sendBookingConfirmation } from '@/lib/email'

// Next.js কে বলছি যে এই route এ raw body দরকার (Stripe signature verify করতে)
export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  let event

  try {
    // Stripe signature verify করা - security এর জন্য গুরুত্বপূর্ণ
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
  }

  // Payment successful event handle করা
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    try {
      await connectDB()

      // Booking find করে paid status update করা
      const booking = await Booking.findOneAndUpdate(
        { stripeSessionId: session.id },
        { paymentStatus: 'paid' },
        { new: true }
      )

      if (booking) {
        // Confirmation email পাঠানো
        await sendBookingConfirmation({
          name: booking.name,
          email: booking.email,
          service: booking.service,
          date: booking.date,
          bookingId: booking._id.toString().slice(-8).toUpperCase(),
        })

        console.log(`✅ Booking confirmed and email sent for: ${booking.email}`)
      }
    } catch (err) {
      console.error('Error processing webhook:', err)
      return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
    }
  }

  // Payment failed হলে
  if (event.type === 'checkout.session.expired') {
    const session = event.data.object
    try {
      await connectDB()
      await Booking.findOneAndUpdate(
        { stripeSessionId: session.id },
        { paymentStatus: 'failed' }
      )
    } catch (err) {
      console.error('Error updating failed booking:', err)
    }
  }

  return NextResponse.json({ received: true })
}
