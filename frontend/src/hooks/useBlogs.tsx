import axios from "axios";
import { BACKEND_URL } from "../config";
import { useQuery } from "react-query";

export const useBlogs = () => {
  return useQuery("blogs", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data.blogs;
  });
};
