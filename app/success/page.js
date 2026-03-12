'use client'
// app/success/page.js

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Mail, ArrowRight, Loader2 } from 'lucide-react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (bookingId) {
      // ✅ bookingId দিয়ে booking "paid" update করা হচ্ছে
      fetch(`/api/bookings/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      })
        .then((r) => r.json())
        .then((data) => {
          setBooking(data.booking)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [bookingId])

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="card-glass p-10 text-center relative overflow-hidden">
          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-gold-500/5 pointer-events-none" />

          {loading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 size={40} className="animate-spin text-gold-500" />
              <p className="text-slate-400">Confirming your booking...</p>
            </div>
          ) : (
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-400" />
              </div>

              <h1 className="font-display text-4xl font-bold text-white mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-slate-400 mb-8">
                Your payment was successful and your booking is confirmed.
              </p>

              {/* Booking Details */}
              {booking && (
                <div className="bg-white/5 rounded-xl p-5 mb-8 text-left space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Name</span>
                    <span className="text-white font-medium">{booking.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Email</span>
                    <span className="text-white font-medium">{booking.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Service</span>
                    <span className="text-white font-medium">{booking.service}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Amount Paid</span>
                    <span className="text-gold-500 font-bold">${booking.servicePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Status</span>
                    <span className="bg-green-500/20 text-green-400 text-xs px-2.5 py-1 rounded-full font-semibold">
                      ✓ PAID
                    </span>
                  </div>
                </div>
              )}

              {/* Email notice */}
              <div className="flex items-center gap-3 bg-gold-500/10 border border-gold-500/20 rounded-xl p-4 mb-8">
                <Mail size={18} className="text-gold-500 flex-shrink-0" />
                <p className="text-slate-300 text-sm text-left">
                  A confirmation email has been sent to your email address. Check your inbox!
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/" className="btn-primary flex-1 justify-center">
                  Back to Home
                </Link>
                <Link href="/services" className="btn-outline flex-1 justify-center">
                  Book Another <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}