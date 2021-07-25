import Feed from "react-instagram-authless-feed";
import styled from "styled-components";
import { Inner } from "../compoenents/container";

const Instagram = () => {
  return (
    <FeedContainer className="instagram-feed">
      <Inner>
        <h2>Follow @parapr.design</h2>
      </Inner>
      <Feed
        userName="parpar.design"
        className="instagram-feed__container"
        limit="12"
      />
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
