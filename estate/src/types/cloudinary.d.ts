// cloudinary.d.ts
declare global {
    interface CloudinaryWidgetResult {
      event: string;
      info: {
        secure_url: string;
        public_id: string;
      };
    }
  
    interface CloudinaryWidget {
      open: () => void;
    }
  
    interface Cloudinary {
      createUploadWidget(
        options: object,
        callback: (error: unknown, result: CloudinaryWidgetResult) => void
      ): CloudinaryWidget;
    }
  
    interface Window {
      cloudinary: Cloudinary;
    }
  }
  
  export {};
  