import { useContext, Suspense, useState } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiRequest from "../../lib/ApiRequest";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../../types";

// Import icons
import { Mail, LogOut, Plus, Edit, Save, FileText, User, ChevronDown } from "lucide-react";

interface PostResponse {
  userPosts: Post[];
  savedPosts: Post[];
}

interface LoaderData {
  postResponse: Promise<PostResponse>;
}

function ProfilePage() {
  const data = useLoaderData() as LoaderData;
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myPosts");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-lg bg-white shadow-lg"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-center text-lg text-gray-700">Loading user data...</p>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex justify-center bg-gradient-to-br from-[#bcbeca] to-[#36351c] p-6"
    >
      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full bg-gradient-to-br from-[#171b2c] to-[#4d4b1e] shadow-xl rounded-2xl p-8"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <motion.img
                  src={currentUser.avatar || "/avatar.svg"}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#B8860B] shadow-lg"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-2 -right-2 bg-teal-100 text-teal-600 text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
                >
                  {currentUser.username?.charAt(0).toUpperCase() || "U"}
                </motion.div>
              </motion.div>

              <div>
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl font-bold text-white"
                >
                  {currentUser.username}
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-[#B8860B] flex items-center gap-1 mt-1"
                >
                  <Mail size={14} />
                  {currentUser.email}
                </motion.p>
                <motion.div
                  variants={itemVariants}
                  className="mt-4 flex gap-3"
                >
                  <Link to="/profile/update">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="bg-[#B8860B] text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                    >
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </motion.button>
                  </Link>
                  
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleLogout}
                    className="bg-[#0d2718] text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="hidden md:block p-6 bg-black bg-opacity-20 rounded-lg border border-[#B8860B] border-opacity-30"
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="text-[#B8860B]" size={18} />
                <h3 className="text-white font-medium">Account Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div>
                  <p className="text-sm text-gray-300">Posts</p>
                  <p className="text-2xl font-bold">
                    <Suspense fallback="...">
                      <Await resolve={data.postResponse}>
                        {(postResponse: PostResponse) => postResponse.userPosts.length}
                      </Await>
                    </Suspense>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Saved</p>
                  <p className="text-2xl font-bold">
                    <Suspense fallback="...">
                      <Await resolve={data.postResponse}>
                        {(postResponse: PostResponse) => postResponse.savedPosts.length}
                      </Await>
                    </Suspense>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Content Section with Tabs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="w-full bg-gradient-to-br from-[#171b2c] to-[#4d4b1e] shadow-xl rounded-2xl p-8"
        >
          {/* Mobile Dropdown */}
          <div className="md:hidden mb-6">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full bg-[#0d2718] text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                {activeTab === "myPosts" ? (
                  <>
                    <FileText className="text-[#B8860B]" size={18} />
                    <span>My Posts</span>
                  </>
                ) : (
                  <>
                    <Save className="text-[#B8860B]" size={18} />
                    <span>Saved Posts</span>
                  </>
                )}
              </span>
              <ChevronDown 
                className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </motion.button>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-[#0d2718] mt-1 rounded-lg overflow-hidden shadow-lg"
                >
                  <button
                    onClick={() => {
                      setActiveTab("myPosts");
                      setIsMenuOpen(false);
                    }}
                    className={`w-full py-3 px-4 text-left flex items-center gap-2 ${
                      activeTab === "myPosts" ? "bg-[#B8860B] bg-opacity-20" : ""
                    }`}
                  >
                    <FileText className="text-[#B8860B]" size={18} />
                    <span className="text-white">My Posts</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("savedPosts");
                      setIsMenuOpen(false);
                    }}
                    className={`w-full py-3 px-4 text-left flex items-center gap-2 ${
                      activeTab === "savedPosts" ? "bg-[#B8860B] bg-opacity-20" : ""
                    }`}
                  >
                    <Save className="text-[#B8860B]" size={18} />
                    <span className="text-white">Saved Posts</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex mb-6 border-b border-gray-700">
            <button
              onClick={() => setActiveTab("myPosts")}
              className={`py-3 px-6 flex items-center gap-2 font-medium transition-all ${
                activeTab === "myPosts" 
                  ? "border-b-2 border-[#B8860B] text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FileText size={18} className={activeTab === "myPosts" ? "text-[#B8860B]" : ""} />
              <span>My Posts</span>
            </button>
            <button
              onClick={() => setActiveTab("savedPosts")}
              className={`py-3 px-6 flex items-center gap-2 font-medium transition-all ${
                activeTab === "savedPosts" 
                  ? "border-b-2 border-[#B8860B] text-white" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Save size={18} className={activeTab === "savedPosts" ? "text-[#B8860B]" : ""} />
              <span>Saved Posts</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {/* My Posts Tab */}
            <AnimatePresence mode="wait">
              {activeTab === "myPosts" && (
                <motion.div
                  key="my-posts"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">My Posts</h2>
                    <Link to="/add">
                      <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-[#B8860B] text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2"
                      >
                        <Plus size={16} />
                        <span>Create Post</span>
                      </motion.button>
                    </Link>
                  </div>

                  <Suspense 
                    fallback={
                      <div className="flex justify-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full"
                        />
                      </div>
                    }
                  >
                    <Await
                      resolve={data.postResponse}
                      errorElement={
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-red-100 text-red-600 p-4 rounded-lg text-center"
                        >
                          Error loading posts!
                        </motion.div>
                      }
                    >
                      {(postResponse: PostResponse) => (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {postResponse.userPosts.length > 0 ? (
                              <List posts={postResponse.userPosts} />
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-gray-800 bg-opacity-30 p-8 rounded-lg text-center border border-gray-700"
                              >
                                <p className="text-gray-300">You haven't created any posts yet.</p>
                                <Link to="/add">
                                  <motion.button
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className="mt-4 bg-[#B8860B] text-white px-4 py-2 rounded-lg hover:bg-[#a17609]"
                                  >
                                    Create your first post
                                  </motion.button>
                                </Link>
                              </motion.div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </Await>
                  </Suspense>
                </motion.div>
              )}

              {/* Saved Posts Tab */}
              {activeTab === "savedPosts" && (
                <motion.div
                  key="saved-posts"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Saved Posts</h2>

                  <Suspense 
                    fallback={
                      <div className="flex justify-center py-8">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full"
                        />
                      </div>
                    }
                  >
                    <Await
                      resolve={data.postResponse}
                      errorElement={
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-red-100 text-red-600 p-4 rounded-lg text-center"
                        >
                          Error loading saved posts!
                        </motion.div>
                      }
                    >
                      {(postResponse: PostResponse) => (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {postResponse.savedPosts.length > 0 ? (
                              <List posts={postResponse.savedPosts} />
                            ) : (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-gray-800 bg-opacity-30 p-8 rounded-lg text-center border border-gray-700"
                              >
                                <p className="text-gray-300">You haven't saved any posts yet.</p>
                              </motion.div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      )}
                    </Await>
                  </Suspense>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProfilePage;