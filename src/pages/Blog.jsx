import { Inner } from "../compoenents/container";
import path from "path";
var fs = require("fs");

export const Blog = () => {
  const directoryPath = path.join(__dirname, "posts");

  console.log(fs);
  return (
    <div>
      <Inner>Blog</Inner>
    </div>
  );
};
