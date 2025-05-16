import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/NotificationStore";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
    const [open, setOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const number = useNotificationStore((state) => state.number);

    const navItems = [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Contacts", to: "/contacts" },
        { label: "Agents", to: "/agents" },
    ];

    return (
        <motion.nav 
            className="flex justify-between items-center h-16 md:h-20 lg:h-24 px-4 md:px-8 relative bg-gradient-to-br from-[#0d1122] to-[#4d4b1e] shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <Link to="/" className="flex items-center font-bold text-xl">
                    <motion.img 
                        src="./logo.svg" 
                        alt="Logo" 
                        className="w-8 md:w-10 outline-none border-none" 
                        whileHover={{ rotate: 10 }}
                        transition={{ duration: 0.2 }}
                        
                    />
                    <motion.span 
                        className="hidden md:block ml-3 text-white"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        CrestKeys
                    </motion.span>
                </Link>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12 ml-8">
                {navItems.map((item, index) => (
                    <motion.div
                        key={item.label}
                        className="relative text-white font-medium"
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.1 * index }}
                    >
                        <Link to={item.to}>
                            {item.label}
                            <motion.div 
                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#fece51]"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center justify-end space-x-4 h-full">
                {currentUser ? (
                    <motion.div 
                        className="flex items-center font-medium"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.img
                            src={currentUser.avatar || "./avatar.svg"}
                            alt="avatar"
                            className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 md:mr-4 border-2 border-black"
                            whileHover={{ scale: 1.1 }}
                        />
                        <span className="hidden md:block mr-3 text-white">{currentUser.username}</span>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/profile" className="relative px-4 py-2 bg-[#e1eef6] rounded-lg font-medium cursor-pointer shadow-md">
                                {number > 0 && (
                                    <motion.div 
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        {number}
                                    </motion.div>
                                )}
                                <span>Profile</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="hidden md:flex items-center space-x-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link 
                            to="/login" 
                            className="text-white font-medium"
                        >
                            <motion.span
                                whileHover={{ scale: 1.05, color: "#fece51" }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                Sign in
                            </motion.span>
                        </Link>
                        <Link to="/register">
                            <motion.div
                                className="bg-[#f7f338] px-5 py-2 rounded-lg font-medium shadow-md"
                                whileHover={{ scale: 1.05, backgroundColor: "#ffd875" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                Sign up
                            </motion.div>
                        </Link>
                    </motion.div>
                )}

                {/* Mobile Menu Icon */}
                <motion.div 
                    className="md:hidden ml-2"
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.img
                        src="/menu.png"
                        alt="menu"
                        className="w-8 h-8 cursor-pointer"
                        onClick={() => setOpen(!open)}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                    />
                </motion.div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="fixed top-0 right-0 bg-white h-screen w-2/3 z-20 shadow-lg flex flex-col items-start justify-start pt-16 px-6 md:hidden"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <motion.button
                            className="absolute top-4 right-4"
                            onClick={() => setOpen(false)}
                            whileHover={{ rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {currentUser && (
                            <motion.div 
                                className="flex items-center mb-8 pb-4 border-b border-gray-200 w-full"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <motion.img
                                    src={currentUser.avatar || "./avatar.svg"}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full mr-3 border-2 border-[#fece51]"
                                    whileHover={{ scale: 1.1 }}
                                />
                                <span className="font-medium text-lg text-gray-800">{currentUser.username}</span>
                            </motion.div>
                        )}

                        {navItems.map((item, index) => (
                            <motion.div 
                                key={item.label}
                                className="w-full"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index + 0.3 }}
                            >
                                <Link 
                                    to={item.to}
                                    onClick={() => setOpen(false)}
                                    className="block py-3 text-lg text-gray-700 font-medium border-b border-gray-100 w-full"
                                >
                                    <motion.span whileHover={{ x: 5, color: "#fece51" }}>
                                        {item.label}
                                    </motion.span>
                                </Link>
                            </motion.div>
                        ))}

                        {!currentUser && (
                            <motion.div 
                                className="mt-6 w-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <Link to="/login">
                                    <motion.div 
                                        className="block py-3 text-lg text-gray-700 font-medium"
                                        whileHover={{ x: 5, color: "#fece51" }}
                                    >
                                        Sign in
                                    </motion.div>
                                </Link>
                                <Link to="/register">
                                    <motion.div
                                        className="block mt-3 py-3 text-lg bg-[#fece51] rounded-lg text-center font-medium shadow-md"
                                        whileHover={{ scale: 1.03, backgroundColor: "#ffd875" }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        Sign up
                                    </motion.div>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

export default Navbar;
