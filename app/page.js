// app/page.js
// Home Page - Hero Section + Service Cards + Stats

import Link from 'next/link'
import { ArrowRight, Star, Shield, Clock, ChevronDown } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import { SERVICES } from '@/lib/services'

export default function HomePage() {
  const featuredServices = SERVICES.slice(0, 3)

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise-bg">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Gradient mesh */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/4 rounded-full blur-3xl" />

          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide">
            
            
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
            Expert Services,{' '}
            <span className="text-gold-500 relative">
              Delivered
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C50 3 100 1 150 4C200 7 250 5 298 3"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>
            <br />
            On Demand
          </h1>

          {/* Sub */}
          <p className="animate-fade-up delay-200 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Book web development, design, SEO, and AI services instantly. Secure payment, guaranteed results, and expert delivery — every time.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/booking" className="btn-primary text-base px-8 py-4">
              Book a Service <ArrowRight size={18} />
            </Link>
            <Link href="/services" className="btn-outline text-base px-8 py-4">
              Explore Services
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="animate-fade-up delay-400 flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-gold-500" />
              Secure Stripe Payment
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={14} className="text-gold-500" />
              4.9/5 Rating
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-gold-500" />
              Fast Delivery
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="bg-white/[0.03] border-y border-white/10 py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '500+', label: 'Projects Delivered' },
            { number: '98%', label: 'Client Satisfaction' },
            { number: '24h', label: 'Avg. Response Time' },
            { number: '6', label: 'Services Available' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl md:text-4xl font-bold text-gold-500">{stat.number}</p>
              <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED SERVICES ===== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">What We Offer</p>
          <h2 className="section-title text-white mb-4">
            Our Top Services
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            From startups to enterprises — we have a service that fits your needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/services" className="btn-outline">
            View All Services <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">Simple Process</p>
            <h2 className="section-title text-white">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Choose a Service', desc: 'Browse our catalog and select the service that matches your needs.' },
              { step: '02', title: 'Secure Payment', desc: 'Complete checkout securely via Stripe. All major cards accepted.' },
              { step: '03', title: 'Get Results', desc: "We'll contact you within 24 hours and deliver exceptional work." },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className="w-14 h-14 bg-gold-500/10 border border-gold-500/25 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <span className="font-display text-gold-500 font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 border border-gold-500/20 p-12 text-center">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
              Join 500+ clients who trust ServeEase for their digital needs.
            </p>
            <Link href="/booking" className="btn-primary text-base px-10 py-4">
              Book Your Service Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
