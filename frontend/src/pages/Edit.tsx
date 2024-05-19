import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useAuth } from "../hooks/useAuth";
import { SignInToView } from "./SignInView";
import { useBlog } from "../hooks/useBlog";

export const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data: blog } = useBlog({ id: id || "" });
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { title, topic, content } = blog;
        setTitle(title);
        setTopic(topic);
        setContent(content);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blog]);

  const sendPutReq = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/blog/${id}`,
        {
          id,
          title,
          topic,
          content,
          publishedDate: Date.now(),
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const config = {
    placeholder: "Write your story....",
    readonly: false,
  };

  const isLoggedIn = useAuth();

  if (!isLoggedIn) {
    return (
      <>
        <SignInToView />
      </>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Appbar fn={sendPutReq} />
      </div>
      <div>
        <div className="max-w-3xl mx-auto">
          <div className="mb-5">
            <div className="">
              <textarea
                id="large-input"
                className="block w-full mt-200 pt-4 text-gray-900  rounded-lg text-5xl focus-visible:outline-none font-serif resize-none overflow-hidden my-auto"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-5">
              <input
                className="block w-full font-serif focus-visible:outline-none"
                placeholder="Topic"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
              />
            </div>
            <JoditEditor
              ref={editor}
              config={config}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
