import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import ReactHtmlParser from "react-html-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { BlogCardProps } from "../interface";
import { getFormattedDate, getTimeRequireToReadBlog } from "../utils";

export const BlogCard = ({
  id,
  authorName,
  title,
  topic,
  content,
  isUser,
  refetch,
  publishedDate,
}: BlogCardProps) => {
  const finalContent =
    content.length > 150 ? content.slice(0, 150) + "..." : content;
  const date = getFormattedDate(publishedDate);

  const minRead = getTimeRequireToReadBlog(content);

  async function deleteRequest() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token not found.");
      }

      const response = await axios.delete(`${BACKEND_URL}/api/v1/profile`, {
        headers: {
          Authorization: token,
        },
        data: {
          id,
        },
      });
      if (refetch) refetch();
      console.log("Blog deleted successfully:", response.data);
    } catch (e) {
      console.error("Error deleting blog");
    }
  }

  return (
    <>
      <div className="flex border-b pb-5 border-slate-200 w-screen max-w-screen-md cursor-pointer">
        <div className="flex-1 p-4">
          <div>
            <div>
              <Link to={`/blog/${id}`}>
                <div>
                  {!isUser && (
                    <div className="text-slate-600 flex space-x-2">
                      <Avatar height="h-7" width="w-7" />
                      <span className="">{authorName}</span> <span>·</span>
                      <span className="text-slate-500">{date}</span>
                    </div>
                  )}
                  <div className="font-extrabold text-3xl mt-4">{title}</div>
                  <div className="text-slate-700">
                    {ReactHtmlParser(finalContent)}
                  </div>
                </div>
              </Link>

              <div className="flex items-center justify-between mt-5">
                {
                  <div className="text-slate-900 font-semibold rounded p-1  bg-slate-200 text-xs ">
                    {topic}
                  </div>
                }
                <div className="mr-auto ml-2 text-slate-500 text-xs italic">{`${minRead} min read`}</div>
                {isUser && (
                  <div className="flex items-center">
                    <div className="ml-auto">
                      <Link to={`/blog/edit/${id}`}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                    </div>
                    <div className="ml-5" onClick={deleteRequest}>
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-2 mr-3 justify-center items-center hidden md:flex">
          <PreviewImg />
        </div>
      </div>
    </>
  );
};

export const Avatar = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => {
  return (
    <img
      className={`${height} ${width} rounded-full mr-2`}
      src="data:image/png;base64,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"
      alt="R"
    ></img>
  );
};

const PreviewImg = () => {
  return (
    <img src="data:image/png;base64,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" />
  );
};
