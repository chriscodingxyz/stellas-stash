import getPostsAction from "@/server/actions/get-posts";
import Image from "next/image";

export default async function Home() {
  const { success, error } = await getPostsAction();

  if (error) {
    throw new Error(error);
  }

  if (success)
    return (
      <main>
        {success.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
      </main>
    );
}
