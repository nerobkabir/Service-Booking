// app/api/bookings/route.js
// GET: সব bookings দেখা (admin), অথবা session ID দিয়ে একটি booking দেখা
// POST: নতুন booking তৈরি (optional – checkout route already handles this)

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'

// GET all bookings (admin) or specific booking by sessionId (success page)
export async function GET(request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    // Session ID দিয়ে specific booking খোঁজা (success page এর জন্য)
    if (sessionId) {
      const booking = await Booking.findOne({ stripeSessionId: sessionId }).lean()
      return NextResponse.json({ booking })
    }

    // সব bookings (admin panel এর জন্য)
    const bookings = await Booking.find({}).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('GET bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
