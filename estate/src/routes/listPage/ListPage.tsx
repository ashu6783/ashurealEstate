import { Await, useLoaderData, useSearchParams } from "react-router-dom";
import { Suspense, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map as MapIcon, Grid, SlidersHorizontal, Loader, X } from "lucide-react";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/card";
import Map from "../../components/map/Map";

interface Post {
  _id: string;
  title: string;
  address: string;
  price: number;
  bedroom: number;
  bathroom: number;
  images?: string[];
  img?: string;
  latitude?: string;
  longitude?: string;
  city?: string;
  type?: string;
  property?: string;
  [key: string]: any;
}

interface LoaderData {
  postResponse: Promise<Post[]>;
}

function ListPage() {
  const data = (useLoaderData() as LoaderData) || {
    postResponse: Promise.resolve([]),
  };
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [resultCount, setResultCount] = useState(0);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Strict coordinate validation
  const isValidCoordinate = (value: string | undefined): boolean => {
    if (!value || value.trim() === "") {
      console.log("Invalid coordinate: empty or undefined", value);
      return false;
    }
    const num = Number(value);
    const isValid =
      !isNaN(num) &&
      isFinite(num) &&
      num !== 0 && // Exclude 0 as it’s likely invalid
      ((num >= -90 && num <= 90 && value === String(num)) || // For latitude
        (num >= -180 && num <= 180 && value === String(num))); // For longitude
    if (!isValid) {
      console.log("Invalid coordinate:", value, "Parsed:", num);
    }
    return isValid;
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: { repeat: Infinity, duration: 1, ease: "linear" },
    },
  };

  interface MapItem {
    id: string;
    title: string;
    img: string;
    price: number;
    bedroom: number;
    bathroom: number;
    latitude: number;
    longitude: number;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                variants={loadingVariants}
                animate="animate"
                className="text-blue-600 mb-4"
              >
                <Loader size={40} />
              </motion.div>
              <motion.p
                className="text-gray-600 text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Finding your perfect place...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-1 h-full overflow-hidden">
        <motion.div
          className={`w-full ${
            !isMobile || viewMode === "grid" ? "block" : "hidden"
          } ${
            !isMobile && viewMode === "grid" ? "md:w-3/5 lg:w-3/5" : "md:w-full"
          } h-full overflow-hidden flex flex-col`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 md:px-8 pt-4 pb-2">
            <Filter />
            <motion.div
              className="mt-4 flex justify-between items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center">
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">
                    {resultCount}
                  </span>{" "}
                  properties found
                  {searchParams.get("city") && (
                    <span>
                      {" in "}
                      <span className="font-semibold text-blue-600">
                        {searchParams.get("city")}
                      </span>
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                {isMobile && (
                  <motion.button
                    onClick={() => setShowMobileMap(true)}
                    className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MapIcon size={16} />
                    Map View
                  </motion.button>
                )}
                {!isMobile && (
                  <div className="bg-gray-100 p-1 rounded-lg flex">
                    <motion.button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm ${
                        viewMode === "grid"
                          ? "bg-white shadow-sm text-gray-800"
                          : "text-gray-600"
                      }`}
                      whileHover={
                        viewMode === "grid"
                          ? {}
                          : { backgroundColor: "rgba(255,255,255,0.5)" }
                      }
                      whileTap={{ scale: 0.95 }}
                    >
                      <Grid size={16} />
                      Grid
                    </motion.button>
                    <motion.button
                      onClick={() => setViewMode("map")}
                      className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm ${
                        viewMode === "map"
                          ? "bg-white shadow-sm text-gray-800"
                          : "text-gray-600"
                      }`}
                      whileHover={
                        viewMode === "map"
                          ? {}
                          : { backgroundColor: "rgba(255,255,255,0.5)" }
                      }
                      whileTap={{ scale: 0.95 }}
                    >
                      <MapIcon size={16} />
                      Map
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader size={30} className="text-blue-500" />
                  </motion.div>
                </div>
              }
            >
              <Await
                resolve={data.postResponse}
                errorElement={
                  <motion.div
                    className="bg-red-50 text-red-700 p-4 rounded-lg mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p>Error loading properties. Please try again later.</p>
                  </motion.div>
                }
              >
                {(posts: Post[]) => {
                  console.log("Filtered posts received in Await:", posts);
                  if (posts.length > 0) {
                    console.log("Sample post data:", posts[0]);
                  }

                  useEffect(() => {
                    setResultCount(posts.length);
                    console.log("Result count set to:", posts.length);
                  }, [posts]);

                  return posts && posts.length > 0 ? (
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ staggerChildren: 0.1 }}
                    >
                      {posts.map((post) => {
                        const item = {
                          id: post._id,
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
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center h-64 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <SlidersHorizontal
                        size={40}
                        className="text-gray-400 mb-4"
                      />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">
                        No properties found
                      </h3>
                      <p className="text-gray-500 max-w-md">
                        Try adjusting your search filters to find more results or
                        explore different locations.
                      </p>
                    </motion.div>
                  );
                }}
              </Await>
            </Suspense>
          </div>
        </motion.div>
        {!isMobile && viewMode === "map" && (
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader size={40} className="text-blue-500" />
                  </motion.div>
                </div>
              }
            >
              <Await
                resolve={data.postResponse}
                errorElement={<p className="p-4">Error loading map data</p>}
              >
                {(posts: Post[]) => {
                  console.log("Posts for map view:", posts);

                  const mapItems: MapItem[] = useMemo(() => {
                    return posts
                      .filter((post: Post) => {
                        const isValid =
                          isValidCoordinate(post.latitude) &&
                          isValidCoordinate(post.longitude);
                        console.log(
                          `Post ${post._id}: latitude=${post.latitude}, longitude=${post.longitude}, valid=${isValid}`,
                          post
                        );
                        return isValid;
                      })
                      .map((post: Post): MapItem => {
                        const item = {
                          id: post._id,
                          title: post.title || "Untitled",
                          img:
                            post.images && post.images.length > 0
                              ? post.images[0]
                              : "https://via.placeholder.com/200x120?text=No+Image",
                          price: post.price || 0,
                          bedroom: post.bedroom || 0,
                          bathroom: post.bathroom || 0,
                          latitude: Number(post.latitude),
                          longitude: Number(post.longitude),
                        };
                        console.log("Map item (map view):", item);
                        return item;
                      });
                  }, [posts]);

                  console.log("Map items for map view:", mapItems);

                  return mapItems.length > 0 ? (
                    <div className="h-full relative">
                      <Map items={mapItems} />
                      <div className="absolute top-4 left-4 right-4 z-10">
                        <Filter />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                      <MapIcon size={40} className="text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">
                        No valid map data
                      </h3>
                      <p className="text-gray-500">
                        No properties with valid coordinates found.
                      </p>
                    </div>
                  );
                }}
              </Await>
            </Suspense>
          </motion.div>
        )}
        {!isMobile && viewMode === "grid" && (
          <motion.div
            className="hidden md:block md:w-2/5 lg:w-2/5 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader size={40} className="text-blue-500" />
                  </motion.div>
                </div>
              }
            >
              <Await
                resolve={data.postResponse}
                errorElement={<p className="p-4">Error loading map</p>}
              >
                {(posts: Post[]) => {
                  console.log("Posts for grid map:", posts);

                  const mapItems: MapItem[] = useMemo(() => {
                    return posts
                      .filter((post: Post) => {
                        const isValid =
                          isValidCoordinate(post.latitude) &&
                          isValidCoordinate(post.longitude);
                        console.log(
                          `Post ${post._id}: latitude=${post.latitude}, longitude=${post.longitude}, valid=${isValid}`,
                          post
                        );
                        return isValid;
                      })
                      .map((post: Post): MapItem => {
                        const item = {
                          id: post._id,
                          title: post.title || "Untitled",
                          img:
                            post.images && post.images.length > 0
                              ? post.images[0]
                              : "https://via.placeholder.com/200x120?text=No+Image",
                          price: post.price || 0,
                          bedroom: post.bathroom || 0,
                          bathroom: post.bathroom || 0,
                          latitude: Number(post.latitude),
                          longitude: Number(post.longitude),
                        };
                        console.log("Map item (grid):", item);
                        return item;
                      });
                  }, [posts]);

                  console.log("Map items for grid:", mapItems);

                  return mapItems.length > 0 ? (
                    <div className="h-full">
                      <Map items={mapItems} />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                      <MapIcon size={40} className="text-gray-400 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">
                        No valid map data
                      </h3>
                      <p className="text-gray-500">
                        No properties with valid coordinates found.
                      </p>
                    </div>
                  );
                }}
              </Await>
            </Suspense>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {isMobile && showMobileMap && (
          <motion.div
            className="fixed inset-0 z-50 bg-white"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 flex justify-between items-center border-b">
                <h3 className="font-semibold">Map View</h3>
                <motion.button
                  onClick={() => setShowMobileMap(false)}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100"
                >
                  <X size={20} />
                </motion.button>
              </div>
              <div className="flex-1">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full bg-gray-100">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Loader size={40} className="text-blue-500" />
                      </motion.div>
                    </div>
                  }
                >
                  <Await
                    resolve={data.postResponse}
                    errorElement={<p className="p-4">Error loading map</p>}
                  >
                    {(posts: Post[]) => {
                      console.log("Posts for mobile map:", posts);

                      const mapItems: MapItem[] = useMemo(() => {
                        return posts
                          .filter((post: Post) => {
                            const isValid =
                              isValidCoordinate(post.latitude) &&
                              isValidCoordinate(post.longitude);
                            console.log(
                              `Post ${post._id}: latitude=${post.latitude}, longitude=${post.longitude}, valid=${isValid}`,
                              post
                            );
                            return isValid;
                          })
                          .map((post: Post): MapItem => {
                            const item = {
                              id: post._id,
                              title: post.title || "Untitled",
                              img:
                                post.images && post.images.length > 0
                                  ? post.images[0]
                                  : "https://via.placeholder.com/200x120?text=No+Image",
                              price: post.price || 0,
                              bedroom: post.bedroom || 0,
                              bathroom: post.bathroom || 0,
                              latitude: Number(post.latitude),
                              longitude: Number(post.longitude),
                            };
                            console.log("Map item (mobile):", item);
                            return item;
                          });
                      }, [posts]);

                      console.log("Map items for mobile:", mapItems);

                      return mapItems.length > 0 ? (
                        <div className="h-full">
                          <Map items={mapItems} />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full bg-gray-100">
                          <MapIcon size={40} className="text-gray-400 mb-4" />
                          <h3 className="text-xl font-medium text-gray-700 mb-2">
                            No valid map data
                          </h3>
                          <p className="text-gray-500">
                            No properties with valid coordinates found.
                          </p>
                        </div>
                      );
                    }}
                  </Await>
                </Suspense>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ListPage;