import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/ApiRequest";
import { AuthContext } from "../../context/AuthContext";
import { LockKeyhole, User } from "lucide-react";

interface AuthContextType {
    updateUser: (userData: any) => void;
}

const Login: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);

    const { updateUser } = useContext(AuthContext) as AuthContextType;

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const res = await apiRequest.post("/auth/login", {
                username,
                password,
            });

            updateUser(res.data);
            navigate("/");
        } catch (err: any) {
            console.log(err);
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            {/* Form Section */}
            <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 lg:flex-3">
                <div className="w-full max-w-md">
                    <form
                        onSubmit={handleSubmit}
                        className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-2xl space-y-6"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-white mb-1">Welcome back</h1>
                            <p className="text-slate-300 text-sm">Sign in to continue your journey</p>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <label htmlFor="username" className="sr-only">Username</label>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <User className="h-5 w-5" />    
                                </span>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    minLength={3}
                                    maxLength={20}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition duration-200"
                                    placeholder="Username"
                                />
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                                    <LockKeyhole className="h-5 w-5" />
                                </span>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent focus:outline-none transition duration-200"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:ring-4 focus:ring-cyan-300 focus:outline-none transition duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Logging in...
                                    </div>
                                ) : "Sign In"}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-center text-sm">
                                {error}
                            </div>
                        )}

                        <div className="flex justify-center">
                            <Link
                                to="/register"
                                className="text-slate-300 text-sm hover:text-cyan-400 decoration-slate-500 hover:decoration-cyan-400 transition duration-200"
                            >
                                Don't have an account? <span className="underline font-medium">Sign up</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Image Section - Centered properly */}
            <div className="hidden lg:flex lg:flex-2 items-center justify-center">
                <div className="flex items-center justify-center w-full h-full">
                    <div className="text-center">
                        <img
                            src="/logo.svg"
                            alt="Brand Logo"
                            className="mx-auto max-w-xs mb-8"
                        />
                        <h2 className="text-white text-3xl font-bold mb-4">Experience the Difference</h2>
                        <p className="text-white/80">
                            Login to access your personalized dashboard and continue your journey with us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;