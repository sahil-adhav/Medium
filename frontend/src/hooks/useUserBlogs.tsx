import { useQuery } from "react-query";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useUserBlogs = () => {
  return useQuery("userBlogs", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/profile`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data.blogs;
  });
};
