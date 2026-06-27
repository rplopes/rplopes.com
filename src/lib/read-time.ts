import { createSatteriMarkdownProcessor } from "@astrojs/markdown-satteri";

const WORDS_PER_MINUTE = 230;

const countWords = (text: string): number => text.match(/\S+/g)?.length ?? 0;

export const estimateReadTime = async (markdown: string): Promise<number> => {
  const readableTextChunks: string[] = [];
  const processor = await createSatteriMarkdownProcessor({
    syntaxHighlight: false,
    mdastPlugins: [
      {
        name: "collect-readable-text",
        paragraph(node, ctx) {
          readableTextChunks.push(ctx.textContent(node, { includeImageAlt: true }));
        },
        heading(node, ctx) {
          readableTextChunks.push(ctx.textContent(node));
        },
        code(node) {
          readableTextChunks.push(node.value);
        },
        tableCell(node, ctx) {
          readableTextChunks.push(ctx.textContent(node));
        },
      },
    ],
  });

  await processor.render(markdown);

  const wordCount = readableTextChunks.reduce((total, text) => total + countWords(text), 0);
  return Math.round(wordCount / WORDS_PER_MINUTE);
};
