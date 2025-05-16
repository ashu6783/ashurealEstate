import { useState } from 'react'

// Define the type for images
interface SliderProps {
  images: string[]; // Array of strings (URLs for the images)
}

function Slider({ images }: SliderProps) {
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  const changeSlide = (direction: string) => {
    if (imageIndex === null) return; // Prevent further execution if imageIndex is null.

    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="relative w-full h-[350px] flex gap-5">
      {imageIndex != null && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-black flex justify-between items-center z-50">
          <div className="flex items-center justify-center w-1/12 cursor-pointer" onClick={() => changeSlide("left")}>
            <img src="/arrow.png" alt="left arrow" className="w-12 md:w-8 sm:w-5" />
          </div>
          <div className="flex-10">
            <img src={images[imageIndex]} alt="slider image" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center justify-center w-1/12 cursor-pointer" onClick={() => changeSlide("right")}>
            <img src="/arrow.png" alt="right arrow" className="w-12 md:w-8 sm:w-5 transform rotate-180" />
          </div>
          <div className="absolute top-0 right-0 text-white text-4xl font-bold p-12 cursor-pointer" onClick={() => setImageIndex(null)}>X</div>
        </div>
      )}
      <div className="flex-3">
        <img src={images[0]} alt="big image" className="w-full h-full object-cover rounded-lg cursor-pointer" onClick={() => setImageIndex(0)} />
      </div>
      <div className="flex-1 flex flex-col gap-5 justify-between">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt={`small image ${index + 1}`}
            key={index}
            className="h-[100px] object-cover cursor-pointer rounded-lg"
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
