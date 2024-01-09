import { Request, Response } from "express";
import Post, { IPost } from "../models/postModel";

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: IPost[] = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const seq = req.params.seq;
    const post: IPost | null = await Post.findById(seq);
    if (!post) {
      res.status(404).send("wrong url");
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const newPost: IPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const seq = req.params.seq;
    const { title, content } = req.body;
    const updatedPost: IPost | null = await Post.findByIdAndUpdate(
      seq,
      { title, content },
      { new: true }
    );
    if (!updatedPost) {
      res.status(404).send("wrong url");
      return;
    }
    res.status(200).json(updatedPost);
  } catch (error: any) {
    console.error(error);
    // switch (error.status) {
    //   case 400:
    //     res.status(400).send("bad request");
    //     break;
    //   case 500:
    //     res.status(500).send(error);
    //     break;
    // }
  }
};
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const seq = req.params.seq;
    const deletedPost = await Post.findByIdAndDelete(seq);
    if (!deletedPost) {
      res.status(404).send("wrong url");
      return;
    }
    res.status(204).json(deletedPost);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error);
  }
};
