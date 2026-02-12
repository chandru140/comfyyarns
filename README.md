# 🧶 Comfy Yarns - E-commerce Website

A beautiful, fully responsive e-commerce website for handmade crochet products built with the MERN stack.

## ✨ Features

- **Beautiful Design**: White & Baby Pink color palette with smooth animations
- **Product Management**: Full CRUD operations for products (admin only)
- **WhatsApp Integration**: Direct "Buy on WhatsApp" for each product
- **Search & Filter**: Real-time product search and price range filter
- **Admin Panel**: Secure admin dashboard with JWT authentication
- **Cloudinary Integration**: Image uploads and storage
- **Responsive Design**: Mobile-first, works on all devices
- **SEO Optimized**: Meta tags, semantic HTML, and clean structure

## 🚀 Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS with custom baby pink theme
- React Router for navigation
- Axios for API calls
- Google Fonts (Caveat & Poppins)

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for image storage
- bcryptjs for password hashing

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

## ⚙️ Installation

### 1. Clone the repository
```bash
cd ComfyYarns
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 👤 Creating Admin Account

To create your first admin account, make a POST request to:
```
POST http://localhost:5000/api/admin/create
Content-Type: application/json

{
  "email": "admin@comfyyarns.com",
  "password": "your_secure_password"
}
```

**Note**: For security, disable or remove the `/api/admin/create` endpoint in production.

## 📱 WhatsApp Configuration

Update the WhatsApp number in:
- `frontend/src/components/ProductCard.jsx` (line 7)
- `frontend/src/components/Footer.jsx` (line 43)
- `frontend/src/pages/ProductDetail.jsx` (line 56)

Replace `919999999999` with your actual WhatsApp number (country code + number, no + or spaces).

## 🌐 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variable: `VITE_API_URL=your_backend_url/api`
4. Deploy

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your repository
3. Add environment variables from `.env`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy

## 📁 Project Structure

```
ComfyYarns/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   ├── App.jsx         # Main app component
│   │   └── index.css       # Tailwind styles
│   └── package.json
├── backend/
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth middleware
│   ├── config/             # DB & Cloudinary config
│   ├── server.js           # Express server
│   └── package.json
└── README.md
```

## 🎨 Color Palette

- Primary: Baby Pink (#FFB6C1, #FFC0CB)
- Secondary: White (#FFFFFF)
- Accent: Soft Rose (#FFE4E1, #FDD7E4)
- Background: Off-white (#FAFAFA)

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 💖 Made with Love

Created with 💕 and yarn by Comfy Yarns

---

**Happy Crocheting! 🧶**
# comfyyarns
