import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

// Helper to log errors cleanly
const logError = (label: string, req: Request, err: unknown) => {
  console.error(`\n[${new Date().toISOString()}] ${label}`);
  console.error(`Path: ${req.path}`);
  console.error("Method:", req.method);
  console.error("Body:", req.body);
  console.error("Error Message:", (err as Error).message);
  console.error("Stack Trace:", (err as Error).stack);
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400).json({ message: "Username or email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    logError("Register Error", req, err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log(`[${new Date().toISOString()}] POST ${req.path} - Incoming body:`, req.body);

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const age = 1000 * 60 * 60 * 24 * 7; // 7 days
    const token = jwt.sign(
      { id: user._id.toString(), isAdmin: false },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: age }
    );

    const { password: _, ...userInfo } = user.toObject();

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    logError("Login Error", req, err);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req: Request, res: Response): void => {
  console.log(`[${new Date().toISOString()}] POST ${req.path} - Logout requested`);

  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout successful" });
};
