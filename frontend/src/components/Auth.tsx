import axios from "axios";
import { SignupInput } from "@advjr/medium-package";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InputType } from "../interface";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [blogInputs, setBlogInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequests() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        blogInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const errMsg = e.response?.data?.error;
      return toast.error(errMsg ? errMsg : "Something went wrong!");
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center text-center">
        <div>
          <div>
            <div className="">
              <div className="text-3xl font-extrabold">
                Start Writing Your Blog Today!
              </div>
              <div className="font-extralight text-slate-400">
                {type === "signup"
                  ? "Already have an account?"
                  : "Don't have an account"}
                <Link
                  className="underline pl-2"
                  to={type === "signup" ? "/signin" : "/signup"}
                >
                  {type === "signup" ? "Sign in" : "Sign up"}
                </Link>
              </div>
            </div>
          </div>

          <div className="text-left mt-10">
            <InputBox
              label="Username"
              placeholder="Enter your username"
              onChange={(e) => {
                setBlogInputs({
                  ...blogInputs,
                  username: e.target.value,
                });
              }}
            />
            {type === "signup" ? (
              <>
                <InputBox
                  label="Email"
                  placeholder="abc@example.com"
                  onChange={(e) => {
                    setBlogInputs({
                      ...blogInputs,
                      name: e.target.value,
                    });
                  }}
                />
                <label className="block mt-2 mb-1 text-gray-700 text-lg font-medium">
                  Upload Profile Image
                </label>
                <input
                  className="block w-full text-lg font-serif p-1 text-gray-900 border rounded-lg cursor-pointer focus:outline-none"
                  id="large_size"
                  type="file"
                ></input>
              </>
            ) : null}
            <InputBox
              label="Password"
              placeholder=""
              type={"password"}
              onChange={(e) => {
                setBlogInputs({
                  ...blogInputs,
                  password: e.target.value,
                });
              }}
            />
            <button
              type="button"
              onClick={sendRequests}
              className="w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {type === "signin" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputBox = ({ label, placeholder, onChange, type }: InputType) => {
  return (
    <div>
      <label className="block mt-2 mb-1 text-gray-700 text-lg font-medium">
        {label}
      </label>
      <input
        id="first_name"
        onChange={onChange}
        className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none focus:border-gray-300 block w-full p-2.5 placeholder-gray-400"
        placeholder={placeholder}
        type={type}
        required
      />
    </div>
  );
};
