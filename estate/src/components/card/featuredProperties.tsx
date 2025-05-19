import React, { useState} from 'react';

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  alt?: string;
}

interface FeaturedPropertiesProps {
  properties: Property[];
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  // Initialize all images as not loaded
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>(
    properties.reduce((acc, property) => ({ ...acc, [property.id]: false }), {})
  );
  // Track minimum display time for skeleton
  const [minDisplayTime, setMinDisplayTime] = useState<{ [key: number]: boolean }>(
    properties.reduce((acc, property) => ({ ...acc, [property.id]: false }), {})
  );

  // Handle image load event
  const handleImageLoad = (id: number) => {
  
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
    // Ensure skeleton shows for at least 300ms
    setTimeout(() => {
      setMinDisplayTime((prev) => ({ ...prev, [id]: true }));
    }, 5000);
  };


  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Featured Properties
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => {
          // Show skeleton until image is loaded and min display time has passed
          const showSkeleton = !loadedImages[property.id] || !minDisplayTime[property.id];

          return (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-colors duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                {showSkeleton && (
                  <div className="w-full h-full bg-gray-200 animate-pulse z-10 absolute top-0 left-0" />
                )}
                <img
                  src={property.image}
                  alt={property.alt || 'Property Image'}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${showSkeleton ? 'opacity-0' : 'opacity-100'}`}
                  loading="lazy"
                  width="400"
                  height="300"
                  decoding="async"
                  onLoad={() => handleImageLoad(property.id)}
                  onError={() => {
                    handleImageLoad(property.id); // Treat error as loaded to avoid infinite skeleton
                  }}
                />
              </div>
              <div className="p-6">
                {showSkeleton ? (
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="flex justify-between">
                      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
                    <p className="text-gray-600 mt-2">{property.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[#B8860B] font-semibold text-lg">{property.price}</span>
                      <button
                        className="px-4 py-2 bg-[#B8860B] text-white rounded-lg text-sm font-medium hover:bg-[#c7a03c] transition-colors duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-10 text-center">
        <button
          className="px-8 py-3 bg-[#B8860B] text-white rounded-lg font-medium text-lg hover:bg-[#c7a03c] transition-colors duration-300"
        >
          View All Properties
        </button>
      </div>
    </div>
  );
};

export default FeaturedProperties;