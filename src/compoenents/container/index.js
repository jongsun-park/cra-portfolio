import styled from "styled-components";

export const Inner = styled.div`
  max-width: 960px;
  margin: 1rem auto;
  padding: 30px;

  &.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 400px) {
      flex-direction: column;
    }
  }
`;
