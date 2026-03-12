// models/Booking.js
// MongoDB তে booking এর data কিভাবে store হবে তার schema

import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
    },
    servicePrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    stripeSessionId: {
      type: String,
      default: null,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // createdAt এবং updatedAt automatically add হবে
  }
)

// Model already exist করলে সেটা use করবে, না হলে নতুন বানাবে
const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema)

export default Booking
