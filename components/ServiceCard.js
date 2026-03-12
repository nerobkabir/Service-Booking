// components/ServiceCard.js
import Link from 'next/link'
import { Check, ArrowRight, Clock } from 'lucide-react'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <div
      className={`card-glass p-7 flex flex-col group hover:border-gold-500/40 hover:bg-white/[0.07] transition-all duration-300 animate-fade-up relative overflow-hidden`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-4 right-4 bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-full">
          Popular
        </div>
      )}

      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-br from-gold-500/5 to-transparent" />

      {/* Icon */}
      <div className="text-4xl mb-5">{service.icon}</div>

      {/* Name & Price */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-display text-xl font-bold text-white leading-tight">
          {service.name}
        </h3>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold text-gold-500">${service.price}</span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <Clock size={12} />
          {service.duration}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
            <Check size={14} className="text-gold-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={`/booking?service=${service.id}`}
        className="group/btn flex items-center justify-center gap-2 w-full bg-gold-500/10 hover:bg-gold-500 border border-gold-500/30 hover:border-gold-500 text-gold-400 hover:text-navy-950 font-semibold py-3 rounded-xl transition-all duration-300 text-sm"
      >
        Book This Service
        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
