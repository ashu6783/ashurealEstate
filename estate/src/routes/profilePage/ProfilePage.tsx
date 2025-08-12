import { useContext, Suspense, useState, useMemo, useCallback } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/ApiRequest";
import { AuthContext } from "../../context/AuthContext";
import { Post } from "../../types";

import { Plus, Save, FileText } from "lucide-react";
import ProfileCard from "../../components/ProfileCard";
import PostList from "../../components/list/PostList";

interface PostResponse {
  userPosts: Post[];
  savedPosts: Post[];
}

interface LoaderData {
  postResponse: Promise<PostResponse>;
}

// Simple spinner loader
const SimpleLoader = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-10 h-10 border-4 border-[#B8860B] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SimpleLoader />
      </div>
    );
  }

  const DelayedAwait = ({ promise }: { promise: Promise<PostResponse> }) => {
    const fetchAndCacheData = useCallback(async () => {
      try {
        if (!cachedData) {
          const delayedPromise = await new Promise((resolve) =>
            setTimeout(() => resolve(promise), 1000)
          );
          const result = (await delayedPromise) as PostResponse;
          setCachedData(result);
          return result;
        }
        return cachedData;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }, [promise]);

    const memoizedPromise = useMemo(() => {
      return cachedData ? Promise.resolve(cachedData) : fetchAndCacheData();
    }, [fetchAndCacheData]); // removed cachedData from deps

    const renderTabContent = useCallback((postResponse: PostResponse) => {
      return (
        <>
          <ProfileCard
            currentUser={currentUser}
            postCount={postResponse.userPosts.length}
            savedCount={postResponse.savedPosts.length}
            handleLogout={handleLogout}
          />

          <div className="w-full bg-black/20 shadow-xl rounded-xl md:rounded-2xl p-4 md:p-8 mt-4 md:mt-6">
            <div className="flex mb-6 border-b border-gray-700 overflow-x-auto">
              <button
                onClick={() => setActiveTab("myPosts")}
                className={`py-2 md:py-3 px-4 md:px-6 flex items-center gap-2 font-medium transition-all text-sm md:text-base ${
                  activeTab === "myPosts"
                    ? "border-b-2 border-[#B8860B] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <FileText
                  size={18}
                  className={activeTab === "myPosts" ? "text-[#B8860B]" : ""}
                />
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
                <Save
                  size={18}
                  className={activeTab === "savedPosts" ? "text-[#B8860B]" : ""}
                />
                <span>Saved Posts</span>
              </button>
            </div>

            {activeTab === "myPosts" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    My Posts
                  </h2>
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
                  skipDelay={true}
                />
              </div>
            )}

            {activeTab === "savedPosts" && (
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
                  Saved Posts
                </h2>
                <PostList
                  posts={postResponse.savedPosts}
                  emptyMessage="You haven't saved any posts yet."
                  skipDelay={true}
                />
              </div>
            )}
          </div>
        </>
      );
    }, []);

    return (
      <Suspense fallback={<SimpleLoader />}>
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
    <div className="w-full min-h-full flex justify-center p-2 sm:p-4 md:p-6">
      <div className="w-full max-w-5xl flex flex-col gap-4 md:gap-6">
        <DelayedAwait promise={data.postResponse} />
      </div>
    </div>
  );
}

export default ProfilePage;
