import * as R from "ramda";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { BlogType } from "../interface";

export const useLikeBlog = (blog: BlogType) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(blog.likes.length);

  const handleLike = async () => {
    const updatedLikes = isLiked
      ? R.reject((e) => e === blog.id, blog.likes)
      : R.append(blog.id, blog.likes);
    await axios.put(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
      likes: updatedLikes,
    });
    setIsLiked(true);
    isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
  };

  return { isLiked, handleLike, likes };
};
