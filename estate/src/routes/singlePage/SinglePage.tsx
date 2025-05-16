import { useState, useContext, useEffect } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import apiRequest from "../../lib/ApiRequest";
import { AuthContext } from "../../context/AuthContext";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";

const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Post data from loader:", post); // Debug
    if (post && post._id) {
      setSaved(post.isSaved || false);
      setLoading(false);
    } else {
      setError("Unable to load property details");
      setLoading(false);
    }
  }, [post]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post._id });
    } catch (err) {
      console.error("Error saving property:", err);
      setSaved((prev) => !prev);
    }
  };

  const handleSendMessage = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    navigate(`/messages?user=${post.userId._id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error || !post || !post._id) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-8">
        <div className="text-red-500 text-xl mb-4">
          {error || "Property information not available"}
        </div>
        <Link
          to="/"
          className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-gray-50">
      <div className="md:w-3/5 md:h-full overflow-y-auto p-4 md:p-8 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <Slider images={post.images || []} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col gap-4 mb-6 md:mb-0">
                <h1 className="font-serif text-2xl md:text-3xl font-medium text-gray-800">
                  {post.title || "Untitled Property"}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base">{post.address || "Address not provided"}</span>
                </div>
                <div className="bg-teal-500 text-white rounded-md px-4 py-2 text-lg font-medium w-fit">
                  ${post.price?.toLocaleString() || "Price not available"}
                </div>
              </div>
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm">
                <div className="relative mb-2">
                  <img
                    src={post.userId?.avatar || "/default-avatar.png"}
                    alt="Owner"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="font-medium text-gray-800">{post.userId?.username || "Property Owner"}</span>
                <span className="text-xs text-gray-500 mb-2">Property Owner</span>
                <button
                  onClick={handleSendMessage}
                  className="text-sm bg-white text-teal-600 hover:bg-teal-50 border border-teal-300 rounded-full px-3 py-1 transition-colors flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  Contact
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Description</h2>
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail?.desc || "<p>No description provided</p>"),
              }}
            />
          </div>
        </div>
      </div>
      <div className="md:w-2/5 md:h-full overflow-y-auto p-4 md:p-8 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-between gap-4 mb-8">
            <button
              onClick={handleSendMessage}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              Contact Owner
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg shadow-md transition-colors ${
                saved ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill={saved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              {saved ? "Saved" : "Save Property"}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="text-teal-600 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <span className="text-xs text-gray-500">Size</span>
              <span className="font-medium">{post.postDetail?.size || "N/A"} sqft</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="text-teal-600 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 Restaurent0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span className="text-xs text-gray-500">Bedrooms</span>
              <span className="font-medium">{post.bedroom || "N/A"}</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="text-teal-600 mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xs text-gray-500">Bathrooms</span>
              <span className="font-medium">{post.bathroom || "N/A"}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Features</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Utilities</h3>
                  <p className="text-sm text-gray-600">
                    {post.postDetail?.utilities === "included"
                      ? "Utilities included"
                      : post.postDetail?.utilities === "owner"
                      ? "Owner is responsible"
                      : post.postDetail?.utilities === "tenant"
                      ? "Tenant is responsible"
                      : "Information not available"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17 client side.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Pet Policy</h3>
                  <p className="text-sm text-gray-600">
                    {post.postDetail?.pet === "allowed"
                      ? "Pets are allowed"
                      : post.postDetail?.pet === "not_allowed"
                      ? "Pets are not allowed"
                      : "Information not available"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Income Requirement</h3>
                  <p className="text-sm text-gray-600">{post.postDetail?.income || "Information not available"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Nearby Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
                <div className="bg-blue-100 p-2 rounded-full mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-blue-800">School</h3>
                <p className="text-sm text-blue-600 text-center">
                  {post.postDetail?.school
                    ? post.postDetail.school > 999
                      ? (post.postDetail.school / 1000).toFixed(1) + " km"
                      : post.postDetail.school + " m"
                    : "N/A"}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
                <div className="bg-blue-100 p-2 rounded-full mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-blue-800">Bus Stop</h3>
                <p className="text-sm text-blue-600 text-center">
                  {post.postDetail?.bus
                    ? post.postDetail.bus > 999
                      ? (post.postDetail.bus / 1000).toFixed(1) + " km"
                      : post.postDetail.bus + " m"
                    : "N/A"}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center">
                <div className="bg-blue-100 p-2 rounded-full mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-blue-800">Restaurant</h3>
                <p className="text-sm text-blue-600 text-center">
                  {post.postDetail?.restaurant
                    ? post.postDetail.restaurant > 999
                      ? (post.postDetail.restaurant / 1000).toFixed(1) + " km"
                      : post.postDetail.restaurant + " m"
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Location</h2>
            <div className="w-full h-64 rounded-lg overflow-hidden">
              {post.latitude && post.longitude ? (
                <Map
                  items={[
                    {
                      id: post._id,
                      title: post.title || "Untitled Property",
                      img: post.images?.[0] || "/default-image.png",
                      price: post.price || 0,
                      bedroom: post.bedroom || 0,
                      latitude: parseFloat(post.latitude),
                      longitude: parseFloat(post.longitude),
                    },
                  ]}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                  Map location not available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;