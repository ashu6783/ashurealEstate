import { createContext } from "react";

// Central User type
export interface User {
  id: string;
  _id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
}

export interface AuthContextType {
  currentUser: User | null;
  updateUser: (user: User | null) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
  logoutUser: () => {},
});
