import styled from "styled-components";
import { toLocaleDateString } from "../../utils";

import { Button } from "../../compoenents/button";
import { shuffle } from "../../utils";
import { colors } from "../../styles/colors";
import { motion } from "framer-motion";

export const Blog = ({ blog, limit }) => {
  return (
    <BlogContainer
      className="homepage-blog"
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="homepate-section__title">
        <span>Blog</span>
      </h2>
      <div className="homepage-blog__container">
        {shuffle(blog)
          .slice(0, limit)
          .map((item, index) => {
            return (
              <motion.a
                className="homepage-blog__item"
                href={`/blog/${item.sys.id}`}
                key={item.sys.id + index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <h3 className="title">{item.fields.title}</h3>
                <p className="meta">
                  <span className="type">{item.sys.contentType.sys.id}</span>
                  {" • "}
                  <span className="createdAt">
                    {toLocaleDateString(item.sys.createdAt)}
                  </span>
                </p>
              </motion.a>
            );
          })}
      </div>
      <Button href="/blog">MORE POST</Button>
    </BlogContainer>
  );
};

const BlogContainer = styled.div`
  .homepage-blog {
    &__container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      place-content: flex-start;
      margin-right: -10px;
      margin-bottom: 2rem;
    }
    &__item {
      display: flex;
      margin: 0 10px 10px 0;

      border: 1px solid #eee;
      padding: 1rem;

      aspect-ratio: 1 /1;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      text-align: center;

      width: calc(25% - 3rem);
      @media (max-width: 960px) {
        width: calc(33% - 3rem);
      }
      @media (max-width: 600px) {
        width: calc(50% - 3rem);
      }

      position: relative;
      overflow: hidden;

      transition: all ease-out 100ms;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        z-index: -1;
        transform: rotateY(0);
        transition: all ease-out 300ms;
      }

      &:hover {
        background: ${colors.primary_light};
        &::after {
          transform: rotateY(180deg);
          background: ${colors.primary_light};
        }
      }

      h3 {
        max-width: 27ch;
        font-size: 1rem;
        margin: 0 0 1rem 0;
        font-weight: normal;
      }
      .meta {
        margin: 0;
        font-size: 14px;
        .type {
          text-transform: uppercase;
        }
        .createdAt {
        }
      }
    }
  }
`;
