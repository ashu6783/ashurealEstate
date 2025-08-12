import { useState, useContext, useEffect } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import apiRequest from "../../lib/ApiRequest";
import { AuthContext } from "../../context/AuthContext";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { AreaChart, Bath, BedSingleIcon, Bus, Coins, Contact, CookingPot, CreditCard, Dog, MapPinCheck, Power, Save, School } from "lucide-react";
import CheckoutForm from "../../components/payment/CheckoutForm";

const SinglePage = () => {
  const post = useLoaderData();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false);  
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

 const handlePayment = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B8860B]"></div>
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
          className="bg-[#B8860B] text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
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
                  <MapPinCheck className="h-5 w-5 text-[#B8860B]" />
                  <span className="text-sm md:text-base">{post.address || "Address not provided"}</span>
                </div>
                <div className="bg-[#B8860B] text-white rounded-md px-4 py-2 text-lg font-medium w-fit">
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

                </div>
                <span className="font-medium text-gray-800">{post.userId?.username || "Property Owner"}</span>
                <span className="text-xs text-gray-500 mb-2">Property Owner</span>
                <button
                  onClick={handlePayment}
                  className="text-sm bg-white text-[#B8860B] hover:bg-teal-50 border border-teal-300 rounded-full px-3 py-1 transition-colors flex items-center gap-1"
                >
                  <Contact className="h-5 w-5" />
                  Pay!
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
              onClick={handlePayment}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#B8860B] text-white rounded-lg shadow-md"
            >
              <CreditCard className="h-5 w-5" />
              Make Payment!
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg shadow-md transition-colors ${saved ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Save className="h-5 w-5" />
              {saved ? "Saved" : "Save Property"}
            </button>
          </div>
          {showPaymentForm && (
            <div className="p-4 space-y-2 bg-white rounded shadow max-w-md mx-auto mt-8">
              {paymentCompleted ? (
                <div className="text-green-600 font-semibold text-center">
                  Payment Successful! Thank you.
                </div>
              ) : (
                <CheckoutForm amount={post.price || 0} onPaymentSuccess={handlePaymentSuccess} />
              )}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="text-[#B8860B] mb-1">
                <AreaChart className="h-6 w-6 text-[#B8860B]" />
              </div>
              <span className="text-xs text-gray-500">Size</span>
              <span className="font-medium">{post.postDetail?.size || "N/A"} sqft</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="text-teal-600 mb-1">
                <BedSingleIcon className="h-6 w-6 text-[#B8860B]" />
              </div>
              <span className="text-xs text-gray-500">Bedrooms</span>
              <span className="font-medium">{post.bedroom || "N/A"}</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="text-teal-600 mb-1">
                <Bath className="h-6 w-6 text-[#B8860B]" />
              </div>
              <span className="text-xs text-gray-500">Bathrooms</span>
              <span className="font-medium">{post.bathroom || "N/A"}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Features</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Power className="h-5 w-5 text-[#B8860B]" />
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
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Dog className="h-5 w-5 text-[#B8860B]" />
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
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Coins className="h-5 w-5 text-[#B8860B]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700">Income Requirement</h3>
                  <p className="text-sm text-gray-600">{post.postDetail?.income || "Information not available"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-[#36454F] mb-4">Nearby Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg flex flex-col items-center">
                <div className="bg-gray-100 p-2 rounded-full mb-2">
                  <School className="h-6 w-6 text-[#36454F]" />
                </div>
                <h3 className="text-sm font-semibold text-[#151b1f]">School</h3>
                <p className="text-sm text-[#36454F] text-center">
                  {post.postDetail.school

                    + " km" || "N/A"}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg flex flex-col items-center">
                <div className="bg-gray-100 p-2 rounded-full mb-2">
                  <Bus className="h-5 w-5 text-[#36454F]" />
                </div>
                <h3 className="text-sm font-semibold text-[#151b1f]">Bus Stop</h3>
                <p className="text-sm text-[#36454F] text-center">
                  {post.postDetail?.bus
                    + " km" || "N/A"}
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg flex flex-col items-center">
                <div className="bg-gray-100 p-2 rounded-full mb-2">
                  <CookingPot className="h-5 w-5 text-[#36454F]" />
                </div>
                <h3 className="text-sm font-semibold text-[#151b1f]">Restaurant</h3>
                <p className="text-sm text-[#36454F] text-center">
                  {post.postDetail?.restaurant

                    + " km" || "N/A"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-[#151b1f] mb-4">Location</h2>
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