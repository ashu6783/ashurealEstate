import Card from "../card/card";
import { IPost } from "../../state/api";

interface PostListProps {
  posts: IPost[];
  emptyMessage?: React.ReactNode;
}

function PostList({ posts, emptyMessage }: PostListProps) {
  if (!posts || posts.length === 0) {
    return emptyMessage ? (
      <div className="flex justify-center items-center py-10">{emptyMessage}</div>
    ) : null;
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((item) => (
        <Card key={item._id} item={{ ...item, id: item._id }} />
      ))}
    </div>
  );
}

export default PostList;
