import React, { Suspense, memo, useMemo } from "react";
import { Await, Link } from "react-router-dom";
import List from "../../components/list/List";
import { Post } from "../../types";

interface PostListProps {
  posts: Post[];
  emptyMessage: string;
  isMyPosts?: boolean;
  skipDelay?: boolean;
}

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
//memoization to prevent unnecessary re-renders
const PostList: React.FC<PostListProps> = memo(({ 
  posts, 
  emptyMessage, 
  isMyPosts = false,
  skipDelay = false 
}) => {
  const resolvedPromise = useMemo(() => {
    if (skipDelay) {
      return Promise.resolve(posts);
    }

    return new Promise((resolve) => setTimeout(() => resolve(posts), 2000));
  }, [posts, skipDelay]);


  const renderContent = useMemo(() => (resolvedPosts: Post[]) => {
    return (
      <div>
        {resolvedPosts.length > 0 ? (
          <List posts={resolvedPosts} />
        ) : (
          <div className="bg-gray-800 bg-opacity-30 p-4 md:p-8 rounded-lg text-center border border-gray-700">
            <p className="text-gray-300 text-sm md:text-base">{emptyMessage}</p>
            {isMyPosts && (
              <Link to="/add">
                <button className="mt-3 md:mt-4 bg-[#B8860B] text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-[#a17609] transition-colors text-sm md:text-base">
                  Create your first post
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }, [emptyMessage, isMyPosts]);

  return (
    <Suspense fallback={<PostListSkeleton />}>
      <Await
        resolve={resolvedPromise}
        errorElement={
          <div className="bg-red-100 text-red-600 p-3 md:p-4 rounded-lg text-center text-sm md:text-base">
            Error loading posts!
          </div>
        }
      >
        {(resolvedPosts) => renderContent(resolvedPosts as Post[])}
      </Await>
    </Suspense>
  );
});

export default PostList;