import Card from "../card/card";
import { IPost } from "../../state/api";


interface ListProps {
  posts: IPost[];
}

function List({ posts }: ListProps) {
  return (
    <div className="flex flex-col gap-[50px]">
      {posts.map((item) => (
        <Card key={item._id} item={{ ...item, id: item._id }} />
      ))}
    </div>
  );
}

export default List;
