import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks/useBlog";
import { Avatar } from "../components/Blogcard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import ReactHtmlParser from "react-html-parser";
import { SignInToView } from "./SignInView";
import { BlogType } from "../interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandsClapping } from "@fortawesome/free-solid-svg-icons";
import { getFormattedDate, getTimeRequireToReadBlog } from "../utils";
import { useLikeBlog } from "../hooks/usLikeBlog";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, data: blog, error } = useBlog({ id: id || "" });

  console.log("blog : ", blog);

  if (error) {
    return (
      <>
        <SignInToView />
      </>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div>{blog && <BlogContent blog={blog} />}</div>
    </div>
  );
};

const BlogContent = ({ blog }: { blog: BlogType }) => {
  const date = getFormattedDate(blog.publishedDate);
  const minRead = getTimeRequireToReadBlog(blog.content);
  const { isLiked, handleLike, likes } = useLikeBlog(blog);
  return (
    <div className="flex justify-center w-full px-20 pt-300">
      <div className="max-w-screen-lg align-center">
        <div className="text-5xl font-extrabold pt-12">{blog.title}</div>
        <div className="pt-5 flex border-b border-slate-300 pb-5">
          <div>
            <Avatar height="h-12" width="w-12" />
          </div>
          <div className="pl-2  font-light">
            <div className="text-md">{blog.author.name}</div>
            <div className="text-sm">
              <span className="font-light pr-2">{`${minRead} min read`}</span>
              <span>·</span>
              <span className="pl-2">{date}</span>
            </div>
          </div>
        </div>
        <div className="border-b">
          <div
            className="text-slate-500 py-5 flex items-center"
            onClick={handleLike}
          >
            <div className="text-2xl">
              <FontAwesomeIcon
                icon={faHandsClapping}
                className={`${!isLiked ? "text-slate-300" : "text-slate-900"}`}
              />
            </div>
            <div className="text-md pl-2">{likes}</div>
          </div>
        </div>
        <div className="pt-10 font-sans text-xl">
          {ReactHtmlParser(blog.content)}
        </div>
      </div>
    </div>
  );
};
