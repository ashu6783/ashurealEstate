# CrestKeys 🏡

<div align="center">
  
<img src="https://github.com/user-attachments/assets/31000bb5-2c9b-4089-a4a4-d0c56164dba1" alt="landingp" width="100" height="50"/>



**Your Ultimate Real Estate Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v4-blue.svg)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v5-green.svg)](https://www.mongodb.com/)

</div>

## 📋 Overview

CrestKeys is a comprehensive real estate platform that connects property buyers, renters, and vacation seekers with available listings. The platform offers a seamless experience for users to browse, create, and manage property listings with an intuitive interface.

### Who is it for?

- **Property Owners**: List your properties for sale, rent, or as vacation stays
- **Home Buyers**: Find your dream home with detailed listings and photos
- **Renters**: Discover rental properties that match your preferences
- **Vacationers**: Book the perfect vacation spot for your next getaway

## ✨ Features

### For All Users
- **Property Search**: Browse comprehensive property listings with detailed information
- **Advanced Filtering**: Find properties by category (Buy, Rent, Vacation), location, price range, and amenities
- **Favorites**: Save properties to revisit later
- **Enquiries**: Contact property owners directly through the platform
- **Interactive Maps**: Visualize property locations and explore neighborhoods

### For Registered Users
- **User Profiles**: Manage your personal information and preferences
- **Property Listings**: Create and manage your own property listings
- **Image Management**: Upload multiple high-quality photos via Cloudinary integration
- **Dashboard**: Track your property listings, saved favorites, and enquiries
- **Notifications**: Receive updates on your listings and enquiries

## 🛠️ Technology Stack

### Frontend
- **React**: Component-based UI library for building the user interface
- **TypeScript**: For type-safe code development
- **Vite**: Next-generation frontend tooling
- **Context API**: For state management across the application
- **Axios**: For API requests to the backend

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing application data
- **Mongoose**: MongoDB object modeling for Node.js
- **JWT**: JSON Web Tokens for secure authentication

### Cloud Services
- **Cloudinary**: Cloud-based image and video management service
- **Vercel**: Deployment and hosting platform

## Getting Started

1. Folder structure:
   ```bash
      crestkeys/
      │
      ├── api/                      # Backend API source code
      │   ├── controllers/          # Controllers to handle business logic
      │   │   ├── auth.controller.ts
      │   │   ├── post.controller.ts
      │   │   ├── user.controller.ts
      │   │   └── verify.controller.ts
      │   │
      │   ├── middleware/           # Middleware for request validation and auth
      │   │   └── verifyToken.ts
      │   │
      │   ├── models/               # Mongoose models for database schemas
      │   │   ├── post.ts
      │   │   ├── postDetail.ts
      │   │   ├── savedPost.ts
      │   │   └── user.ts
      │   │
      │   ├── routes/               # API routes grouped by feature
      │   │   ├── auth.route.ts
      │   │   ├── post.route.ts
      │   │   ├── test.route.ts
      │   │   └── user.route.ts
      │   │
      │   ├── db.ts                 # MongoDB connection setup
      │   ├── index.ts              # Entry point for backend server
      │   └── types/express/        # Custom typings for Express (if any)
      │
      ├── estate/                   # Frontend React app (inside src)
      │   ├── assets/               # Images and static assets
      │   ├── components/           # React components organized by feature
      │   │   ├── card/
      │   │   ├── filter/
      │   │   ├── list/
      │   │   ├── map/
      │   │   ├── navbar/
      │   │   ├── pin/
      │   │   ├── searchbar/
      │   │   ├── slider/
      │   │   └── uploadWidget/
      │   │
      │   ├── context/              # React Contexts for state management (e.g. Auth)
      │   │   ├── AuthContext.ts
      │   │   └── AuthProvider.tsx
      │   │
      │   ├── lib/                  # Utility libraries (API requests, loaders, notifications)
      │   │   ├── ApiRequest.ts
      │   │   ├── Loaders.ts
      │   │   └── NotificationStore.ts
      │   │
      │   ├── routes/               # Page-level components (views)
      │   │   ├── HomePage/
      │   │   ├── RequireAuth.tsx   # Component to protect routes
      │   │   ├── about/
      │   │   ├── layout/
      │   │   ├── listPage/
      │   │   ├── login/
      │   │   ├── newPostPage/
      │   │   ├── profilePage/
      │   │   ├── profileUpdatePage/
      │   │   ├── register/
      │   │   └── singlePage/
      │   │
      │   ├── types.ts              # TypeScript types used in frontend
      │   ├── App.tsx               # Main React app component
      │   ├── main.tsx              # React app entry point
      │   ├── index.css             # Global styles
      │   └── vite.config.ts        # Vite config for frontend bundling
      │
      ├── estate/                   # (If used) possibly static content or deployment related
      ├── public/                   # Public static files (images, favicon, etc.)
      │
      ├── .gitignore                # Git ignore rules
      ├── README.md                 # This README file
      ├── package.json              # Project dependencies & scripts
      ├── tsconfig.json             # TypeScript config
      ├── vite.config.ts            # Vite configuration
      ├── vercel.json               # Vercel deployment config
      └── eslint.config.js          # ESLint rules for code linting




### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB instance (local or cloud)
- Cloudinary account for image uploads

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crestkeys.git
   cd crestkeys
2. Install dependencies for both client and server:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
3. Setup environment variables:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
## Usage
  - Visit the frontend URL (usually http://localhost:3000).
  - Register or log in to create property listings.
  - Browse properties by filtering for Buy, Rent, or Vacation.
  - Save posts you like for easy access later.
  - Public users can send enquiries for any listing.

## Authentication Flow
  - User signs up or logs in.
  - JWT token is issued and stored in the client (using Context API to manage auth state).
  - Authenticated routes allow creating and managing posts.
  - Public routes enable browsing and enquiring.


  
