import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Post from "../models/Post";
import SavedPost from "../models/SavedPost";
import PostDetail from "../models/PostDetail";
import User from "../models/User";

// Define the AuthenticatedRequest interface once
interface AuthenticatedRequest extends Request {
  userId?: string;
}




export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { city, type, property, bedroom, bathroom, minPrice, maxPrice } = req.query;
    console.log("getPosts query params:", req.query);

    // Build filters
    const filters: any = {};
    if (city) filters.city = { $regex: String(city), $options: "i" };
    if (type) filters.type = { $regex: String(type), $options: "i" };
    if (property) filters.property = { $regex: String(property), $options: "i" };
    if (bedroom) filters.bedroom = { $gte: Number(bedroom) }; // Range-based filtering
    if (bathroom) filters.bathroom = { $gte: Number(bathroom) }; // Range-based filtering
    // Relaxed coordinate validation (non-empty strings)
    filters.latitude = { $exists: true, $ne: null };
    filters.longitude = { $exists: true, $ne: null };
    if (minPrice || maxPrice) {
      filters.price = {
        $gte: minPrice ? Number(minPrice) : 0,
        $lte: maxPrice ? Number(maxPrice) : 100000000,
      };
    }

    console.log("Fetching posts with filters:", filters);
    const posts = await Post.find(filters).exec();
    console.log("Found posts:", posts);

    res.status(200).json(posts);
  } catch (error: any) {
    console.error("Error in getPosts:", error.message, error.stack);
    res.status(500).json({ message: "Failed to get posts", error: error.message });
  }
};



// Get a single post by ID
export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = req.params.id;
    console.log("Fetching post with ID:", postId);

    // Validate the postId format
    if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid post ID format" });
      return;
    }

    // Find the post and populate the userId field
    const post = await Post.findById(postId).populate("userId");
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Manually fetch the associated PostDetail
    const postDetail = await PostDetail.findOne({ postId: post._id });
    console.log("Found post detail:", postDetail);

    // Combine the post and postDetail into the response
    const postWithDetails = {
      ...post.toObject(),
      postDetail: postDetail || null, // Include postDetail, or null if not found
    };

    console.log("Returning post with details:", postWithDetails);
    res.status(200).json(postWithDetails);
  } catch (error: any) {
    console.error("Error in getPost:", error.message, error.stack);
    res.status(500).json({ message: "Server error while fetching post", error: error.message });
  }
};

// Add a new post
export const addPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    console.log("User ID from token:", userId);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID not found" });
      return;
    }

    // Validate userId format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid user ID format" });
      return;
    }

    const user = await User.findById(userId);
    console.log("Found user:", user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { postData, postDetail } = req.body;
    console.log("Received payload:", req.body);

    // Validate required fields
    if (
      !postData ||
      !postData.title ||
      !postData.price ||
      !postData.address ||
      !postData.city ||
      !postData.bedroom ||
      !postData.bathroom ||
      !postData.latitude ||
      !postData.longitude ||
      !postData.images ||
      postData.images.length === 0
    ) {
      res.status(400).json({ message: "Missing required fields in postData" });
      return;
    }

    if (!postDetail || !postDetail.desc) {
      res.status(400).json({ message: "Description is required in postDetail" });
      return;
    }

    // Ensure latitude and longitude are strings
    postData.latitude = String(postData.latitude);
    postData.longitude = String(postData.longitude);

    // Create new Post
    const newPost = new Post({
      ...postData,
      userId,
    });

    console.log("Saving new post:", newPost);
    const savedPost = await newPost.save();
    console.log("Saved post:", savedPost);

    // Create new PostDetail
    const newPostDetail = new PostDetail({
      ...postDetail,
      postId: savedPost._id,
    });

    console.log("Saving new post detail:", newPostDetail);
    const savedPostDetail = await newPostDetail.save();
    console.log("Saved post detail:", savedPostDetail);

    res.status(201).json(savedPost);
  } catch (error: any) {
    console.error("Error in addPost:", error.message, error.stack);
    res.status(500).json({ message: "Server error while creating post", error: error.message });
  }
};

// Update an existing post
export const updatePost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = req.params.id;
    const tokenUserId = req.userId;

    console.log("Updating post with ID:", postId);
    console.log("User ID from token:", tokenUserId);

    if (!tokenUserId) {
      res.status(401).json({ message: "Unauthorized: User ID not found" });
      return;
    }

    // Validate IDs
    if (!postId.match(/^[0-9a-fA-F]{24}$/) || !tokenUserId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid post ID or user ID format" });
      return;
    }

    const post = await Post.findById(postId).exec();
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Check if the user is authorized to update the post
    if (post.userId.toString() !== tokenUserId) {
      res.status(403).json({ message: "Not authorized to update this post" });
      return;
    }

    const { postData, postDetail } = req.body;
    console.log("Update payload:", req.body);

    // Update Post
    if (postData) {
      // Ensure latitude and longitude are strings if provided
      if (postData.latitude) postData.latitude = String(postData.latitude);
      if (postData.longitude) postData.longitude = String(postData.longitude);
      Object.assign(post, postData);
      await post.save();
    }

    // Update PostDetail if provided
    if (postDetail) {
      const existingPostDetail = await PostDetail.findOne({ postId: post._id });
      if (existingPostDetail) {
        Object.assign(existingPostDetail, postDetail);
        await existingPostDetail.save();
        console.log("Updated post detail:", existingPostDetail);
      } else {
        // If PostDetail doesn't exist, create a new one
        const newPostDetail = new PostDetail({
          ...postDetail,
          postId: post._id,
        });
        await newPostDetail.save();
        console.log("Created new post detail:", newPostDetail);
      }
    }

    // Fetch the updated post and postDetail for the response
    const updatedPost = await Post.findById(postId).populate("userId");
    const updatedPostDetail = await PostDetail.findOne({ postId: postId });
    const postWithDetails = {
      ...updatedPost!.toObject(),
      postDetail: updatedPostDetail || null,
    };

    console.log("Returning updated post with details:", postWithDetails);
    res.status(200).json(postWithDetails);
  } catch (error: any) {
    console.error("Error in updatePost:", error.message, error.stack);
    res.status(500).json({ message: "Failed to update post", error: error.message });
  }
};

// Delete a post
export const deletePost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const postId = req.params.id;
    const tokenUserId = req.userId;

    console.log("Deleting post with ID:", postId);
    console.log("User ID from token:", tokenUserId);

    if (!tokenUserId) {
      res.status(401).json({ message: "Unauthorized: User ID not found" });
      return;
    }

    // Validate IDs
    if (!postId.match(/^[0-9a-fA-F]{24}$/) || !tokenUserId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid post ID or user ID format" });
      return;
    }

    const post = await Post.findById(postId).exec();
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Check if the user is authorized to delete the post
    if (post.userId.toString() !== tokenUserId) {
      res.status(403).json({ message: "Not authorized to delete this post" });
      return;
    }

    // Delete the associated PostDetail
    await PostDetail.deleteOne({ postId: post._id });
    console.log("Deleted associated post detail for post ID:", postId);

    // Delete any associated SavedPost entries
    await SavedPost.deleteMany({ postId: post._id });
    console.log("Deleted associated saved posts for post ID:", postId);

    // Delete the Post
    await Post.deleteOne({ _id: postId });
    console.log("Deleted post with ID:", postId);

    res.status(200).json({ message: "Post and associated data deleted successfully" });
  } catch (error: any) {
    console.error("Error in deletePost:", error.message, error.stack);
    res.status(500).json({ message: "Failed to delete post", error: error.message });
  }
};