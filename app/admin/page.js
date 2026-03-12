'use client'
// app/admin/page.js
// Admin panel - সব bookings দেখা, delete করা যাবে

import { useState, useEffect } from 'react'
import { Trash2, RefreshCw, Lock, Eye, EyeOff, Users, DollarSign, Clock, CheckCircle } from 'lucide-react'

export default function AdminPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(null)
  const [error, setError] = useState('')

  // Simple admin auth
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [authError, setAuthError] = useState('')

  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_SECRET || 'admin123'

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASS) {
      setAuthed(true)
      fetchBookings()
    } else {
      setAuthError('Incorrect password. Try again.')
    }
  }

  const fetchBookings = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setBookings(data.bookings || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this booking?')) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setBookings((prev) => prev.filter((b) => b._id !== id))
    } catch (err) {
      alert('Failed to delete booking')
    } finally {
      setDeleting(null)
    }
  }

  // Stats calculation
  const totalRevenue = bookings.filter((b) => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.servicePrice, 0)
  const paidCount = bookings.filter((b) => b.paymentStatus === 'paid').length
  const pendingCount = bookings.filter((b) => b.paymentStatus === 'pending').length

  // ===== LOGIN GATE =====
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-sm">
          <div className="card-glass p-8 text-center">
            <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/25 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Lock size={28} className="text-gold-500" />
            </div>
            <h1 className="font-display text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-slate-400 text-sm mb-8">Enter your admin password to continue</p>

            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-5 text-red-400 text-sm">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 pr-11 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Login to Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ===== ADMIN DASHBOARD =====
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-1">Dashboard</p>
          <h1 className="font-display text-4xl font-bold text-white">Admin Panel</h1>
        </div>
        <button onClick={fetchBookings} className="btn-outline flex items-center gap-2 self-start">
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: Users, label: 'Total Bookings', value: bookings.length, color: 'text-blue-400' },
          { icon: CheckCircle, label: 'Paid', value: paidCount, color: 'text-green-400' },
          { icon: Clock, label: 'Pending', value: pendingCount, color: 'text-yellow-400' },
          { icon: DollarSign, label: 'Total Revenue', value: `$${totalRevenue}`, color: 'text-gold-400' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card-glass p-5">
            <Icon size={20} className={`${color} mb-3`} />
            <p className={`text-2xl font-display font-bold ${color}`}>{value}</p>
            <p className="text-slate-500 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Bookings Table */}
      <div className="card-glass overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-white font-semibold">All Bookings</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw size={24} className="animate-spin text-gold-500" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <Users size={40} className="mx-auto mb-3 opacity-30" />
            <p>No bookings yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  {['Name', 'Email', 'Service', 'Price', 'Status', 'Date', 'Action'].map((h) => (
                    <th key={h} className="px-6 py-4 text-xs text-slate-500 uppercase tracking-wider font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white text-sm font-medium">{booking.name}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{booking.email}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm max-w-[180px] truncate">{booking.service}</td>
                    <td className="px-6 py-4 text-gold-500 text-sm font-semibold">${booking.servicePrice}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                          booking.paymentStatus === 'paid'
                            ? 'bg-green-500/20 text-green-400'
                            : booking.paymentStatus === 'failed'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {(booking.paymentStatus || 'pending').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(booking.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        disabled={deleting === booking._id}
                        className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                      >
                        {deleting === booking._id ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}