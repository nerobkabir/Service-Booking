// components/Footer.js
import Link from 'next/link'
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-navy-950" fill="currentColor" />
              </div>
              <span className="font-display text-xl font-bold">
                Serve<span className="text-gold-500">Ease</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Professional tech services at your fingertips. Book, pay, and get results — all in one place.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 flex items-center justify-center text-slate-400 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/services' },
                { label: 'Book Now', href: '/booking' },
                { label: 'Admin Panel', href: '/admin' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-gold-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4">Contact</h4>
            <a
              href="mailto:hello@serveease.com"
              className="flex items-center gap-2 text-slate-400 hover:text-gold-400 text-sm transition-colors"
            >
              <Mail size={14} />
              hello@serveease.com
            </a>
            <p className="text-slate-500 text-xs mt-4 leading-relaxed">
              Available Mon–Fri<br />9:00 AM – 6:00 PM (BST)
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} ServeEase. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with Next.js · MongoDB · Stripe
          </p>
        </div>
      </div>
    </footer>
  )
}
