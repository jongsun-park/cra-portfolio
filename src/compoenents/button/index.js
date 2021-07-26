import styled, { css } from "styled-components";

export const Button = styled.a`
  font-size: 14px;
  padding: 10px 24px;
  border: 1px solid;
  display: inline-flex;
  .icon {
    margin-right: 10px;
  }
  margin: 0 10px 10px 0;
  ${(props) =>
    props.primary &&
    css`
      background: black;
      color: white;
    `}
`;
