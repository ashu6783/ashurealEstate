import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const SplashScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    // Trigger initial animation after component mounts
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    // Start spinning animation after the initial animation completes
    const spinTimer = setTimeout(() => {
      setSpinning(true);
    }, 1500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(spinTimer);
    };
  }, []);

  // Define the spinning animation class
  const spinClass = spinning 
    ? "animate-spin-slow" 
    : "";

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#171b2c] to-[#4d4b1e]">
      {/* Custom spinning animation keyframes */}
      <style>{`
     
       
        
        /* Add a pulsing glow effect around the image */
        @keyframes glow {
          0% {
            box-shadow: 0 0 5px 0px rgba(255, 255, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.3);
          }
          100% {
            box-shadow: 0 0 5px 0px rgba(255, 255, 255, 0.5);
          }
        }
        .glow-effect {
          animation: glow 8s infinite ease-in-out;
          border-radius: 50%;
        }
      `}</style>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={`transition-all duration-1000 transform ${
            loaded ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Inner spinning element */}
            <div className={`${spinClass}`}>
              <img
                src="/landing.svg"
                alt="Landing"
                className="w-64 h-64 mb-8 glow-effect"
              />
            </div>
            
            {/* Optional: Decorative orbit elements */}
          
          </div>
        </div>

        <div
          className={`mt-6 transition-all duration-1000 delay-300 transform ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <button
            className={`flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-blue-900 shadow-lg transition-all duration-300 ${
              hovered
                ? "bg-opacity-100 px-10"
                : "bg-opacity-90 hover:bg-opacity-95"
            }`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => {
              // Toggle spinning on click as an added interaction
              setSpinning(prev => !prev);
            }}
          >
            Get Started
            <ArrowRight
              className={`ml-2 transition-all duration-300 ${
                hovered ? "translate-x-1" : ""
              }`}
              size={20}
            />
          </button>
        </div>
      </div>

      {/* Animated footer elements */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex justify-center space-x-6 py-6 transition-all duration-1000 delay-500 transform ${
          loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 cursor-pointer transition-all duration-300"
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
            onClick={() => {
              // Change spin direction or speed when dots are clicked
              setSpinning(prev => !prev);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;