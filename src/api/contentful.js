import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

const contentful_config = {
  SPACE_ID: "fpayi0ttygsj",
  ACCESS_TOKEN: "p_n4nm6ztww0mEdP4nvNzJuwQjtWjZfxQEYt2MPSO2I",
  PREVIEW_TOKEN: "p_n4nm6ztww0mEdP4nvNzJuwQjtWjZfxQEYt2MPSO2I",
};

// https://contentful.github.io/contentful.js/contentful/8.4.2/
export const client = createClient({
  space: contentful_config.SPACE_ID,
  accessToken: contentful_config.ACCESS_TOKEN,
});

export const renderedBody = (body) => documentToHtmlString(body);
