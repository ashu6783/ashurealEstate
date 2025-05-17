import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import apiRequest from "../../lib/ApiRequest";
import { CheckCircle2, Loader2Icon, Lock, Mail, User2 } from "lucide-react";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-50 to-blue-50">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#bcbeca] to-[#36351c] z-10"></div>
        <div className="relative z-20 p-12 max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6">Welcome to Crestkeys</h2>
          <p className="text-xl mb-8 text-white/90">
            Sign up to explore premium properties, expert insights, and personalized real estate solutions.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="h-6 w-6 text-teal-300" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Verified Listings</h3>
                <p className="text-white/80">Browse handpicked, verified properties across top locations.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="h-6 w-6 text-teal-300" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Smart Property Matching</h3>
                <p className="text-white/80">Get matched with properties tailored to your budget, needs, and lifestyle.</p>
              </div>

            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle2 className="h-6 w-6 text-teal-300" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Exclusive Deals</h3>
                <p className="text-white/80">Unlock early access to investment opportunities and offers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join our community today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <User2 className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  placeholder="Choose a username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                 <Mail className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Lock className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  placeholder="Create a secure password"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded animate-pulse">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                 <Loader2Icon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>



          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;