import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/navbar/NavBar';

// Common layout component used by both standard and authenticated routes
function BaseLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="flex-1 overflow-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}

// Public layout - accessible to all users
function Layout() {
  return <BaseLayout />;
}

// Protected layout - only accessible to authenticated users
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return <BaseLayout />;
}

export { Layout, RequireAuth };