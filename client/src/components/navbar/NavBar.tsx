"use client";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FloatingDock } from "../ui/FloatingDeck";
import { Home, User, Info, Phone, Users } from "lucide-react"; // example icons

const DockNavbar = () => {
  const { currentUser } = useContext(AuthContext);


  const navItems = [
    { title: "Home", icon: <Home />, href: "/" },
    { title: "About", icon: <Info />, href: "/about" },
    { title: "Contacts", icon: <Phone />, href: "/contacts" },
    { title: "Agents", icon: <Users />, href: "/agents" },
  ];

  if (currentUser) {
    navItems.push({
      title: currentUser.username,
      icon: <User />,
      href: "/profile",
    });
  } else {
    navItems.push({
      title: "Sign Up",
      icon: <User />,
      href: "/register",
    });
  }

  return (
    <FloatingDock
      items={navItems}
      desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2 z-[5000]"
      mobileClassName="fixed bottom-4 right-4 z-[5000]"
    />
  );
};

export default DockNavbar;
