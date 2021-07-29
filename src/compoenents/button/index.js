import styled, { css } from "styled-components";
import { colors } from "../../styles/colors";
import { motion } from "framer-motion";

export const PlainButton = styled.a`
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
    box-shadow: 0rem 10px 14px rgb(0 0 0 / 5%);
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

export const Button = (props) => (
  <PlainButton
    {...props}
    as={motion.a}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  />
);
