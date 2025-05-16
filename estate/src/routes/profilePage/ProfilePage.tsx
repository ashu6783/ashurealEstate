import { useContext, Suspense } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiRequest from "../../lib/ApiRequest";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../../types";

// Import icons
import {  Mail, LogOut, Plus, Edit, Save, FileText } from "lucide-react";

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
      className="w-full min-h-screen flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 space-y-10"
      >
        {/* Profile Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row justify-between items-center border-b pb-6 gap-4"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <motion.img
                src={currentUser.avatar || "/avatar.svg"}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border-4 border-teal-500 shadow-md"
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
                className="text-3xl font-bold text-gray-800"
              >
                {currentUser.username}
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-gray-500 flex items-center gap-1"
              >
                <Mail size={14} />
                {currentUser.email}
              </motion.p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-3">
            <Link to="/profile/update">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 shadow-md flex items-center gap-2"
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
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md flex items-center gap-2"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* My Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <FileText className="text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-800">My Posts</h2>
            </motion.div>
            
            <Link to="/add">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 shadow-md flex items-center gap-2"
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
                        className="bg-gray-50 p-8 rounded-lg text-center"
                      >
                        <p className="text-gray-500">You haven't created any posts yet.</p>
                        <Link to="/add">
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
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

        {/* Saved Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 border-t pt-10"
        >
          <motion.div 
            initial={{ x: -20, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2"
          >
            <Save className="text-teal-600" />
            <h2 className="text-2xl font-bold text-gray-800">Saved Posts</h2>
          </motion.div>

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
                        className="bg-gray-50 p-8 rounded-lg text-center"
                      >
                        <p className="text-gray-500">You haven't saved any posts yet.</p>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </Await>
          </Suspense>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProfilePage;