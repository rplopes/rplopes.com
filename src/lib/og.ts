import satori from "satori";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { site } from "../../site.config";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const fontsDir = path.resolve("src/assets/fonts");
const interRegular = fs.readFileSync(path.join(fontsDir, "Inter-Regular.ttf"));
const interBold = fs.readFileSync(path.join(fontsDir, "Inter-Bold.ttf"));
const { light } = site.colors;

export async function renderOgImage(
  title: string,
  readTime: number,
): Promise<Uint8Array<ArrayBuffer>> {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: light.bg,
          fontFamily: "Inter",
          color: light.text,
        },
        children: [
          {
            type: "div",
            props: {
              style: { display: "flex", flexDirection: "column", gap: "24px" },
              children: [
                {
                  type: "div",
                  props: {
                    style: { fontSize: "36px", color: light.accent, fontWeight: 700 },
                    children: site.author,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: { fontSize: "72px", fontWeight: 700, lineHeight: 1.15 },
                    children: title,
                  },
                },
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "30px",
                color: light.textMuted,
              },
              children: [
                { type: "div", props: { children: `${readTime} min read` } },
                {
                  type: "div",
                  props: {
                    style: {
                      width: "64px",
                      height: "6px",
                      backgroundColor: light.accent,
                      borderRadius: "2px",
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
        { name: "Inter", data: interBold, weight: 700, style: "normal" },
      ],
    },
  );

  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  const result = new Uint8Array(buf.length);
  result.set(buf);
  return result;
}
