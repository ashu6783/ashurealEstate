export interface User {
  _id: string;
  username: string;
  email: string;
  accountType: string;
  avatar?: string;
}

export interface PostDetail {
  desc: string;
  utilities?: "included" | "excluded" | "shared";
  pet?: "allowed" | "not_allowed" | "case_by_case";
  income?: "no" | "yes";
  size?: number;
  school?: number;
  bus?: number;
  restaurant?: number;
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
  userId: Pick<User, "username" | "avatar">;
  postDetail?: PostDetail;
  isSaved?: boolean;
}