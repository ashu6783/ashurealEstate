import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Define the type for images
interface SliderProps {
  images: string[]; // Array of strings (URLs for the images)
}

function Slider({ images }: SliderProps) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Handle keyboard navigation when modal is open
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (imageIndex === null) return;
      
      if (e.key === 'ArrowLeft') {
        changeSlide('left');
      } else if (e.key === 'ArrowRight') {
        changeSlide('right');
      } else if (e.key === 'Escape') {
        setImageIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [imageIndex]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (imageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [imageIndex]);

  const changeSlide = (direction: string) => {
    if (imageIndex !== null) {
      // For modal view
      if (direction === "left") {
        setImageIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
      } else {
        setImageIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
      }
    } else {
      // For thumbnail view
      if (direction === "left") {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }
  };

  // If there are no images
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[350px] bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Fullscreen modal */}
      {imageIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button 
            onClick={() => setImageIndex(null)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => changeSlide("left")}
            className="absolute left-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="w-full h-full max-w-5xl max-h-full flex items-center justify-center p-4 md:p-8">
            <img 
              src={images[imageIndex]} 
              alt={`Property image ${imageIndex + 1}`} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          <button
            onClick={() => changeSlide("right")}
            className="absolute right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="bg-black bg-opacity-50 px-4 py-2 rounded-full text-white text-sm">
              {imageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
      
      {/* Main slider - different layouts based on number of images */}
      <div className="h-[350px] md:h-[450px] rounded-lg overflow-hidden">
        {images.length === 1 ? (
          // Single image layout - full width
          <div 
            className="w-full h-full cursor-pointer relative group"
            onClick={() => setImageIndex(0)}
          >
            <img 
              src={images[0]} 
              alt="Property image" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        ) : (
          // Multiple images layout
          <div className="flex h-full">
            {/* Left arrow for thumbnail view */}
            {images.length > 1 && (
              <button
                onClick={() => changeSlide("left")}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            
            {/* Main large image */}
            <div 
              className="flex-grow h-full cursor-pointer relative"
              onClick={() => setImageIndex(currentSlide)}
            >
              <img 
                src={images[currentSlide]} 
                alt={`Property main image`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                {currentSlide + 1} / {images.length}
              </div>
            </div>
            
            {/* Thumbnails - only show on medium screens and up */}
            {images.length > 1 && (
              <div className="hidden md:flex flex-col w-1/4 ml-2 gap-2 h-full overflow-y-auto py-0.5">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className={`h-[calc(100%/3-0.5rem)] cursor-pointer relative rounded-lg overflow-hidden ${
                      index === currentSlide ? 'ring-2 ring-teal-500' : ''
                    }`}
                    onClick={() => {
                      setCurrentSlide(index);
                    }}
                  >
                    <img 
                      src={image} 
                      alt={`Property thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    {index === currentSlide && (
                      <div className="absolute inset-0 bg-teal-500 bg-opacity-20"></div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Right arrow for thumbnail view */}
            {images.length > 1 && (
              <button
                onClick={() => changeSlide("right")}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Mobile thumbnails - horizontal scrolling */}
      {images.length > 1 && (
        <div className="md:hidden flex gap-2 mt-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`flex-shrink-0 w-16 h-16 cursor-pointer rounded-md overflow-hidden ${
                index === currentSlide ? 'ring-2 ring-teal-500' : 'opacity-70'
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <img 
                src={image} 
                alt={`Property thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;