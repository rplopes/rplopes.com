import { execFileSync } from "node:child_process";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { estimateReadTime } from "./read-time";

type RawPost = CollectionEntry<"blog"> & { body: string };

export interface BlogPost extends RawPost {
  publishDate: Date;
  readTime: number;
}

const hasBody = (post: CollectionEntry<"blog">): post is RawPost => post.body != null;

const getPublishDate = (post: RawPost): Date => {
  if (post.data.publishedAt) return post.data.publishedAt;
  const date = execFileSync(
    "git",
    ["log", "--diff-filter=A", "--format=%aI", "--", `content/blog/${post.id}.md`],
    { encoding: "utf-8" },
  ).trim();
  if (!date)
    throw new Error(
      `No publish date for ${post.id}: set publishedAt in frontmatter or commit the file`,
    );
  return new Date(date);
};

const enrichPost = async (post: RawPost): Promise<BlogPost> => ({
  ...post,
  publishDate: getPublishDate(post),
  readTime: await estimateReadTime(post.body),
});

const loadPublishedPosts = async (): Promise<BlogPost[]> => {
  const posts = await Promise.all((await getCollection("blog")).filter(hasBody).map(enrichPost));

  return posts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
};

let publishedPostsPromise: Promise<BlogPost[]> | undefined;

export const getPublishedPosts = async (): Promise<BlogPost[]> => {
  publishedPostsPromise ??= loadPublishedPosts();
  return [...(await publishedPostsPromise)];
};
