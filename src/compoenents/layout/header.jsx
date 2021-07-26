import styled from "styled-components";
import { Inner } from "../container";
import { routes } from "../../data";
import { NavLink } from "react-router-dom";

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

export const Header = () => (
  <HeaderContainer className="header">
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

const HeaderContainer = styled.header`
  .header__navigation {
    &__container {
      list-style: none;
      padding: 0;
      display: flex;
    }
    &__item {
      margin-left: 1rem;
      .active {
        font-weight: bold;
      }
    }
  }
`;
