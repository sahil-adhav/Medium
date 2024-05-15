import { useState, useRef } from "react";
import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

export const Publish = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function sendPostReq() {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/blog`,
      {
        title,
        content,
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
                className="block w-full mt-200 pt-4 text-gray-900  rounded-lg text-5xl focus-visible:outline-none font-serif resize-none overflow-hidden"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
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
