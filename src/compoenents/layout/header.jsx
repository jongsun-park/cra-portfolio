import styled from "styled-components";
import { Inner } from "../container";
import { routes } from "../../data";

const Navigation = ({ routes }) => {
  return (
    <nav>
      <ul className="header__navigation__container">
        {routes.map((route) => (
          <li key={route.name} className="header__navigation__item">
            <a href={route.slug}>{route.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const Header = () => (
  <HeaderContainer className="header">
    <Inner className="flex">
      <div className="site-title">Jongsun Park</div>
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
    }
  }
`;
