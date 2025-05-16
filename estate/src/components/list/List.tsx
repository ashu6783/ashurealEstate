import Card from "../card/card";

interface Post {
  _id: string;
  title: string;
  images: string[];
  address: string;
  price: number;
  bedroom: number;
  bathroom: number;
  // Add more properties if your `item` has them
}

interface ListProps {
  posts: Post[];
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
