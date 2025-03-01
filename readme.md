# JobHub - AI Based Modern Job Search Platform

JobHub is a full-stack job search platform integrated with OpenAI API for resume analysis and job recommendations and built with React, TypeScript, Node.js, and MongoDB. It features real-time job listings, user authentication, email verification, and premium subscription capabilities.

## 🚀 Features

- AI based resume analysis and job recommendations
- Automatic job application with AI assistance
- User authentication with email verification
- Job search and filtering
- Real-time job notifications
- Premium subscription management
- Responsive dashboard
- Secure payment processing with Stripe
- Rate limiting and security measures

## 🛠 Tech Stack

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- React Router DOM
- React Hot Toast
- Stripe Elements

### Backend

- Node.js
- Express.js
- OpenAI API
- MongoDB with Mongoose
- JWT Authentication
- Nodemailer
- Express Rate Limit
- Express Validator

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn
- SMTP server access (for email functionality)
- Stripe account (for payments)

## 🔧 Environment Variables

### Frontend (.env)

VITE_BACKEND_URL=http://localhost:3000

### Backend (.env)

- PORT = 3000
- MONGODB_URI = mongodb://localhost:27017/jobhub
- JWT_SECRET = your-secret-key
- FRONTEND_URL= http://localhost:5173

# SMTP Configuration

- SMTP_HOST = smtp.gmail.com
- SMTP_PORT = 587
- SMTP_USER = your-email@gmail.com
- SMTP_PASS = your-smtp-password
- SMTP_FROM = noreply@jobhub.com
- SMTP_SECURE = false

# Stripe

- STRIPE_SECRET_KEY=your-stripe-secret-key
- STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

## 🚀 Installation

1. Clone the repository
   \`\`\`
   git clone https://github.com/yourusername/jobhub.git
   cd jobhub
   \`\`\`

2. Install dependencies
   \`\`\`
   npm run install-all
   \`\`\`

3. Start development servers
   \`\`\`
   npm run dev
   \`\`\`

## 🔒 Security Features

- JWT-based authentication
- Rate limiting for API endpoints
- Email verification for new accounts
- Secure password reset flow
- HTTP-only cookies
- CORS protection

## 🌟 Premium Features

- Access to all job listings
- Priority application submission
- Resume review
- Email support
- Personal career coach (yearly plan)
- Interview preparation sessions (yearly plan)
- Salary negotiation guidance (yearly plan)

## 📱 Pages

1. Home Page - Landing page with feature showcase
2. Jobs Page - Job search and filtering
3. Dashboard - User dashboard with applications tracking
4. Authentication Pages:
   - Login
   - Signup with email verification
   - Password reset flow

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Lucide React for the beautiful icons
- Tailwind CSS for the styling system
- Stripe for payment processing
- MongoDB for the database system" > README.md
