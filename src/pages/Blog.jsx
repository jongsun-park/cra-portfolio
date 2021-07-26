import { Inner } from "../compoenents/container";
import { client, renderedBody } from "../api/contentful";
import { useEffect, useState } from "react";
import { toLocaleDateString, shuffle } from "../utils";
import styled from "styled-components";

const PostTemplate = ({ post }) => {
  const { title, body } = post.fields;
  const { createdAt } = post.sys;
  return (
    <div>
      <h1>{title}</h1>
      <span>{toLocaleDateString(createdAt)}</span>
      <div>
        <div dangerouslySetInnerHTML={{ __html: renderedBody(body) }}></div>
      </div>
    </div>
  );
};

const PostLink = ({ post }) => {
  return (
    <a className="post-navigation__link" href={`/blog/${post.sys.id}`}>
      <h3>{post.fields.title}</h3>
      <span>{toLocaleDateString(post.sys.createdAt)}</span>
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
        if (id === current || index > 2) return "";
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

  return (
    <div>
      <Inner>
        <PostTemplate post={post} />
        <PostNavigation
          current={id}
          contentType={post.sys.contentType.sys.id}
        />
        <a href="/">Go Home</a>
      </Inner>
    </div>
  );
};

const PostNavigationContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;

  .post-navigation__link {
    padding: 0 1rem 1rem;
    margin-right: 1rem;
    border: 1px solid;
    flex: 1;
  }
`;
