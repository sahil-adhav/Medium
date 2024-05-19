import * as R from "ramda";
import { BlogCard } from "../components/Blogcard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks/useBlogs";
import { CardSkeleton } from "../components/CardSkeleton";
import { Blog } from "../interface";
import { Error404 } from "./404";

export const Blogs = () => {
  const { isLoading, data, error } = useBlogs();
  const reversedBlogs: Blog[] = R.when(
    R.both(R.is(Array), R.complement(R.isEmpty)),
    R.reverse
  )(data || []) as Blog[];

  if (isLoading) {
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

  if (error) {
    return <Error404 />;
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="justify-center">
          {reversedBlogs.map((blog: Blog) => (
            <BlogCard
              id={blog.id}
              key={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              topic={blog.topic}
              content={blog.content}
              publishedDate={new Date(blog.publishedDate)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
