# CrestKeys

CrestKeys is a real estate platform where users can buy, rent, or list vacation properties. It allows registered users to create posts to sell, rent, or offer stays, while public users can browse listings, save favorites, and make inquiries.

---

## Features

- **User Authentication:** Register and log in using JWT-based authentication.
- **Post Creation:** Authenticated users can create property listings for sale, rent, or vacation stays.
- **Image Upload:** Upload property images via Cloudinary for easy and secure storage.
- **Filtering:** Filter property listings by Buy, Rent, or Vacation categories.
- **Save Posts:** Users can save posts for future reference.
- **Enquiries:** Public users can view posts and send enquiries about properties.
- **Context-based AuthProvider:** React context is used to manage user authentication state.

---

## Technologies Used

- Frontend: React, TypeScript
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Image Upload & Storage: Cloudinary

---

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


  
