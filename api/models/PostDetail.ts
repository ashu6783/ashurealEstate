import mongoose, { Schema } from "mongoose";

const postDetailSchema = new Schema({
  desc: {
    type: String,
    required: true,
  },
  utilities: {
    type: String,
    enum: ["included", "excluded", "shared"],
  },
  pet: {
    type: String,
    enum: ["allowed", "not_allowed", "case_by_case"],
  },
  income: {
    type: String,
    enum: ["no", "yes"],
  },
  size: {
    type: Number,
  },
  school: {
    type: Number,
  },
  bus: {
    type: Number,
  },
  restaurant: {
    type: Number,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

export default mongoose.model("PostDetail", postDetailSchema);