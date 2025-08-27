"use client";
import { useEffect, useState } from "react";
import { AuroraBackground } from "./ui/AuroraBackground";

const SplashScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setLoaded(true);
    }, 300);

    const spinTimer = setTimeout(() => {
      setSpinning(true);
    }, 1500);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(spinTimer);
    };
  }, []);

  const spinClass = spinning ? "animate-spin-slow" : "";

  return (
    <AuroraBackground className="relative w-full h-screen overflow-hidden">
      <style>{`
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={`transition-all duration-1000 transform ${
            loaded ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
        >
          <div className="relative flex items-center justify-center">
            <div className={`${spinClass}`}>
              <img
                src="/landing.svg"
                alt="Landing"
                className="w-64 h-64 mb-8 glow-effect"
              />
            </div>
          </div>
        </div>

        <div
          className={`mt-12 transition-all duration-1000 delay-300 transform ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="bg-black/60 text-white px-6 py-3 rounded-2xl backdrop-blur-sm">
            Getting Ready...
          </span>
        </div>
      </div>
    </AuroraBackground>
  );
};

export default SplashScreen;
