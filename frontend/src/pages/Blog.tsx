import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlog, useBlogs } from "../hooks/useBlogs";
import { BlogType } from "../hooks/useBlogs";
import { Avatar } from "../components/Blogcard";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || "" });
  const { blogs } = useBlogs();

  if (loading) {
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
      <div>{blog && <BlogContent blog={blog} blogs={blogs} />}</div>
    </div>
  );
};

const BlogContent = ({ blog }: { blog: BlogType; blogs: BlogType[] }) => {
  return (
    <div className="grid grid-cols-12 w-full px-10 pt-300">
      <div className="col-span-8">
        <div className="text-5xl font-extrabold pt-12">{blog.title}</div>
        <div className="pt-5 flex border-b border-slate-300 pb-5">
          <div>
            <Avatar height="h-12" width="w-12" />
          </div>
          <div className="pl-2  font-light">
            <div className="text-md">{blog.author.name}</div>
            <div className="text-sm">
              <span className="font-light pr-2">{`${Math.ceil(
                blog.content.length / 100
              )} min read`}</span>
              <span>·</span>
              <span className="pl-2">16 Nov 2023</span>
            </div>
          </div>
        </div>
        <div className="pt-10 font-sans text-xl">{blog.content}</div>
      </div>
      <div className="col-span-4 justify-center flex items-center">
        Blogs by the author
      </div>
    </div>
  );
};
