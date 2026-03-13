// app/api/bookings/[id]/route.js

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'

export async function DELETE(request, context) {
  try {
    await connectDB()

    const { id } = await context.params  // ✅ Next.js 16 তে params await করতে হয়

    if (!id) {
      return NextResponse.json({ error: 'ID missing' }, { status: 400 })
    }

    const deleted = await Booking.findByIdAndDelete(id)

    if (!deleted) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Deleted successfully' })
  } catch (error) {
    console.error('DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}