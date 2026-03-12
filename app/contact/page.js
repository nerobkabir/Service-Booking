// app/contact/page.js

import { Mail, MessageSquare, Clock, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Contact – ServeEase',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-slate-400">Have a question? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: Mail, title: 'Email Us', value: 'hello@serveease.com', href: 'mailto:hello@serveease.com' },
              { icon: MessageSquare, title: 'Live Chat', value: 'Available on weekdays', href: '#' },
              { icon: Clock, title: 'Working Hours', value: 'Mon–Fri, 9AM – 6PM BST', href: null },
              { icon: MapPin, title: 'Location', value: 'Remote – Worldwide', href: null },
            ].map(({ icon: Icon, title, value, href }) => (
              <div key={title} className="card-glass p-6 flex items-start gap-4">
                <div className="w-11 h-11 bg-gold-500/10 border border-gold-500/25 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-gold-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{title}</h3>
                  {href ? (
                    <a href={href} className="text-slate-400 hover:text-gold-400 transition-colors text-sm mt-0.5 block">
                      {value}
                    </a>
                  ) : (
                    <p className="text-slate-400 text-sm mt-0.5">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form (static – could hook to an API) */}
          <div className="card-glass p-8">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Send a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 uppercase tracking-wider mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your project..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-gold-500/50 transition-colors text-sm resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
