'use client'
// app/booking/page.js
// User এখানে service select করবে, name/email দেবে, তারপর Stripe payment হবে

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { SERVICES } from '@/lib/services'
import { Check, Loader2, CreditCard, User, Mail, ChevronDown } from 'lucide-react'

function BookingForm() {
  const searchParams = useSearchParams()
  const preSelectedId = searchParams.get('service')

  const [form, setForm] = useState({
    name: '',
    email: '',
    serviceId: preSelectedId || SERVICES[0].id,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedService = SERVICES.find((s) => s.id === form.serviceId) || SERVICES[0]

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Stripe Checkout Session তৈরি করার জন্য API call
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          serviceId: form.serviceId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Stripe Checkout page এ redirect করা হবে
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">Booking</p>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Book a Service</h1>
          <p className="text-slate-400">Fill in the details below to proceed to secure payment.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ===== FORM ===== */}
          <div className="lg:col-span-3 card-glass p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Your Details</h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Select Service</label>
                <div className="relative">
                  <select
                    name="serviceId"
                    value={form.serviceId}
                    onChange={handleChange}
                    className="w-full bg-navy-900 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-gold-500/50 transition-colors text-sm appearance-none cursor-pointer"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.icon} {s.name} — ${s.price}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-4 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Redirecting to Payment...
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    Book Now – ${selectedService.price}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                🔒 Secured by Stripe. Your payment info is never stored on our servers.
              </p>
            </form>
          </div>

          {/* ===== ORDER SUMMARY ===== */}
          <div className="lg:col-span-2 space-y-4">
            <div className="card-glass p-6">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Order Summary</h3>

              <div className="flex items-start gap-3 mb-5">
                <div className="text-3xl">{selectedService.icon}</div>
                <div>
                  <p className="text-white font-semibold">{selectedService.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{selectedService.duration}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-5">
                {selectedService.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-400 text-xs">
                    <Check size={12} className="text-gold-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total</span>
                <span className="text-gold-500 font-display font-bold text-2xl">${selectedService.price}</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="card-glass p-5 space-y-3">
              {[
                '✅ SSL Secured Payment',
                '📧 Instant Email Confirmation',
                '🔄 Satisfaction Guaranteed',
                '📞 24h Support',
              ].map((b) => (
                <p key={b} className="text-slate-400 text-xs">{b}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Suspense boundary - useSearchParams() এর জন্য দরকার
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>}>
      <BookingForm />
    </Suspense>
  )
}
