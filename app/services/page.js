// app/services/page.js
// সব services দেখানো হবে এখানে

import ServiceCard from '@/components/ServiceCard'
import { SERVICES } from '@/lib/services'

export const metadata = {
  title: 'Services – ServeEase',
  description: 'Browse all professional services available for booking.',
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-16">
        <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">Our Catalog</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
          All Services
        </h1>
        <p className="text-slate-400 text-lg">
          Pick a service, pay securely, and get expert results delivered to you.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
