const isWhitespaceText = (node) => node?.type === "text" && node.value.trim() === "";

const meaningfulChildren = (node) =>
  "children" in node ? node.children.filter((child) => !isWhitespaceText(child)) : [];

const getOnlyImage = (node) => {
  const children = meaningfulChildren(node);
  const image = children[0];
  return children.length === 1 && image?.type === "element" && image.tagName === "img"
    ? image
    : undefined;
};

const getCaptionChildren = (node) => {
  if (!node || node.type !== "element" || node.tagName !== "p") return;
  const children = meaningfulChildren(node);
  const emphasis = children[0];
  return children.length === 1 && emphasis?.type === "element" && emphasis.tagName === "em"
    ? emphasis.children
    : undefined;
};

export const figureCaptionPlugin = {
  name: "figure-captions",
  element: {
    filter: ["p"],
    visit(node, ctx) {
      const image = getOnlyImage(node);
      if (!image) return;

      const parent = ctx.parent(node);
      const index = ctx.indexOf(node);
      if (!parent || index == null) return;

      let captionIndex = index + 1;
      while (isWhitespaceText(parent.children[captionIndex])) captionIndex++;

      const captionChildren = getCaptionChildren(parent.children[captionIndex]);
      if (!captionChildren) return;

      ctx.replaceNode(node, {
        type: "element",
        tagName: "figure",
        properties: {},
        children: [
          structuredClone(image),
          {
            type: "element",
            tagName: "figcaption",
            properties: {},
            children: structuredClone(captionChildren),
          },
        ],
      });
      ctx.removeChildAt(parent, captionIndex);
    },
  },
};
