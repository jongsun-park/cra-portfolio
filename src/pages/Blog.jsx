import { Inner } from "../compoenents/container";
import { client, renderedBody } from "../api/contentful";
import { useEffect, useState } from "react";
import { toLocaleDateString, shuffle } from "../utils";
import styled from "styled-components";
import { colors } from "../styles/colors";
// import { ScrollContainer } from "../compoenents/scrollContainer";

const PostTemplate = ({ post }) => {
  const { title, body } = post.fields;
  const { createdAt } = post.sys;

  return (
    // <ScrollContainer>
    <div className="post">
      <h1 className="post__title">{title}</h1>
      <span className="post__publishedAt">
        <small>{toLocaleDateString(createdAt)}</small>
      </span>
      <div className="post__content">
        <div dangerouslySetInnerHTML={{ __html: renderedBody(body) }}></div>
      </div>
    </div>
    // </ScrollContainer>
  );
};

const PostLink = ({ post }) => {
  return (
    <a className="post-navigation__link" href={`/blog/${post.sys.id}`}>
      <h3>{post.fields.title}</h3>
      <span>
        <small>{toLocaleDateString(post.sys.createdAt)}</small>
      </span>
    </a>
  );
};

const PostNavigation = ({ contentType, current }) => {
  const [related, setRelated] = useState([]);
  useEffect(() => {
    const getEntry = async () => {
      const res = await client.getEntries({
        content_type: contentType,
      });
      setRelated(res.items);
    };
    getEntry();
  }, [contentType]);

  return (
    <PostNavigationContainer className="post-navigation">
      {shuffle(related).map((post, index) => {
        const id = post.sys.id;
        if (id === current || index > 1) return "";
        return <PostLink post={post} key={id} />;
      })}
    </PostNavigationContainer>
  );
};

export const Blog = ({ match }) => {
  const { id } = match.params;

  const postInit = {
    fields: { title: "", body: "" },
    sys: { createdAt: "", contentType: { sys: { id: "" } } },
  };

  const [post, setPost] = useState(postInit);

  useEffect(() => {
    const getPost = async (id) => {
      const fetched = await client.getEntry(id);
      setPost(fetched);
    };
    getPost(id);
  }, [id]);

  // inline code styles change
  useEffect(() => {
    const codeEls = document.querySelectorAll("code");
    codeEls.forEach((code) => {
      if (code.innerText.length < 50) {
        code.classList.add("inline-code");
      }
    });
  }, [post]);

  // empty p tag remove
  useEffect(() => {
    const paras = document.querySelectorAll("p");
    paras.forEach((para) => {
      if (para.innerHTML === "&nbsp;") {
        para.classList.add("empty-para");
      }
    });
  }, [post]);

  return (
    <PostContainer>
      <Inner>
        <PostTemplate post={post} />
        <PostNavigation
          current={id}
          contentType={post.sys.contentType.sys.id}
        />
      </Inner>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  .post {
    &__content {
      border: 1px solid #f4f4f4;
      padding: 1rem;
      font-size: 14px;
      margin: 1rem auto;

      p {
        line-height: 1.5;
        &.empty-para {
          display: none;
        }
      }

      code {
        font-family: monospace;
        width: 100%;
        max-width: calc(100% - 2rem);
        padding: 1rem;
        background: #2e2e2e;
        display: inline-block;
        word-break: break-word;
        color: white;
        white-space: pre-wrap;

        &.inline-code {
          background: none;
          color: ${colors.primary};
          padding: 0;
          display: inline;
        }
      }
    }
  }
`;

const PostNavigationContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;

  .post-navigation__link {
    padding: 0 1rem 1rem;
    margin-right: 1rem;
    border: 1px solid #eee;
    flex: 1;
    transition: all ease-out 100ms;

    &:hover {
      border: 1px solid ${colors.primary};
      color: ${colors.primary};
    }
  }
`;
