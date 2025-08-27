import { useContext, useState, FormEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/ApiRequest";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { AxiosError } from "axios";
import { motion } from "framer-motion";

function ProfileUpdatePage() {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState<string[]>([]);
  const navigate = useNavigate();

  console.log("ProfileUpdatePage currentUser:", currentUser); // Debug

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const { username, email, password } = Object.fromEntries(
      formData.entries()
    ) as { username: string; email: string; password: string };

    try {
      if (!currentUser) {
        setError("User is not logged in.");
        setLoading(false);
        return;
      }
      const userId = currentUser.id || currentUser._id;
      if (!userId) {
        setError("User ID is missing. Please log in again.");
        setLoading(false);
        return;
      }
      console.log("Updating user with ID:", userId); // Debug
      const res = await apiRequest.put(`/users/${userId}`, {
        username,
        email,
        password: password || undefined,
        avatar: avatar[0] || currentUser.avatar,
      });
      console.log("Update response:", res.data); // Debug
      updateUser(res.data);
      setSuccess(true);
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err: any) {
      const axiosError = err as AxiosError;
      console.error("Update error:", axiosError.response?.data, axiosError);
      const errorMessage =
        (axiosError.response?.data as { message?: string })?.message ||
        "Failed to update profile. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-6 min-h-screen flex items-center justify-center"
      >
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md mx-auto">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-red-500 text-lg font-medium mb-6">Please log in to update your profile.</div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="mt-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              Go to Login
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col md:flex-row min-h-screen bg-gray-50"
    >
      {/* Left panel */}
      <motion.div 
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/3 bg-gradient-to-br from-teal-500 to-teal-700 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full" 
          style={{ top: '-20px', left: '-20px' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full" 
          style={{ bottom: '-40px', right: '-40px' }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-center z-10"
        >
          <h2 className="text-3xl font-bold mb-2">Profile Picture</h2>
          <p className="text-teal-100 text-lg">Upload a new photo or keep your current one</p>
        </motion.div>
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="relative mb-8 group z-10"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="w-52 h-52 rounded-full overflow-hidden border-4 border-white shadow-xl"
            whileHover={{ boxShadow: "0 0 25px rgba(255,255,255,0.3)" }}
          >
            <img
              src={avatar[0] || currentUser.avatar || "/avatar.svg"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center transition duration-300"
          >
            <div className="bg-black bg-opacity-50 rounded-full w-52 h-52 flex items-center justify-center">
              <UploadWidget
                uwConfig={{
                  cloudName: "ashuudev",
                  uploadPreset: "ashuestate",
                  multiple: false,
                  maxImageFileSize: 5000000,
                  folder: "avatars",
                  sources: ["local", "url"],
                }}
                setState={setAvatar}
                setPublicId={() => {}}
                onUploadComplete={() => {
                  console.log("Upload completed successfully!");
                }}
              />
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-4 z-10"
        >
          <p className="text-sm text-teal-100">Click on the image to upload a new photo</p>
          <p className="text-sm text-teal-100">Maximum size: 5MB</p>
        </motion.div>
      </motion.div>
      
      {/* Right panel */}
      <motion.div 
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-2/3 p-6 flex items-center justify-center"
      >
        <div className="w-full max-w-md">
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit} 
            className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100"
          >
            <motion.h1 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-center text-teal-800 mb-8"
            >
              Update Your Profile
            </motion.h1>
            
            {success && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Profile updated successfully! Redirecting...
              </motion.div>
            )}
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </motion.div>
            )}
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
                Username
              </label>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px rgba(20, 184, 166, 0.3)" }}
                id="username"
                name="username"
                type="text"
                defaultValue={currentUser.username}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Your username"
                required
              />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address
              </label>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px rgba(20, 184, 166, 0.3)" }}
                id="email"
                name="email"
                type="email"
                defaultValue={currentUser.email}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="your.email@example.com"
                required
              />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <motion.input
                whileFocus={{ boxShadow: "0 0 0 2px rgba(20, 184, 166, 0.3)" }}
                id="password"
                name="password"
                type="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                placeholder="Leave blank to keep current password"
              />
              <p className="mt-1 text-xs text-gray-500">Enter a new password only if you want to change it</p>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-between mb-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => navigate("/profile")}
                className="py-3 px-6 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all duration-300 shadow-sm"
              >
                Cancel
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(20, 184, 166, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className={`py-3 px-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg shadow-md transition-all duration-300 
                    ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"}`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Profile"
                )}
              </motion.button>
            </motion.div>
          </motion.form>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-600">
              Need help? Contact <a href="#" className="text-teal-600 hover:underline">Support</a>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProfileUpdatePage;