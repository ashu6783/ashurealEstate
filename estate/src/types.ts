// types.ts or similar file
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface Post {
  _id: string;
  title: string;
  price: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  latitude: string;
  longitude: string;
  type: "buy" | "rent";
  property: "apartment" | "house" | "condo" | "land";
  userId: {
    username: string;
    avatar?: string;
  };
  postDetail?: {
    desc: string;
    utilities?: string;
    pet?: string;
    income?: string;
    size?: number;
    school?: number;
    bus?: number;
    restaurant?: number;
  };
  isSaved?: boolean;
}