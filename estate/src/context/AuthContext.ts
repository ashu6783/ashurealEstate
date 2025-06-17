import { createContext } from "react";


export interface User {
  id: string;
  _id: string;
  name: string;
  email: string;
  avatar: string;
  username: string;
  accountType:string;
}

export interface AuthContextType {
  currentUser: User | null;
  updateUser: (user: User | null) => void;
  logoutUser: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
  logoutUser: () => {},
  loading: false,
});
