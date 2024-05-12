import { BlogCard } from "../components/Blogcard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import { CardSkeleton } from "../components/CardSkeleton";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className=" justify-center">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate="16 Nov 2023"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
