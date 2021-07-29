import { Inner } from "../compoenents/container";
import { client, renderedBody } from "../api/contentful";
import { useEffect, useState } from "react";

import { toLocaleDateString, cleanString } from "../utils";

import styled from "styled-components";

import { Button } from "../compoenents/button";
import { colors } from "../styles/colors";

import { ScrollContainer } from "../compoenents/scrollContainer";

const Pagination = ({ num = 0, page, perPage, setPage }) => {
  const size = num !== 0 ? Math.ceil(num / perPage - 1) : 0;
  if (!size || size <= 0) return "";

  return (
    <PaginationContainer className="blog-pagination">
      {new Array(size).fill("").map((_, index) => (
        <li
          className={`blog-pagination__button ${
            index === page ? "active" : ""
          }`}
          onClick={() => setPage(index)}
          key={`pagination-${index}`}
        >
          {index + 1}
        </li>
      ))}
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  .blog-pagination__button {
    cursor: pointer;
    padding: 5px;
    border: 1px solid #eee;
    color: ${colors.default_light};
    width: 14px;
    height: 14px;
    font-size: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    &.active,
    &:hover {
      border: 1px solid ${colors.default};
      background: ${colors.default}!important;
      color: white;
    }
  }
`;

export const BlogList = () => {
  const [blog, setBlog] = useState([]);
  const [page, setPage] = useState(0);
  const perPage = 5;

  useEffect(() => {
    const getEntries = async () => {
      const res = await client.getEntries();
      if (res.items.length > 0)
        setBlog(
          res.items.filter((item) => item.sys.contentType.sys.id === "blog")
        );
    };
    getEntries();
  }, []);

  return (
    <div>
      <Inner>
        <h1 className="page-title">Blog</h1>
        <p>{blog.length} Posts found</p>
        <div className="blog__list">
          {blog.slice(page * perPage, (page + 1) * perPage).map((item) => {
            const { title, body } = item.fields;
            const { createdAt, id } = item.sys;
            // if (contentType.sys.id !== "blog") return "";
            return (
              <BlogItemContainer className="blog__item" key={id}>
                <ScrollContainer>
                  <h3>{title}</h3>
                  <span>
                    <small>{toLocaleDateString(createdAt)}</small>
                  </span>{" "}
                  <div>
                    {body &&
                      (renderedBody(body).length > 200 ? (
                        <div
                          className="blog__excerpt"
                          dangerouslySetInnerHTML={{
                            __html: cleanString(
                              renderedBody(body).slice(0, 200)
                            ),
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
                  <Button href={`/blog/${id}`}>Read More</Button>
                </ScrollContainer>
              </BlogItemContainer>
            );
          })}
        </div>

        <Pagination
          num={blog.length}
          page={page}
          perPage={perPage}
          setPage={setPage}
        />
      </Inner>
    </div>
  );
};

const BlogItemContainer = styled.div`
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
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
