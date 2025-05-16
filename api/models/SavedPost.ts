import mongoose, { Schema, model } from "mongoose";
import { ISavedPost } from "../types";

const savedPostSchema = new Schema<ISavedPost>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

savedPostSchema.index({ userId: 1, postId: 1 }, { unique: true });

export default model<ISavedPost>("SavedPost", savedPostSchema);