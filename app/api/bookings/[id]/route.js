// app/api/bookings/[id]/route.js
// DELETE: নির্দিষ্ট booking delete করা (admin এর জন্য)

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'

export async function DELETE(request, { params }) {
  try {
    await connectDB()

    const { id } = params

    const deleted = await Booking.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('DELETE booking error:', error)
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}
