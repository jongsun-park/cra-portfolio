import { Inner } from "../compoenents/container";
import { client, renderedBody } from "../api/contentful";
import { useEffect, useState } from "react";

import { toLocaleDateString, cleanString } from "../utils";

import styled from "styled-components";

// import { useEffect } from "react";

export const BlogList = () => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const getEntries = async () => {
      const res = await client.getEntries();
      if (res.items.length > 0) setBlog(res.items);
    };
    getEntries();
  }, []);

  // useEffect(() => {
  //   console.log(blog);
  // }, [blog]);

  return (
    <div>
      <Inner>
        <h2>Blog</h2>
        <div className="blog__list">
          {blog.map((item) => {
            const { title, body } = item.fields;
            const { createdAt, id, contentType } = item.sys;

            if (contentType.sys.id !== "blog") return "";

            return (
              <BlogItemContainer className="blog__item" key={id}>
                <h3>{title}</h3>
                <span>{toLocaleDateString(createdAt)}</span>{" "}
                <div>
                  {body &&
                    (renderedBody(body).length > 200 ? (
                      <div
                        className="blog__excerpt"
                        dangerouslySetInnerHTML={{
                          __html: cleanString(renderedBody(body).slice(0, 200)),
                        }}
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: renderedBody,
                        }}
                      />
                    ))}
                </div>
                <a href={`/blog/${id}`}>Read More</a>
              </BlogItemContainer>
            );
          })}
        </div>
      </Inner>
    </div>
  );
};

const BlogItemContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  h3 {
  }
  .blog__excerpt {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      background: linear-gradient(
        900deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.7) 100%
      );
      width: 100%;
      height: 100%;
      // z-index: -1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    h1,
    h2,
    h3,
    p {
      font-size: 1rem;
      font-weight: normal;
    }
  }
`;
