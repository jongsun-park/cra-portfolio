import styled from "styled-components";
import { Inner } from "../container";
import { routes } from "../../data";
import { NavLink } from "react-router-dom";
import { colors } from "../../styles/colors";
import { motion } from "framer-motion";

const Navigation = ({ routes }) => {
  return (
    <nav>
      <ul className="header__navigation__container">
        {routes.map((route) => (
          <li key={route.name} className="header__navigation__item">
            <NavLink
              exact={route.slug === "/" ? true : false}
              to={route.slug}
              activeClassName="active"
            >
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Header = () => {
  const variants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <HeaderContainer
      className="header"
      as={motion.div}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      <Inner className="flex my-0">
        <a href="/">
          <div className="site-title">
            <strong>Jongsun Park</strong>
          </div>
        </a>
        <Navigation routes={routes} className="header__navigation" />
      </Inner>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  margin: 10px auto;
  width: 100%;

  .site-title {
    font-size: 1.4rem;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 100%;
      height: 5px;
      left: 0;
      top: 5px;
    }
    &:hover {
      color: ${colors.primary};
    }
  }
  .header__navigation {
    &__container {
      list-style: none;
      padding: 0;
      margin: 10px auto;
      display: flex;
    }
    &__item {
      margin-left: 1rem;
      position: relative;
      padding: 5px;
      a {
        &::after {
          content: "";
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 0px;
          background: ${colors.default};
          position: absolute;
          z-index: -1;
          transition: all ease-out 100ms;
        }
        &.active {
          // font-weight: bold;
          &::after {
            height: 4px;
          }
        }
        &:hover {
          &::after {
            height: 100%;
            background: ${colors.primary_light};
          }
        }
      }
    }
  }
`;
