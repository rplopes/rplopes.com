import type { APIRoute } from "astro";
import { site } from "../../site.config";
import { getPublishedPosts } from "../lib/posts";

export const GET: APIRoute = async ({ site: siteUrl }) => {
  const baseUrl = siteUrl!.href.replace(/\/$/, "");
  const posts = await getPublishedPosts();

  const postList = posts
    .map((post) => `- [${post.data.title}](${baseUrl}/blog/${post.id}): ${post.data.description}`)
    .join("\n");

  const body = `# ${site.title}

> ${site.description}

## Blog Posts

${postList}

## Feeds

- [RSS Feed](${baseUrl}/blog/rss.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
