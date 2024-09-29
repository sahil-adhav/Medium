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
  const finalCotent =
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
                    {ReactHtmlParser(finalCotent)}
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
      src="https://tinyurl.com/yun6r3tk"
      alt="R"
    ></img>
  );
};

const PreviewImg = () => {
  return <img src="https://tinyurl.com/yun6r3tk" />;
};
