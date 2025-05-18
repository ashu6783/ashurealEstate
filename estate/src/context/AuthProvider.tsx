import { useEffect, useState, ReactNode } from "react";
import { AuthContext, User } from "./AuthContext";
import apiRequest from "../lib/ApiRequest";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });
  
  const [loading, setLoading] = useState(true);

  // Verify the token and user session on initial load
  useEffect(() => {
    const verifySession = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        // Check if the session is still valid by making a request to your API
        await apiRequest.get("/auth/verify");
        // If successful, the session is valid
        console.log("Session verified successfully");
      } catch (error) {
        console.error("Session invalid or expired", error);
        // Clear the user data if session is invalid
        localStorage.removeItem("user");
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    verifySession();
  }, []);

  const updateUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const logoutUser = async () => {
    try {
      await apiRequest.post("/auth/logout");
    } catch (error) {
      console.error("Logout API error", error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};