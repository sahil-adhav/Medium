import * as R from "ramda";
import { UserType } from "./interface";

export const getUser = (userBlogs: UserType) => {
  const username = R.prop("username", userBlogs);
  const userId = R.prop("id", userBlogs);
  return { username, userId };
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
