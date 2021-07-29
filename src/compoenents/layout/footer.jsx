import styled from "styled-components";
import { Inner } from "../container";
import { contacts } from "../../data";
import { colors } from "../../styles/colors";
import { motion } from "framer-motion";

const FooterContact = ({ contacts }) => (
  <div className="footer-contact">
    <p className="footer-contact__promotion">
      Do you have a project? <br />
      Let's work <ins>together</ins>!
    </p>
    <div className="footer-contact__links">
      {contacts.map((item) => (
        <motion.a
          href={item.href}
          target="__blank"
          rel="noreferrer noopener"
          className="footer-contact__link"
          key={item.text}
          whileHover={{ scale: 1.1, backgroundColor: colors.default }}
          whileTap={{ scale: 0.9 }}
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
        </motion.a>
      ))}
    </div>
  </div>
);

const FooterCopy = () => (
  <p>© {new Date().getFullYear()} All rights reserved</p>
);

export const Footer = () => (
  <FooterContainer
    className="footer"
    as={motion.footer}
    initial={{ opacity: 0, y: "100%" }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1 }}
  >
    <Inner className="footer__container flex my-0">
      <FooterContact contacts={contacts} />
      <FooterCopy />
    </Inner>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  background: ${colors.bg_dark};
  color: white;
  .footer__container {
    display: flex;
    align-items: flex-end;

    .footer-contact__links {
      .footer-contact__link {
        border-color: white;
        img {
          filter: invert(1);
        }
      }
    }

    @media (max-width: 500px) {
      flex-direction: column;
      align-items: start;
      .footer-contact__links {
        margin-bottom: 0;
      }
    }
  }

  .footer-contact {
    &__promotion {
      font-size: 1.4rem;
      font-weight: bold;
    }
    &__links {
      margin-bottom: 1rem;
      display: flex;
    }
    &__link {
      padding: 10px;
      display: inline-flex;
      border: 2px solid ${colors.default_light};
      border-radius: 99px;
      margin-right: 10px;

      &:hover {
        border-color: ${colors.default};
      }
    }
  }
`;
