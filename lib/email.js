// lib/email.js
// Payment সফল হলে user কে confirmation email পাঠানো হয়

import nodemailer from 'nodemailer'

// Gmail transporter তৈরি করা হচ্ছে
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password (2FA চালু করে নিতে হবে)
  },
})

export async function sendBookingConfirmation({ name, email, service, date, bookingId }) {
  const mailOptions = {
    from: `"ServeEase Bookings" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `✅ Booking Confirmed – ${service}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Georgia, serif; background: #f8f8f8; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #0f172a, #1e3a5f); padding: 40px 32px; text-align: center; }
            .header h1 { color: #f59e0b; margin: 0; font-size: 28px; letter-spacing: 2px; }
            .header p { color: #94a3b8; margin: 8px 0 0; }
            .body { padding: 40px 32px; }
            .body h2 { color: #0f172a; font-size: 22px; }
            .detail-box { background: #f1f5f9; border-radius: 8px; padding: 20px 24px; margin: 24px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
            .detail-row:last-child { border-bottom: none; }
            .label { color: #64748b; font-size: 14px; }
            .value { color: #0f172a; font-weight: 600; font-size: 14px; }
            .badge { display: inline-block; background: #dcfce7; color: #16a34a; padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 700; }
            .footer { background: #0f172a; padding: 24px 32px; text-align: center; color: #475569; font-size: 13px; }
            .footer a { color: #f59e0b; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚡ SERVEEASE</h1>
              <p>Professional Services, Delivered</p>
            </div>
            <div class="body">
              <h2>Hello, ${name}! 👋</h2>
              <p style="color:#475569">Your booking has been confirmed and payment received. Here are your booking details:</p>
              
              <div class="detail-box">
                <div class="detail-row">
                  <span class="label">Booking ID</span>
                  <span class="value">#${bookingId}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Service</span>
                  <span class="value">${service}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Date Booked</span>
                  <span class="value">${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="detail-row">
                  <span class="label">Payment Status</span>
                  <span class="value"><span class="badge">✓ PAID</span></span>
                </div>
              </div>

              <p style="color:#475569">Our team will reach out to you within 24 hours to schedule your service appointment. If you have any questions, feel free to contact us.</p>
              
              <p style="color:#0f172a; font-weight:600">Thank you for choosing ServeEase! 🙏</p>
            </div>
            <div class="footer">
              <p>ServeEase Professional Services &bull; <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a></p>
              <p style="margin-top:8px; color:#334155">© ${new Date().getFullYear()} ServeEase. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
}
