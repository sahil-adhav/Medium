import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const finalCotent =
    content.length > 150 ? content.slice(0, 150) + "..." : content;
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex border-b pb-5 border-slate-200 w-screen max-w-screen-md cursor-pointer">
        <div className="flex-1 p-4">
          <div>
            <div>
              <div className="text-slate-600 flex space-x-2">
                <Avatar height="h-7" width="w-7" />
                <span className="">{authorName}</span> <span>·</span>
                <span className="text-slate-500 ">{publishedDate}</span>
              </div>
              <div className="font-extrabold text-3xl mt-4">{title}</div>
              <div className="text-slate-700">
                {ReactHtmlParser(finalCotent)}
              </div>
              <div className="text-slate-500 text-xs mt-5 italic">{`${Math.ceil(
                content.length / 100
              )} min read`}</div>
            </div>
          </div>
        </div>
        <div className="w-1/4 p-2 mr-3 justify-center items-center hidden md:flex">
          <PreviewImg />
        </div>
      </div>
    </Link>
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
      src="https://shorturl.at/imnU2"
      alt="Rounded avatar"
    ></img>
  );
};

const PreviewImg = () => {
  return <img src="https://shorturl.at/imnU2" />;
};
