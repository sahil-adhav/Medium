import * as R from "ramda";
import { Link } from "react-router-dom";
import { Avatar } from "./Blogcard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface AppbarProps {
  fn?: () => void;
}

export const Appbar = ({ fn }: AppbarProps) => {
  const url = window.location.href;

  const onPublishPage = R.includes("publish", url);
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div className="text-3xl font-bold cursor-pointer">
        <Link to={"/"}>Medium</Link>
      </div>
      <div className="flex">
        <Link to={"/publish"}>
          <button
            type="button"
            onClick={onPublishPage ? fn : undefined}
            className="text-white bg-green-700  focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2  mr-4"
          >
            {onPublishPage ? (
              "Publish"
            ) : (
              <span>
                <FontAwesomeIcon icon={faPenToSquare} /> Write
              </span>
            )}
          </button>
        </Link>

        <Avatar height="h-10" width="w-10" />
      </div>
    </div>
  );
};
