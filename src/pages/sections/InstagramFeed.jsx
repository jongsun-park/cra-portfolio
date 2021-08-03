import styled from "styled-components";
import { Inner } from "../../compoenents/container";
import { shuffle } from "../../utils";

export const InstagramFeed = ({ posts, limit }) => {
  return (
    <FeedContainer className="instagram-feed">
      <Inner>
        <a
          href="https://www.instagram.com/parpar.design/"
          target="_blank"
          rel="noreferrer"
          className="link-hover-animation"
        >
          <h2 style={{ margin: "1rem 0 10px" }}>Follow @parpar.design</h2>
        </a>
      </Inner>
      {posts && posts.length > 0 ? (
        <Feed posts={posts} limit={limit} />
      ) : (
        <div>Loading</div>
      )}
    </FeedContainer>
  );
};

export const Feed = ({ posts, limit }) => {
  return (
    <FeedList className="feed">
      {shuffle(posts)
        .splice(0, limit)
        .map((post) => (
          <a
            key={post.id}
            style={{ backgroundImage: `url(${post.media_url})` }}
            className="feed_item"
            href={post.permalink}
            target="_blank"
            rel="noreferrer"
          >
            <span className="feed_item__cpation">{post.caption}</span>
          </a>
        ))}
    </FeedList>
  );
};

// styled component

const FeedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  .feed_item {
    width: 25%;
    aspect-ratio: 1 / 1;
    display: grid;
    place-content: center;
    background-size: cover;
    position: relative;

    @media (max-width: 600px) {
      width: 33%;
    }

    @media (max-width: 400px) {
      width: 50%;
    }

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transition: all ease-out 300ms;
      background: rgba(0, 0, 0, 0);
    }

    .feed_item__cpation {
      opacity: 0;
      text-align: center;
      position: relative;
      transform: translateY(20px);
      transition: all ease-out 300ms;
      color: white;
    }

    &:hover {
      .feed_item__cpation {
        opacity: 1;
        transform: translateY(0);
      }
      &::before {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }
`;

const FeedContainer = styled.div`
  .instagram-feed__container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > a {
      display: inline-flex;
      max-width: 25%;
      @media (max-width: 960px) {
        max-width: 33%;
      }
      @media (max-width: 600px) {
        max-width: 50%;
      }
      @media (max-width: 300px) {
        max-width: 100%;
      }
      img {
        max-width: 100%;
      }
    }
  }
`;
