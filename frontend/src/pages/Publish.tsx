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
        <Appbar />
      </div>
      <div>
        <div className="max-w-3xl mx-auto">
          <div className="mb-5">
            <div className="">
              <input
                type="textarea"
                id="large-input"
                className="block break-all w-full  pt-4 text-gray-900  rounded-lg text-5xl focus-visible:outline-none font-serif"
                placeholder="Title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            {/* <textarea
              className=" text-gray-900 text-xl rounded-lg focus-visible:outline-none focus:border-gray-300 block w-full pt-5 placeholder-gray-400 font-serif"
              placeholder="Write your story..."
              rows={20}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            /> */}
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
            <button
              type="button"
              className="text-white bg-green-700  focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2  mr-4"
              onClick={sendPostReq}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
