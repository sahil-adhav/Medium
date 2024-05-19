import * as R from "ramda";
import { UserType } from "./interface";

export const getUserName = (userBlogs: UserType[]) => {
  return R.path(["posts", 0, "author", "username"], userBlogs) as string;
};

export const getFormattedDate = (publishedDate: Date) => {
  const date = new Date(publishedDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  return date;
};

export const getTimeRequireToReadBlog = (content: string) => {
  const array = R.split(/\s+/, content.trim());
  return Math.ceil(R.length(array) / 300);
};
