# ⚡ ServeEase — Service Booking Website

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)
![Stripe](https://img.shields.io/badge/Stripe-Payment-blue?style=flat-square&logo=stripe)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)

A full-stack service booking platform with Stripe payment, email confirmation, and admin dashboard.

🔗 **Live Demo:** [https://serveease.vercel.app](https://serveease.vercel.app)

---

## 🧰 Tech Stack

Next.js 16 · Tailwind CSS v4 · MongoDB Atlas · Stripe · Nodemailer · Vercel

---

## ✨ Features

- 6 bookable services with pricing
- Stripe secure checkout
- Email confirmation after payment (Nodemailer)
- Admin dashboard — view, manage & delete bookings
- Fully responsive dark UI

---

## 🚀 Run Locally

```bash
git clone https://github.com/yourusername/booking-website.git
cd booking-website
npm install
npm run dev
```

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_app_password
NEXT_PUBLIC_ADMIN_SECRET=admin123
```

---

## 💳 Test Payment

```
Card: 4242 4242 4242 4242
Expiry: 12/34  |  CVV: 123
```

---

## 👑 Admin Panel

Go to `/admin` → enter password from `NEXT_PUBLIC_ADMIN_SECRET`

---

## 👨‍💻 Author

**Your Name** · [GitHub](https://github.com/yourusername) · youremail@gmail.com