import { createPostAction, getPostsAction } from "@/server/actions/actions";
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
        <form action={createPostAction}>
          <input
            type="text"
            name="title"
            className="text-black"
            placeholder="title"
          />
          <button type="submit">Submit</button>
        </form>
      </main>
    );
}
