import type { Request, Response } from "express";
import { Post } from "../models/post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).json(post);
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.json(post);
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.json({ message: "Post deleted" });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};