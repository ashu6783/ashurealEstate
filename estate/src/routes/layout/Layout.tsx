import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/navbar/NavBar';

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

function Layout() {
  return <BaseLayout />;
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return <BaseLayout />;
}

export { Layout, RequireAuth };