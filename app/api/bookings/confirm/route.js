// app/api/bookings/confirm/route.js
// ✅ Webhook ছাড়া এই route booking "paid" করে + email পাঠায়
// Success page load হলে এটা automatically call হয়

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { sendBookingConfirmation } from '@/lib/email'

export async function POST(request) {
  try {
    const { bookingId } = await request.json()

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 })
    }

    await connectDB()

    // Booking খুঁজে paid update করা
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: 'paid' },
      { new: true }
    )

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Confirmation email পাঠানো (error হলেও booking return করবে)
    try {
      await sendBookingConfirmation({
        name: booking.name,
        email: booking.email,
        service: booking.service,
        date: booking.date,
        bookingId: booking._id.toString().slice(-8).toUpperCase(),
      })
    } catch (emailErr) {
      console.error('Email send failed (non-critical):', emailErr.message)
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Confirm error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}