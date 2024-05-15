import * as R from "ramda";
import { Appbar } from "../components/Appbar";
import { Avatar, BlogCard } from "../components/Blogcard";
import { useUserBlogs } from "../hooks/useBlogs";

export const Profile = () => {
  const { loading, blogs } = useUserBlogs();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const username = R.path(["posts", 0, "author", "username"], blogs) as string;

  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="grid w-full lg:grid-cols-12 p-10">
        <div className="col-span-8 pl-20">
          {blogs.posts.map(
            (post: { id: string; title: string; content: string }) => (
              <BlogCard
                id={post.id}
                isUser
                title={post.title}
                content={post.content}
                publishedDate="16 Nov 2023"
              />
            )
          )}
        </div>
        <div className="border-l"></div>
        <div className="">
          <div className="col-span-4  pt-5">
            <Avatar height="h-24" width="h-24" />
          </div>
          <div className="text-slate-800 pt-5 justify-center">{username}</div>
          <div className="text-slate-400 text-xs pt-1 justify-center">
            22 followers
          </div>
        </div>
      </div>
    </div>
  );
};
