export const truncateText = (content, length) => {
  if (!content) return "";
  return content.length > length ? content.slice(0, length) + "..." : content;
};
