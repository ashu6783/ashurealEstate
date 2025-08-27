import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import Slider from "../../components/slider/Slider";
import PropertyMap from "../../components/map/Map";
import {
  AreaChart, Bath, BedSingleIcon, Bus, Coins, Contact, CookingPot,
  CreditCard, Dog, MapPinCheck, Power, Save, School, LucideIcon
} from "lucide-react";
import CheckoutForm from "../../components/payment/CheckoutForm";
import { useGetPostByIdQuery } from "../../state/api";
import apiRequest from "../../lib/ApiRequest";



const FeatureItem = ({ icon: Icon, title, value }: { icon: LucideIcon, title: string, value: string | number }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center">
    <Icon className="h-6 w-6 text-[#B8860B] mb-1" />
    <span className="text-xs text-gray-500">{title}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const InfoRow = ({ icon: Icon, title, description }: { icon: LucideIcon, title: string, description: string }) => (
  <div className="flex items-start gap-3">
    <div className="bg-yellow-100 p-2 rounded-lg">
      <Icon className="h-5 w-5 text-[#B8860B]" />
    </div>
    <div>
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const SinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(id!);
  const [saved, setSaved] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) return navigate("/login");
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post?._id });
    } catch {
      setSaved((prev) => !prev);
    }
  };


  const handlePayment = () => {
    if (!currentUser) return navigate("/login");
    setShowPaymentForm(true);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isError || !post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8">
        <div className="text-red-500 text-xl mb-4">Property information not available</div>
        <Link to="/" className="bg-[#B8860B] text-white px-6 py-2 rounded-lg hover:bg-[#a17609]">
          Return to Home
        </Link>
      </div>
    );
  }

    if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isError || !post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-8">
        <div className="text-red-500 text-xl mb-4">Property information not available</div>
        <Link to="/" className="bg-[#B8860B] text-white px-6 py-2 rounded-lg hover:bg-[#a17609]">
          Return to Home
        </Link>
      </div>
    );
  }

  const owner = typeof post.userId === "string" ? undefined : post.userId;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* LEFT CONTENT */}
      <div className="md:w-3/5 p-4 md:p-8 bg-white shadow-sm overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <Slider images={post.images || []} />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col gap-4">
                <h1 className="font-serif text-2xl md:text-3xl font-medium text-gray-800">
                  {post.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPinCheck className="h-5 w-5 text-[#B8860B]" />
                  <span>{post.address}</span>
                </div>
                <div className="bg-[#B8860B] text-white rounded-md px-4 py-2 text-lg font-medium w-fit">
                  ${post.price?.toLocaleString()}
                </div>
              </div>

              {/* Owner Card */}
              <div className="flex flex-col items-center p-4 bg-yellow-50 rounded-xl shadow-sm">
                <img
                  src={owner?.avatar || "/default-avatar.png"}
                  alt={owner?.username || "Owner"}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md mb-2"
                />
                <span className="font-medium text-gray-800">{owner?.username || "Owner"}</span>
                <span className="text-xs text-gray-500 mb-2">Property Owner</span>
                <button
                  onClick={handlePayment}
                  className="text-sm bg-white text-[#B8860B] hover:bg-teal-50 border border-teal-300 rounded-full px-3 py-1 flex items-center gap-1"
                >
                  <Contact className="h-5 w-5" /> Pay!
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
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

      {/* RIGHT CONTENT */}
      <div className="md:w-2/5 p-4 md:p-8 bg-gray-50 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          {/* Actions */}
          <div className="flex justify-between gap-4 mb-8">
            <button onClick={handlePayment} className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#B8860B] text-white rounded-lg shadow-md">
              <CreditCard className="h-5 w-5" /> Make Payment
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg shadow-md transition-colors ${
                saved ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Save className="h-5 w-5" /> {saved ? "Saved" : "Save Property"}
            </button>
          </div>

          {/* Payment Form */}
          {showPaymentForm && (
            <div className="p-4 bg-white rounded shadow max-w-md mx-auto mt-8">
              {paymentCompleted ? (
                <div className="text-green-600 font-semibold text-center">Payment Successful! Thank you.</div>
              ) : (
                <CheckoutForm amount={post.price || 0} onPaymentSuccess={() => setPaymentCompleted(true)} />
              )}
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <FeatureItem icon={AreaChart} title="Size" value={`${post.postDetail?.size || "N/A"} sqft`} />
            <FeatureItem icon={BedSingleIcon} title="Bedrooms" value={post.bedroom || "N/A"} />
            <FeatureItem icon={Bath} title="Bathrooms" value={post.bathroom || "N/A"} />
          </div>

          {/* Extra Info */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">Property Features</h2>
            <InfoRow
              icon={Power}
              title="Utilities"
              description={
                post.postDetail?.utilities === "included"
                  ? "Utilities included"
                  : post.postDetail?.utilities === "excluded"
                  ? "Owner responsible"
                  : post.postDetail?.utilities === "shared"
                  ? "Tenant responsible"
                  : "Information not available"
              }
            />
            <InfoRow
              icon={Dog}
              title="Pet Policy"
              description={
                post.postDetail?.pet === "allowed"
                  ? "Pets allowed"
                  : post.postDetail?.pet === "not_allowed"
                  ? "No pets"
                  : "Information not available"
              }
            />
            <InfoRow
              icon={Coins}
              title="Income Requirement"
              description={post.postDetail?.income || "Information not available"}
            />
          </div>

          {/* Nearby Places */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Nearby Places</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureItem icon={School} title="School" value={`${post.postDetail?.school || "N/A"} km`} />
              <FeatureItem icon={Bus} title="Bus Stop" value={`${post.postDetail?.bus || "N/A"} km`} />
              <FeatureItem icon={CookingPot} title="Restaurant" value={`${post.postDetail?.restaurant || "N/A"} km`} />
            </div>
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Location</h2>
            <div className="w-full h-64 rounded-lg overflow-hidden">
              {post.latitude && post.longitude ? (
                <PropertyMap
                  items={[
                    {
                      id: post._id,
                      title: post.title,
                      img: post.images?.[0] || "/default-image.png",
                      price: post.price,
                      bedroom: post.bedroom,
                      latitude: Number(post.latitude),
                      longitude: Number(post.longitude),
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
