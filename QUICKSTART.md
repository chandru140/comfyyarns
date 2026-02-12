# 🚀 Quick Start Guide

## Get Comfy Yarns running in 5 minutes!

### Step 1: Start MongoDB
```bash
# If you have MongoDB installed:
brew services start mongodb-community

# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Step 2: Configure Cloudinary (Optional - for image uploads)
1. Sign up at https://cloudinary.com (free tier)
2. Get your credentials from dashboard
3. Add to `backend/.env`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Create Admin Account
```bash
# First, make sure backend is running
cd backend
npm run dev

# In another terminal (keep backend running):
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@comfyyarns.com","password":"Admin123!"}'
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access the Application
- **Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- Use credentials from Step 3 to login

---

## 🎯 First Steps After Login

1. **Add Your First Product:**
   - Login to admin panel
   - Click "+ Add New Product"
   - Fill in product details
   - Upload an image (or use a URL temporarily)
   - Save!

2. **Update WhatsApp Number:**
   Edit these files and replace `919999999999` with your number:
   - `frontend/src/components/ProductCard.jsx`
   - `frontend/src/components/Footer.jsx`
   - `frontend/src/pages/ProductDetail.jsx`

3. **Test the Website:**
   - Go to homepage and see your featured products
   - Try searching in the Shop page
   - Click a product to see details
   - Test the WhatsApp "Buy" button

---

## 🐛 Troubleshooting

**MongoDB connection error?**
```bash
# Check if MongoDB is running:
mongosh

# If not installed:
brew install mongodb-community
brew services start mongodb-community
```

**CORS error in browser console?**
- Make sure backend is running on port 5000
- Check that frontend `.env` has: `VITE_API_URL=http://localhost:5000/api`

**Images not uploading?**
- Add Cloudinary credentials to `backend/.env`
- Restart the backend server

**Admin login not working?**
- Make sure you created an admin account (Step 3)
- Check backend console for errors
- Try creating account again

---

## 📦 Production Deployment Checklist

### Before Deploying:
- [ ] Add MongoDB Atlas connection string to backend `.env`
- [ ] Update JWT_SECRET to a strong random string
- [ ] Add Cloudinary credentials
- [ ] Remove or disable `/api/admin/create` endpoint
- [ ] Update WhatsApp numbers in frontend files
- [ ] Test admin panel locally
- [ ] Add at least 5 products with good images

### Deploy Backend (Render):
- [ ] Create account on render.com
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Add all environment variables
- [ ] Deploy

### Deploy Frontend (Vercel):
- [ ] Create account on vercel.com
- [ ] Import project from GitHub
- [ ] Add `VITE_API_URL` environment variable
- [ ] Deploy

### After Deployment:
- [ ] Test all pages on live site
- [ ] Verify admin panel works
- [ ] Test WhatsApp links on mobile
- [ ] Check search and filters
- [ ] Test image uploads

---

## 🎨 Customization Tips

### Change Color Scheme:
Edit `frontend/tailwind.config.js` - update the `baby-pink` color values

### Update Logo Font:
Edit `frontend/src/index.css` - change `@import url()` for Caveat font

### Modify Product Categories:
Add more categories in `frontend/src/pages/AdminDashboard.jsx` form

### Add More Payment Options:
Extend `frontend/src/components/ProductCard.jsx` to include other services

---

**Happy Selling! 🧶💕**
