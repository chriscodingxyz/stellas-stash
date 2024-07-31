"use server";

import { db } from "@/server";
import { posts } from "@/server/schema";
import { revalidatePath } from "next/cache";

export async function getPostsAction() {
  const posts = await db.query.posts.findMany();

  if (!posts) {
    return { error: "No posts found buddy" };
  }
  return { success: posts };
}

export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  if (!title) {
    return { error: "Title is required" };
  }

  const newPost = await db.insert(posts).values({ title: title }).returning();

  if (!newPost) {
    return { error: "Unable to create post" };
  }
  revalidatePath("/");

  return { success: newPost };
}
