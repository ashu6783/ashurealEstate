import React, { useState } from "react";

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
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>(
    properties.reduce((acc, property) => {
      acc[property.id] = false;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const handleImageLoad = (id: number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Properties</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => {
          const showSpinner = !loadedImages[property.id];

          return (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="h-48 overflow-hidden relative">
                {showSpinner && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/50">
                    <div className="w-8 h-8 border-4 border-[#B8860B] border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={property.image}
                  alt={property.alt || "Property Image"}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    showSpinner ? "opacity-0" : "opacity-100"
                  }`}
                  loading="lazy"
                  width="400"
                  height="300"
                  decoding="async"
                  onLoad={() => handleImageLoad(property.id)}
                  onError={() => handleImageLoad(property.id)} 
                />
              </div>

              <div className="p-6">
                {showSpinner ? (
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
                    <h3 className="text-xl font-bold text-gray-800">
                      {property.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{property.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[#B8860B] font-semibold text-lg">
                        {property.price}
                      </span>
                      <button className="px-4 py-2 bg-[#B8860B] text-white rounded-lg text-sm font-medium hover:bg-[#c7a03c] transition-colors duration-300">
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
        <button className="px-8 py-3 bg-[#B8860B] text-white rounded-lg font-medium text-lg hover:bg-[#c7a03c] transition-colors duration-300">
          View All Properties
        </button>
      </div>
    </div>
  );
};

export default FeaturedProperties;
