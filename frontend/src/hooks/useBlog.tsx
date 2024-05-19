import { useQuery } from "react-query";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBlog = ({ id }: { id: string }) => {
  return useQuery("blog", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    return response.data.blog;
  });
};
