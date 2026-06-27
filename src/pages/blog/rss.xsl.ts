import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const xsl = `<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="color-scheme" content="light dark"/>
        <title>RSS Feed — <xsl:value-of select="/rss/channel/title"/></title>
        <link rel="stylesheet" href="/document.css"/>
        <style type="text/css">
          .banner {
            background: var(--bg-subtle);
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            padding: 1rem 1.25rem;
            margin-bottom: 2rem;
            font-size: 0.9rem;
            color: var(--text-muted);
          }
          .banner strong { color: var(--text); }
          .banner p:last-child { margin-bottom: 0; }
          header h1 { display: flex; align-items: center; gap: 0.5rem; }
          header p { color: var(--text-muted); margin-top: 0.25rem; }
          header nav { margin-top: 0.5rem; }
          ul { list-style: none; padding-left: 0; }
          li {
            padding: 1rem 0;
            border-bottom: 1px solid var(--border);
          }
          li h3 { font-size: 1.25rem; }
          li h3 a { text-decoration: none; }
          li h3 a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="banner">
          <p>
            <strong>This is an RSS feed.</strong> Subscribe by copying the URL into your reader.
          </p>
          <p>
            Visit <a href="https://aboutfeeds.com">About Feeds</a> to learn more about RSS.
          </p>
        </div>
        <header>
          <h1>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 1.2em; height: 1.2em; flex-shrink: 0;" viewBox="0 0 256 256">
              <defs>
                <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
                  <stop offset="0.0" stop-color="#E3702D"/><stop offset="0.1071" stop-color="#EA7D31"/>
                  <stop offset="0.3503" stop-color="#F69537"/><stop offset="0.5" stop-color="#FB9E3A"/>
                  <stop offset="0.7016" stop-color="#EA7C31"/><stop offset="0.8866" stop-color="#DE642B"/>
                  <stop offset="1.0" stop-color="#D95B29"/>
                </linearGradient>
              </defs>
              <rect width="256" height="256" rx="55" ry="55" x="0" y="0" fill="#CC5D15"/>
              <rect width="246" height="246" rx="50" ry="50" x="5" y="5" fill="#F49C52"/>
              <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
              <circle cx="68" cy="189" r="24" fill="#FFF"/>
              <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
              <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
            </svg>
            <xsl:value-of select="/rss/channel/title"/> RSS Feed
          </h1>
          <xsl:if test="/rss/channel/description">
            <p><xsl:value-of select="/rss/channel/description"/></p>
          </xsl:if>
          <nav>
            <a>
              <xsl:attribute name="href">
                <xsl:value-of select="/rss/channel/link"/>
              </xsl:attribute>
              Visit Blog
            </a>
          </nav>
        </header>
        <main>
          <h2>All Posts</h2>
          <ul>
            <xsl:for-each select="/rss/channel/item">
              <li>
                <h3>
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="link"/>
                    </xsl:attribute>
                    <xsl:value-of select="title"/>
                  </a>
                </h3>
                <span class="meta">
                  <xsl:value-of select="pubDate"/>
                </span>
              </li>
            </xsl:for-each>
          </ul>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

  return new Response(xsl, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
