import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Inner } from "../compoenents/container";
import { shuffle } from "../utils";

// eslint-disable-next-line no-unused-vars
// This config info for generating access
const facebookdev_config = {
  instagram_app_id: "338609591078354",
  instagram_secret: "feb01246a8966bc27aa937c0539d3457",
  short_access_token:
    "IGQVJVbGpzY3IxdkxyM3QtbVV3M2VYS0h1b0F6MlkwX1pMSEhNdFY3R2hpME52Ym9xYThoRmoxUWNrXzZAXdFEwYnB4bXA2NE9uMW9acXdYQ2N6TkpCSS10bzJMUzlQYm5fTEpuTy1OM1VCYk1PMUl2bEQzMi1KWFNlSVNB",
  user_id: 17841448489335119,
  redirect_uri: "https://www.jong-sun.com/auth",
};

// https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens
const long_access_token = {
  access_token:
    "IGQVJWRldGVVUzdTdBbVpTVDcwMFJEeVo0aUJEVzRPYkVUOVp2NDlnTTdiTVl0RTkyUUVWNFhxWlYzZAkYyQXU2cmNzVVh4RzMzclZABeGg0VDFJckdTTzcyTW1Ob2NSamthUWtGMGFn",
  token_type: "bearer",
  expires_in: 5101238,
  expires: "Sat, 01 Jan 2000 00:00:00 GMT",
};

const Feed = ({ posts, limit }) => {
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

const Instagram = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    const getInstagramPost = async () => {
      const res = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,permalink,media_url,username,timestamp&access_token=${long_access_token.access_token}`
      );
      setPost(res.data.data);
    };
    getInstagramPost();
  }, []);

  return (
    <FeedContainer className="instagram-feed">
      <Inner>
        <h2>Follow @parapr.design</h2>
      </Inner>
      {posts && posts.length > 0 ? (
        <Feed posts={posts} limit="12" />
      ) : (
        <div>Failed</div>
      )}
    </FeedContainer>
  );
};

export default Instagram;

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
