# 🧶 Comfy Yarns - E-commerce Website

A beautiful, fully responsive e-commerce website for handmade crochet products built with the MERN stack (MongoDB, Express, React, Node.js).

![Comfy Yarns Banner](frontend/public/comfyyarnslogo.png)

## ✨ Features

- **Beautiful Design**: Custom "Baby Pink" theme with smooth animations and glassmorphism.
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Product Management**: Admin dashboard to add, edit, and delete products.
- **Image Optimization**: Cloudinary integration with lazy loading and auto-optimization.
- **WhatsApp Integration**: Direct "Buy on WhatsApp" button for customer engagement.
- **Search & Filter**: Real-time product search functionality.
- **Secure**: JWT Authentication, Helmet security headers, CORS, and Rate Limiting.

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router v6
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Deployment**: Vercel (Serverless Functions)

## 📁 Project Structure

```
ComfyYarns/
├── api/                # Vercel Serverless Entry Point
├── backend/            # Express Server & Logic
│   ├── controllers/
│   ├── models/
│   └── routes/
├── frontend/           # React Application
│   ├── src/
│   └── public/
├── package.json        # Root scripts for monorepo
└── vercel.json         # Vercel Configuration
```

## 🛠️ Getting Started (Local Development)

### 1. Clone & Install
We use a root `package.json` to manage both frontend and backend.

```bash
git clone https://github.com/chandru140/comfyyarns.git
cd ComfyYarns
npm install
```

### 2. Environment Variables
Create a `.env` file in **backend/** and **frontend/**.

**`backend/.env`**:
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/comfyyarns
JWT_SECRET=your_super_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**`frontend/.env`**:
```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Run Locally
Start both backend and frontend concurrently:

```bash
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

## 🌐 Deployment (Vercel)

This project is configured for **Zero-Config Deployment** on Vercel.

1.  **Push** your code to GitHub.
2.  **Import** the project in [Vercel](https://vercel.com).
3.  **Environment Variables**: Add your backend definition variables (`MONGODB_URI`, etc.) in Vercel.
    -   *Crucial*: Set `VITE_API_URL` to `/api` in Vercel for production.
4.  **Deploy**: Vercel handles the build, serverless functions, and CDN automatically.

### Admin Setup
To create your first admin account, you can use the hardcoded admin credentials method (see `backend/controllers/adminController.js`) or enable the registration endpoint locally.

## 📄 License
MIT License. Created with 💕 by Comfy Yarns.
