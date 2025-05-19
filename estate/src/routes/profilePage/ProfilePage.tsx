import { useContext, Suspense, useState, useMemo, useCallback } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/ApiRequest";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../../types";

// Import icons
import { Plus,Save, FileText } from "lucide-react";
import ProfileCard from "../../components/ProfileCard";
import PostList from "../../components/list/PostList";

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
  const [cachedData, setCachedData] = useState<PostResponse | null>(null);

  const handleLogout = useCallback(async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }, [updateUser, navigate]);

  // Skeleton components
  const ProfileCardSkeleton = () => (
    <div className="w-full bg-gradient-to-br from-[#171b2c] to-[#4d4b1e] shadow-xl rounded-xl md:rounded-2xl p-4 md:p-8 animate-pulse">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-500 opacity-80" />
          <div className="text-center sm:text-left">
            <div className="h-6 md:h-8 w-32 md:w-48 bg-gray-500 opacity-80 rounded mb-2" />
            <div className="h-4 md:h-5 w-48 md:w-64 bg-gray-500 opacity-80 rounded mb-4" />
            <div className="flex gap-2 md:gap-3 justify-center sm:justify-start">
              <div className="h-8 md:h-10 w-24 md:w-32 bg-gray-500 opacity-80 rounded-lg" />
              <div className="h-8 md:h-10 w-24 md:w-32 bg-gray-500 opacity-80 rounded-lg" />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-64 mt-4 md:mt-0 p-3 md:p-6 bg-black bg-opacity-20 rounded-lg border border-[#B8860B] border-opacity-30">
          <div className="h-4 md:h-5 w-32 bg-gray-500 opacity-80 rounded mb-4" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="h-3 md:h-4 w-16 bg-gray-500 opacity-80 rounded mb-2" />
              <div className="h-6 md:h-8 w-12 bg-gray-500 opacity-80 rounded" />
            </div>
            <div>
              <div className="h-3 md:h-4 w-16 bg-gray-500 opacity-80 rounded mb-2" />
              <div className="h-6 md:h-8 w-12 bg-gray-500 opacity-80 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PostListSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-gray-800 bg-opacity-30 p-4 md:p-6 rounded-lg animate-pulse">
          <div className="h-5 md:h-6 w-3/4 bg-gray-500 opacity-80 rounded mb-2" />
          <div className="h-4 md:h-5 w-full bg-gray-500 opacity-80 rounded mb-2" />
          <div className="h-4 md:h-5 w-5/6 bg-gray-500 opacity-80 rounded" />
        </div>
      ))}
    </div>
  );

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

  const DelayedAwait = ({ promise }: { promise: Promise<PostResponse> }) => {
    const fetchAndCacheData = useCallback(async () => {
      try {
        if (!cachedData) {
  
          const delayedPromise = await new Promise((resolve) => 
            setTimeout(() => resolve(promise), 2000)
          );
          const result = await delayedPromise as PostResponse;
          setCachedData(result);
          return result;
        }
        return cachedData;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }, [promise, cachedData]);

    const memoizedPromise = useMemo(() => {
      return cachedData ? Promise.resolve(cachedData) : fetchAndCacheData();
    }, [cachedData, fetchAndCacheData]);


    const renderTabContent = useCallback((postResponse: PostResponse) => {
      return (
        <>
    
          <ProfileCard 
            currentUser={currentUser} 
            postCount={postResponse.userPosts.length}
            savedCount={postResponse.savedPosts.length}
            handleLogout={handleLogout}
          />


          <div className="w-full bg-gradient-to-br from-[#171b2c] to-[#4d4b1e] shadow-xl rounded-xl md:rounded-2xl p-4 md:p-8 mt-4 md:mt-6">
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

         
            <div className="mt-4 md:mt-6">
              {/* My Posts tab */}
              <div 
                className="transition-opacity duration-300" 
                style={{ display: activeTab === "myPosts" ? 'block' : 'none' }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">My Posts</h2>
                  <Link to="/add">
                    <button className="w-full sm:w-auto bg-[#B8860B] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg shadow-md flex items-center justify-center gap-1 md:gap-2 hover:scale-105 transition-transform active:scale-95 text-sm md:text-base">
                      <Plus size={16} />
                      <span>Create Post</span>
                    </button>
                  </Link>
                </div>
               
                <PostList 
                  posts={postResponse.userPosts}
                  emptyMessage="You haven't created any posts yet."
                  isMyPosts={true}
                  skipDelay={true} // Skip artificial delay for tabs
                />
              </div>

              {/* Saved Posts tab */}
              <div 
                className="transition-opacity duration-300"
                style={{ display: activeTab === "savedPosts" ? 'block' : 'none' }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Saved Posts</h2>
                <PostList 
                  posts={postResponse.savedPosts}
                  emptyMessage="You haven't saved any posts yet."
                  skipDelay={true} // Skip artificial delay for tabs
                />
              </div>
            </div>
          </div>
        </>
      );
    }, [activeTab, currentUser, handleLogout]);

    return (
      <Suspense
        fallback={
          <div>
            <ProfileCardSkeleton />
            <div className="w-full bg-gradient-to-br from-[#171b2c] to-[#4d4b1e] shadow-xl rounded-xl md:rounded-2xl p-4 md:p-8 mt-4 md:mt-6">
              <PostListSkeleton />
            </div>
          </div>
        }
      >
        <Await
          resolve={memoizedPromise}
          errorElement={
            <div className="bg-red-100 text-red-600 p-3 md:p-4 rounded-lg text-center text-sm md:text-base">
              Error loading data!
            </div>
          }
        >
          {(data) => {
            const postResponse = data as PostResponse;
            return renderTabContent(postResponse);
          }}
        </Await>
      </Suspense>
    );
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-gradient-to-br from-[#bcbeca] to-[#36351c] p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-5xl flex flex-col gap-4 md:gap-6">
        <DelayedAwait promise={data.postResponse} />
      </div>
    </div>
  );
}

export default ProfilePage;