import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import HomePage from "./routes/HomePage/HomePage";
import SinglePage from "./routes/singlePage/SinglePage";
import ProfilePage from "./routes/profilePage/ProfilePage";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import ListPage from "./routes/listPage/ListPage";
import { Layout, RequireAuth } from "./routes/layout/Layout";
import ProfileUpdatePage from "./routes/profileUpdatePage/ProfileUpdatePage";
import NewPostPage from "./routes/newPostPage/NewPostPage";
import {
  listPageLoader,
  profilePageLoader,
  singlePageLoader,
} from "./lib/Loaders";
import AboutPage from "./routes/about/AboutPage";
import SplashScreen from "./components/SplashScreen";

import "./index.css";

const stripePromise = loadStripe("pk_test_51RRC2QFSQWj2Vo1fPw9vNiWEcDeYh49Y6GR8SAHuO9rPt52H4fIXffNOPoKjUHLsHO0qmu4o7CSCO0rY2FpXtRds00p3XIMrbH"); // Replace with your actual key

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/:id", element: <SinglePage />, loader: singlePageLoader },
      { path: "/list", element: <ListPage />, loader: listPageLoader },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      { path: "/profile", element: <ProfilePage />, loader: profilePageLoader },
      { path: "/profile/update", element: <ProfileUpdatePage /> },
      { path: "/add", element: <NewPostPage /> },
    ],
  },
]);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <Elements stripe={stripePromise}>
      <RouterProvider router={router} />
    </Elements>
  );
};

export default App;
