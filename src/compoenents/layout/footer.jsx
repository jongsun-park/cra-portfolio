import styled from "styled-components";
import { Inner } from "../container";
import { contacts } from "../../data";

const FooterContact = ({ contacts }) => (
  <div className="footer-contact">
    <p>
      Do you have a project? <br />
      Let's work together!
    </p>
    <div className="footer-contact__links">
      {contacts.map((item) => (
        <a
          href={item.href}
          target="__blank"
          rel="noreferrer noopener"
          className="footer-contact__link"
          key={item.text}
        >
          {item.icon ? (
            <img
              src={`/icons/${item.icon}.svg`}
              className="footer-contact__link-icon"
              alt={`${item.icon} icons`}
            />
          ) : (
            item.text
          )}
        </a>
      ))}
    </div>
  </div>
);

const FooterCopy = () => (
  <p>© {new Date().getFullYear()} All rights reserved</p>
);

export const Footer = () => (
  <FooterContainer className="footer">
    <Inner className="footer__container flex">
      <FooterContact contacts={contacts} />
      <FooterCopy />
    </Inner>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  background: #eee;
  .footer__container {
    display: flex;
    align-items: flex-end;
  }
  .footer-contact {
    &__links {
      margin-bottom: 1rem;
      display: flex;
    }
    &__link {
      display: block;
      min-width: 16px;
      min-height: 16px;
      margin-right: 5px;
    }
    &__link-icon {
    }
  }
`;
