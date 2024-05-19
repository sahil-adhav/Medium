import { useState } from "react";
import * as R from "ramda";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "./Blogcard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppbarProps } from "../interface";

export const Appbar = ({ fn }: AppbarProps) => {
  const url = window.location.href;
  const navigate = useNavigate();
  const onPublishPage = R.includes("publish", url);
  const onEditPage = R.includes("edit", url);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="text-3xl font-bold cursor-pointer">
        <Link to={"/"}>Medium</Link>
      </div>
      <div className="flex items-center">
        {!onEditPage ? (
          <Link to={"/publish"}>
            {onPublishPage && (
              <button
                type="button"
                onClick={onPublishPage ? fn : undefined}
                className="text-white bg-green-700 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2  mr-4"
              >
                Publish
              </button>
            )}
            {isLoggedIn && !onPublishPage && (
              <button
                type="button"
                className=" text-slate-500 focus:outline-none font-light rounded-full text-md px-5 py-2.5 text-center me-2 mb-2  mr-4"
              >
                <FontAwesomeIcon icon={faPenToSquare} /> Write
              </button>
            )}
          </Link>
        ) : (
          <Link to={"/blogs"}>
            <button
              type="button"
              onClick={onEditPage ? fn : undefined}
              className="text-white bg-green-700 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2  mr-4"
            >
              Re-Publish
            </button>
          </Link>
        )}
        {/* Avatar dropdown */}
        {isLoggedIn && (
          <div className="relative">
            <button
              id="avatarDropdown"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="focus:outline-none"
            >
              <Avatar height="h-10" width="w-10" />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li>
                    <Link
                      to={"/profile"}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200 focus:outline-none"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
