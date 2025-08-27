import { useGetPostsQuery, IPost } from "../../state/api"; // adjust path as needed
import { Loader } from "lucide-react";
import Card from "../../components/card/card";
import { motion } from "framer-motion";

const ListPage = () => {
  const { data: posts = [], isLoading, error } = useGetPostsQuery({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader size={30} className="text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-700 p-4 rounded-lg mt-4">
        <p>Error loading properties. Please try again later.</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No properties found
        </h3>
        <p className="text-gray-500 max-w-md">
          Try adjusting your search filters to find more results or explore different locations.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {posts.map((post: IPost) => {
        const item = {
          id: post._id || "",
          title: post.title || "Untitled Property",
          address: post.address || "Address unavailable",
          price: post.price || 0,
          bedroom: post.bedroom || 0,
          bathroom: post.bathroom || 0,
          images: Array.isArray(post.images) ? post.images : [],
          img:
            post.images && post.images.length > 0
              ? post.images[0]
              : "https://via.placeholder.com/300x200?text=No+Image",
        };

        return (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <Card item={item} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default ListPage;
