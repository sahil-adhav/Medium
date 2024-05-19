import * as R from "ramda";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { BlogType } from "../interface";
import { useUserBlogs } from "./useUserBlogs";
import { getUser } from "../utils";

export const useLikeBlog = (blog: BlogType) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(blog.likes.length);

  const { data: userBlogs } = useUserBlogs();
  const { userId } = getUser(userBlogs);

  useEffect(() => {
    if (blog) {
      setIsLiked(blog.likes.includes(userId));
      setLikes(blog.likes.length);
    }
  }, [blog, userId]);

  const handleLike = async () => {
    const updatedLikes = isLiked
      ? R.reject((e) => e === userId, blog.likes)
      : R.append(userId, blog.likes);

    setIsLiked(!isLiked);
    setLikes(updatedLikes.length);

    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog/${blog.id}`,
        {
          id: blog.id,
          likes: updatedLikes,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      setIsLiked(isLiked);
      setLikes(blog.likes.length);
      console.error("Failed to update likes", error);
    }
  };

  return { isLiked, handleLike, likes };
};
