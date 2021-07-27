import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";

export const Button = styled.a`
  font-size: 10px;
  font-weight: bold;
  text-transport: 
  line-height: 1;
  padding: 10px 24px;
  border: 1px solid;
  display: inline-flex;
  align-items: center;
  margin: 0 10px 10px 0;
  transition: all ease-out 100ms;
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover {
    background: ${colors.default};
    border: 1px solid  ${colors.default};
    color: white;
    img.icon {
      filter: invert(1);
    }
  }
  ${(props) =>
    props.primary &&
    css`
      background: ${colors.primary};
      color: white;
    `}
`;
