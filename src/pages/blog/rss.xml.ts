import type { APIRoute } from "astro";
import { site } from "../../../site.config";
import { getPublishedPosts } from "../../lib/posts";

export const GET: APIRoute = async ({ site: siteUrl }) => {
  const baseUrl = siteUrl!.href.replace(/\/$/, "");
  const posts = await getPublishedPosts();

  const items = posts
    .map((post) => {
      const path = `/blog/${post.id}`;
      return `    <item>
      <title>${escapeXml(post.data.title)}</title>
      <link>${baseUrl}${path}</link>
      <guid>${baseUrl}${path}</guid>
      <description>${escapeXml(post.data.description)}</description>
      <pubDate>${post.publishDate.toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/blog/rss.xsl" type="text/xsl"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
