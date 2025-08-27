import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import apiRequest from "../../lib/ApiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

interface PostData {
  title: string;
  price: number;
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  type: string;
  property: string;
  latitude: string;
  longitude: string;
  images: string[];
}

interface PostDetail {
  desc: string;
  utilities?: string;
  pet?: string;
  income?: string;
  size?: number;
  school?: number;
  bus?: number;
  restaurant?: number;
}

interface FormValues {
  title: string;
  price: string;
  address: string;
  city: string;
  bedroom: string;
  bathroom: string;
  type: string;
  property: string;
  latitude: string;
  longitude: string;
  utilities: string;
  pet: string;
  income: string;
  size: string;
  school: string;
  bus: string;
  restaurant: string;
}

function NewPostPage() {
  const [error, setError] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const navigate = useNavigate();

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  // Log images state changes for debugging
  useEffect(() => {
    console.log("Images state updated in NewPostPage:", images);
    console.log("isUploading state:", isUploading);
  }, [images, isUploading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    const formData = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(formData) as unknown as FormValues; // Cast to unknown first

    // Validate required fields
    if (!inputs.title || !inputs.price || !inputs.address || !inputs.city || !inputs.bedroom || !inputs.bathroom || !inputs.latitude || !inputs.longitude) {
      setError("Please fill in all required fields");
      return;
    }

    if (images.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    if (!editor?.getHTML() || editor.getHTML() === "<p></p>") {
      setError("Please provide a description");
      return;
    }

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price) || 0,
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom) || 1,
          bathroom: parseInt(inputs.bathroom) || 1,
          type: inputs.type || "rent",
          property: inputs.property || "apartment",
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images,
        } as PostData,
        postDetail: {
          desc: editor.getHTML(),
          utilities: inputs.utilities || undefined,
          pet: inputs.pet || undefined,
          income: inputs.income || undefined,
          size: inputs.size ? parseInt(inputs.size) : undefined,
          school: inputs.school ? parseInt(inputs.school) : undefined,
          bus: inputs.bus ? parseInt(inputs.bus) : undefined,
          restaurant: inputs.restaurant ? parseInt(inputs.restaurant) : undefined,
        } as PostDetail,
      });

      navigate(`/${res.data._id}`);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.response?.data?.message || err.message || "Failed to create post");
    }
  };

  const handleUploadComplete = () => {
    console.log("Upload process completed");
    setIsUploading(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-6">
      <div className="flex-1 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col mb-6">
            <label htmlFor="desc" className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="border border-gray-300 rounded-md p-2 min-h-40">
              <EditorContent editor={editor} />
            </div>
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Bedroom */}
          <div className="flex flex-col">
            <label htmlFor="bedroom" className="text-sm font-medium text-gray-700 mb-1">
              Bedroom Number
            </label>
            <input
              min="1"
              id="bedroom"
              name="bedroom"
              type="number"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Bathroom */}
          <div className="flex flex-col">
            <label htmlFor="bathroom" className="text-sm font-medium text-gray-700 mb-1">
              Bathroom Number
            </label>
            <input
              min="1"
              id="bathroom"
              name="bathroom"
              type="number"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Latitude */}
          <div className="flex flex-col">
            <label htmlFor="latitude" className="text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              id="latitude"
              name="latitude"
              type="text"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Longitude */}
          <div className="flex flex-col">
            <label htmlFor="longitude" className="text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              id="longitude"
              name="longitude"
              type="text"
              required
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Type */}
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              defaultValue="rent"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
              <option value="buy">Vacation</option>
            </select>
          </div>

          {/* Property */}
          <div className="flex flex-col">
            <label htmlFor="property" className="text-sm font-medium text-gray-700 mb-1">
              Property
            </label>
            <select
              id="property"
              name="property"
              defaultValue="apartment"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>

          {/* Utilities */}
          <div className="flex flex-col">
            <label htmlFor="utilities" className="text-sm font-medium text-gray-700 mb-1">
              Utilities Policy
            </label>
            <select
              id="utilities"
              name="utilities"
              defaultValue=""
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select Utilities Policy</option>
              <option value="included">Included</option>
              <option value="excluded">Excluded</option>
              <option value="shared">Shared</option>
            </select>
          </div>

          {/* Pet Policy */}
          <div className="flex flex-col">
            <label htmlFor="pet" className="text-sm font-medium text-gray-700 mb-1">
              Pet Policy
            </label>
            <select
              id="pet"
              name="pet"
              defaultValue=""
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select Pet Policy</option>
              <option value="allowed">Allowed</option>
              <option value="not_allowed">Not Allowed</option>
              <option value="case_by_case">Case by Case</option>
            </select>
          </div>

          {/* Income */}
          <div className="flex flex-col">
            <label htmlFor="income" className="text-sm font-medium text-gray-700 mb-1">
              Income Required
            </label>
            <select
              id="income"
              name="income"
              defaultValue=""
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select Income Requirement</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* Size */}
          <div className="flex flex-col">
            <label htmlFor="size" className="text-sm font-medium text-gray-700 mb-1">
              Size (sq ft)
            </label>
            <input
              min="0"
              id="size"
              name="size"
              type="number"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* School */}
          <div className="flex flex-col">
            <label htmlFor="school" className="text-sm font-medium text-gray-700 mb-1">
              Distance to School (km)
            </label>
            <input
              min="0"
              id="school"
              name="school"
              type="number"
              step="0.1"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Bus */}
          <div className="flex flex-col">
            <label htmlFor="bus" className="text-sm font-medium text-gray-700 mb-1">
              Distance to Bus Stop (km)
            </label>
            <input
              min="0"
              id="bus"
              name="bus"
              type="number"
              step="0.1"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Restaurant */}
          <div className="flex flex-col">
            <label htmlFor="restaurant" className="text-sm font-medium text-gray-700 mb-1">
              Distance to Restaurant (km)
            </label>
            <input
              min="0"
              id="restaurant"
              name="restaurant"
              type="number"
              step="0.1"
              className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* UploadWidget */}
          <div className="flex flex-col space-y-4">
            <label className="text-sm font-medium text-gray-700">Property Images</label>
            <div className="flex items-center space-x-2">
              <UploadWidget
                uwConfig={{
                  sources: ["local", "url", "camera"],
                  multiple: true,
                  cloudName: "ashuudev",
                  uploadPreset: "ashuestate",
                  folder: "posts",
                }}
                setState={(urls) => {
                  console.log("Setting images state in NewPostPage:", urls);
                  setImages(urls);
                }}
                setPublicId={(publicId) => {
                  console.log("Public ID:", publicId);
                  setIsUploading(true);
                }}
                onUploadComplete={handleUploadComplete}
              />
              {isUploading && <span className="text-blue-600 ml-2">Uploading image...</span>}
            </div>

            {/* Display uploaded images */}
            {images.length > 0 ? (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Images ({images.length})</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {images.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Uploaded image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md border border-gray-300"
                        onError={() => console.error(`Failed to load image ${index + 1}: ${imageUrl}`)}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImages(images.filter((_, i) => i !== index));
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No images uploaded yet.</p>
            )}
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={images.length === 0 || isUploading}
          >
            Submit
          </button>
          {images.length === 0 && (
            <p className="text-yellow-600 text-sm mt-2">Please upload at least one image to submit</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewPostPage;