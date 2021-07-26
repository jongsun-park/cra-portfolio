import styled from "styled-components";

export const Inner = styled.div`
  max-width: 960px;
  margin: 1rem auto;
  padding: 20px;

  @media (max-width: 600px) {
    margin: 0 auto;
    padding: 0 20px;
  }

  &.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 400px) {
      flex-direction: column;
    }
  }

  &.my-0 {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
