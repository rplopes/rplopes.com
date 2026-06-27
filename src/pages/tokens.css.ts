import type { APIRoute } from "astro";
import { site } from "../../site.config";

const { light, dark } = site.colors;

export const GET: APIRoute = () => {
  const css = `:root {
  --accent: ${light.accent};
  --text: ${light.text};
  --text-muted: ${light.textMuted};
  --bg: ${light.bg};
  --bg-subtle: ${light.bgSubtle};
  --border: ${light.border};
  --mark: ${light.mark};
}

@media (prefers-color-scheme: dark) {
  :root {
    --accent: ${dark.accent};
    --text: ${dark.text};
    --text-muted: ${dark.textMuted};
    --bg: ${dark.bg};
    --bg-subtle: ${dark.bgSubtle};
    --border: ${dark.border};
    --mark: ${dark.mark};
  }
}
`;

  return new Response(css, {
    headers: { "Content-Type": "text/css" },
  });
};
