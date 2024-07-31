"use server";

import { db } from "@/server";

export default async function getPostsAction() {
  const posts = await db.query.posts.findMany();

  if (!posts) {
    return { error: "No posts found buddy" };
  }
  return { success: posts };
}
