import sanitizeHtml from "sanitize-html";

export const cleanString = (input) =>
  sanitizeHtml(input, {
    allowedTags: false,
    allowedAttributes: false,
  });

export const toLocaleDateString = (string) =>
  new Date(string).toLocaleDateString("en-US");

export const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
