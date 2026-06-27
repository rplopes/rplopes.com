import type { APIRoute, GetStaticPaths } from "astro";
import { getPublishedPosts } from "../../../lib/posts";
import { renderOgImage } from "../../../lib/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, readTime: post.readTime },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props.title, props.readTime);
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
