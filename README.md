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

For production, we use a **Split Deployment** strategy for maximum stability.

### Part 1: Backend Deployment
1.  Create a new project in Vercel.
2.  Import `ComfyYarns` repo.
3.  Set Root Directory to `backend`.
4.  Add Environment Variables (`MONGODB_URI`, etc.).
5.  Deploy & Copy the URL (e.g., `https://comfyyarns-api.vercel.app`).

### Part 2: Frontend Deployment
1.  Create another new project in Vercel.
2.  Import `ComfyYarns` repo (again).
3.  Set Root Directory to `frontend`.
4.  Add Environment Variable: `VITE_API_URL` = `https://your-backend-url.vercel.app/api`.
5.  Deploy! Use the frontend URL to access your site.

### Admin Setup
To create your first admin account, you can use the hardcoded admin credentials method (see `backend/controllers/adminController.js`) or enable the registration endpoint locally.

## 📄 License
MIT License. Created with 💕 by Comfy Yarns.
