import React, { createContext, useEffect, useState, useCallback } from "react";

// Define types for Cloudinary configuration and widget callback
interface CloudinaryUploadWidgetConfig {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
  sources?: string[];
  multiple?: boolean;
  [key: string]: any;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url?: string;
    public_id?: string;
  };
}

// Define props for UploadWidget
interface UploadWidgetProps {
  uwConfig: CloudinaryUploadWidgetConfig;
  setPublicId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setState: React.Dispatch<React.SetStateAction<string[]>>;
  onUploadComplete: () => void; // New callback to signal upload completion
}

// Define context type
interface CloudinaryScriptContextType {
  loaded: boolean;
}

const CloudinaryScriptContext = createContext<CloudinaryScriptContextType | undefined>(undefined);

const UploadWidget: React.FC<UploadWidgetProps> = ({ uwConfig, setPublicId, setState, onUploadComplete }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load Cloudinary script
  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.async = true;
        script.id = "uw";
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => {
          console.log("Cloudinary script loaded successfully");
          setLoaded(true);
        });
        script.addEventListener("error", () => {
          console.error("Failed to load Cloudinary script");
          setError("Failed to load Cloudinary widget");
          setLoaded(false);
        });
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  // Initialize Cloudinary widget
  const initializeCloudinaryWidget = useCallback(() => {
    if (!loaded || !window.cloudinary?.createUploadWidget) {
      console.error("Cloudinary widget not available. Loaded:", loaded);
      setError("Cloudinary widget not initialized");
      onUploadComplete(); // Reset uploading state even on error
      return;
    }

    console.log("Initializing Cloudinary widget with config:", uwConfig);
    const myWidget = window.cloudinary.createUploadWidget(
      uwConfig,
      (error: unknown, result: CloudinaryUploadResult) => {
        // Safely handle the error
        if (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error("Cloudinary upload error:", errorMessage);
          setError("Upload failed: " + errorMessage);
          setState((prev) => prev);
          onUploadComplete(); // Reset uploading state on error
          return;
        }

        if (result && result.event === "success" && result.info.secure_url) {
          console.log("Upload success. Image info:", result.info);
          const newUrl = result.info.secure_url;
          if (typeof newUrl === "string" && newUrl.startsWith("https://")) {
            setState((prev) => {
              if (prev.includes(newUrl)) return prev;
              const updatedState = [...prev, newUrl];
              console.log("Updated images state in UploadWidget:", updatedState);
              return updatedState;
            });
          } else {
            console.error("Invalid secure_url:", newUrl);
            setError("Invalid image URL received");
          }
          if (setPublicId && result.info.public_id) {
            setPublicId(result.info.public_id);
          }
          onUploadComplete(); // Reset uploading state on success
        } else {
          onUploadComplete(); // Reset uploading state if result is not a success
        }
      }
    );

    try {
      myWidget.open();
    } catch (err: any) {
      console.error("Failed to open Cloudinary widget:", err);
      setError("Failed to open upload widget");
      onUploadComplete(); // Reset uploading state on widget open failure
    }
  }, [loaded, uwConfig, setState, setPublicId, onUploadComplete]);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        onClick={initializeCloudinaryWidget}
        disabled={!loaded || !!error}
      >
        Upload
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </CloudinaryScriptContext.Provider>
  );
};

export default UploadWidget;
export { CloudinaryScriptContext };