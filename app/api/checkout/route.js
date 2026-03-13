// app/api/checkout/route.js
import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { SERVICES } from '@/lib/services'

export async function POST(request) {
  try {
    const { name, email, serviceId } = await request.json()

    if (!name || !email || !serviceId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const service = SERVICES.find((s) => s.id === serviceId)
    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    await connectDB()
    const booking = await Booking.create({
      name,
      email,
      service: service.name,
      servicePrice: service.price,
      paymentStatus: 'pending',
    })

    // ✅ getStripe() call করা হচ্ছে - runtime এ initialize হবে
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.name,
              description: service.description,
            },
            unit_amount: service.price * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        bookingId: booking._id.toString(),
      },
      success_url: `${appUrl}/success?bookingId=${booking._id}`,
      cancel_url: `${appUrl}/booking?cancelled=true`,
    })

    await Booking.findByIdAndUpdate(booking._id, { stripeSessionId: session.id })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}