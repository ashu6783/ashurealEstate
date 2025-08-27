import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bedroom: {
    type: Number,
    required: true,
  },
  bathroom: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["rent", "buy","vacation"],
    default: "rent",
  },
  property: {
    type: String,
    enum: ["apartment", "house", "condo", "land"],
    default: "apartment",
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

export default mongoose.model("Post", postSchema);
