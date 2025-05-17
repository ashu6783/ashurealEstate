import { useContext, Suspense, useState } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/ApiRequest";
import List from "../../components/list/List";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../../types";

// Import icons
import { Mail, LogOut, Plus, Edit, Save, FileText, User } from "lucide-react";

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
        <div className="p-8 rounded-lg bg-white shadow-lg">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
          <p className="text-center text-lg text-gray-700">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center bg-gradient-to-br from-[#bcbeca] to-[#36351c] p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-5xl flex flex-col gap-4 md:gap-6">
        {/* Profile Card */}
        <div className="w-full bg-gradient-to-br from-[#171b2c] to-[#4d4b1e] shadow-xl rounded-xl md:rounded-2xl p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
              <div className="relative">
                <img
                  src={currentUser.avatar || "/avatar.svg"}
                  alt="Avatar"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-3 md:border-4 border-[#B8860B] shadow-lg hover:scale-105 transition-transform"
                />
                <div className="absolute -bottom-2 -right-2 bg-teal-100 text-teal-600 text-xs font-bold rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center shadow-sm">
                  {currentUser.username?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {currentUser.username}
                </h1>
                <p className="text-[#B8860B] flex items-center justify-center sm:justify-start gap-1 mt-1 text-sm md:text-base">
                  <Mail size={14} />
                  {currentUser.email}
                </p>
                <div className="mt-4 flex gap-2 md:gap-3 justify-center sm:justify-start flex-wrap sm:flex-nowrap">
                  <Link to="/profile/update">
                    <button className="bg-[#B8860B] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow-md flex items-center gap-1 md:gap-2 hover:scale-105 transition-transform active:scale-95 text-sm md:text-base">
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </button>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="bg-[#0d2718] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow-md flex items-center gap-1 md:gap-2 hover:scale-105 transition-transform active:scale-95 text-sm md:text-base"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="w-full sm:w-auto mt-4 md:mt-0 p-3 md:p-6 bg-black bg-opacity-20 rounded-lg border border-[#B8860B] border-opacity-30">
              <div className="flex items-center gap-2 mb-2">
                <User className="text-[#B8860B]" size={16} />
                <h3 className="text-white font-medium text-sm md:text-base">Account Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-white">
                <div>
                  <p className="text-xs md:text-sm text-gray-300">Posts</p>
                  <p className="text-xl md:text-2xl font-bold">
                    <Suspense fallback="...">
                      <Await resolve={data.postResponse}>
                        {(postResponse: PostResponse) => postResponse.userPosts.length}
                      </Await>
                    </Suspense>
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-gray-300">Saved</p>
                  <p className="text-xl md:text-2xl font-bold">
                    <Suspense fallback="...">
                      <Await resolve={data.postResponse}>
                        {(postResponse: PostResponse) => postResponse.savedPosts.length}
                      </Await>
                    </Suspense>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section with Tabs */}
        <div className="w-full bg-gradient-to-br from-[#171b2c] to-[#4d4b1e] shadow-xl rounded-xl md:rounded-2xl p-4 md:p-8">
          {/* Unified Tab Navigation - Responsive for all screen sizes */}
          <div className="flex mb-6 border-b border-gray-700 overflow-x-auto">
            <button
              onClick={() => setActiveTab("myPosts")}
              className={`py-2 md:py-3 px-4 md:px-6 flex items-center gap-2 font-medium transition-all text-sm md:text-base ${
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
              className={`py-2 md:py-3 px-4 md:px-6 flex items-center gap-2 font-medium transition-all text-sm md:text-base ${
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
          <div className="mt-4 md:mt-6">
            {/* My Posts Tab */}
            {activeTab === "myPosts" && (
              <div className="transition-opacity duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">My Posts</h2>
                  <Link to="/add">
                    <button className="w-full sm:w-auto bg-[#B8860B] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow-md flex items-center justify-center gap-1 md:gap-2 hover:scale-105 transition-transform active:scale-95 text-sm md:text-base">
                      <Plus size={16} />
                      <span>Create Post</span>
                    </button>
                  </Link>
                </div>

                <Suspense 
                  fallback={
                    <div className="flex justify-center py-6 md:py-8">
                      <div className="w-8 h-8 md:w-10 md:h-10 border-3 md:border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <Await
                    resolve={data.postResponse}
                    errorElement={
                      <div className="bg-red-100 text-red-600 p-3 md:p-4 rounded-lg text-center text-sm md:text-base">
                        Error loading posts!
                      </div>
                    }
                  >
                    {(postResponse: PostResponse) => (
                      <div>
                        {postResponse.userPosts.length > 0 ? (
                          <List posts={postResponse.userPosts} />
                        ) : (
                          <div className="bg-gray-800 bg-opacity-30 p-4 md:p-8 rounded-lg text-center border border-gray-700">
                            <p className="text-gray-300 text-sm md:text-base">You haven't created any posts yet.</p>
                            <Link to="/add">
                              <button className="mt-3 md:mt-4 bg-[#B8860B] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-[#a17609] transition-colors text-sm md:text-base">
                                Create your first post
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </Await>
                </Suspense>
              </div>
            )}

            {/* Saved Posts Tab */}
            {activeTab === "savedPosts" && (
              <div className="transition-opacity duration-300">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Saved Posts</h2>

                <Suspense 
                  fallback={
                    <div className="flex justify-center py-6 md:py-8">
                      <div className="w-8 h-8 md:w-10 md:h-10 border-3 md:border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                >
                  <Await
                    resolve={data.postResponse}
                    errorElement={
                      <div className="bg-red-100 text-red-600 p-3 md:p-4 rounded-lg text-center text-sm md:text-base">
                        Error loading saved posts!
                      </div>
                    }
                  >
                    {(postResponse: PostResponse) => (
                      <div>
                        {postResponse.savedPosts.length > 0 ? (
                          <List posts={postResponse.savedPosts} />
                        ) : (
                          <div className="bg-gray-800 bg-opacity-30 p-4 md:p-8 rounded-lg text-center border border-gray-700">
                            <p className="text-gray-300 text-sm md:text-base">You haven't saved any posts yet.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Await>
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;