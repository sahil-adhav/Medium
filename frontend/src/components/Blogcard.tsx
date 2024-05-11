interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <>
      <div className="flex">
        <div className="flex-1 pr-4">
          <div>
            <div>
              <div>
                {authorName} · {publishedDate}
              </div>
              <div>{title}</div>
              <div>
                {content.length > 150 ? content.slice(0, 150) + "..." : content}
              </div>
              <div>{`${Math.ceil(content.length / 100)} min read`}</div>
            </div>
          </div>
        </div>
        <div className="w-1/6 p-2">
          <img src="https://shorturl.at/imnU2" />
        </div>
      </div>
      <div className="bg-slate-200 h-0.5 mt-5"></div>
    </>
  );
};
