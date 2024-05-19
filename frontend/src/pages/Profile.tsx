import { Appbar } from "../components/Appbar";
import { Avatar, BlogCard } from "../components/Blogcard";
import { useUserBlogs } from "../hooks/useUserBlogs";
import { SignInToView } from "./SignInView";
import { useAuth } from "../hooks/useAuth";
import { getUser } from "../utils";
import { UserType } from "../interface";

export const Profile = () => {
  const { isLoading, data: userBlogs, refetch } = useUserBlogs();
  const isLoggedIn = useAuth();
  const { username } = getUser(userBlogs);

  if (!isLoggedIn) {
    return (
      <>
        <SignInToView />
      </>
    );
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div>
        <Appbar />
      </div>
      <div className="grid w-full grid-cols-12 p-10">
        <div className="col-span-8 pl-20 flex flex-col items-center justify-center">
          {userBlogs.posts.map((post: UserType) => (
            <BlogCard
              id={post.id}
              isUser
              title={post.title}
              topic={post.topic}
              content={post.content}
              publishedDate={new Date(post.publishedDate)}
              refetch={refetch}
            />
          ))}
        </div>
        <div className="hidden lg:block border-l"></div>
        <div className="hidden lg:block">
          <div className="col-span-4  pt-5 cursor-pointer">
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
