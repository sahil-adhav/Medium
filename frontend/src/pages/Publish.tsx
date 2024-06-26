import { useState, useRef } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { useAuth } from "../hooks/useAuth";
import { SignInToView } from "./SignInView";

export const Publish = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const isLoggedIn = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");

  if (!isLoggedIn) {
    return (
      <>
        <SignInToView />
      </>
    );
  }

  async function sendPostReq() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
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
    navigate(`/blog/${response.data.id}`);
  }

  return (
    <div>
      <div>
        <Appbar fn={sendPostReq} />
      </div>
      <div>
        <div className="max-w-3xl mx-auto">
          <div className="mb-5">
            <div className="">
              <textarea
                id="large-input"
                className="block w-full mt-200 pt-4 text-gray-900  rounded-lg text-5xl focus-visible:outline-none font-serif resize-none overflow-hidden my-auto"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="mb-5">
              <input
                className="block w-full font-serif focus-visible:outline-none"
                placeholder="Topic"
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
              />
            </div>
            <div className="my-5">
              <label className="text-slate-400 italic text-xs">
                *Select preview image
              </label>
              <input
                className="block w-full text-lg font-serif p-1 text-gray-900 border rounded-lg cursor-pointer focus:outline-none"
                id="large_size"
                type="file"
              ></input>
            </div>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
