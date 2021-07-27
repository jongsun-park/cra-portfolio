import styled from "styled-components";
import { contacts } from "../../data";
import { Button } from "../../compoenents/button";

export const Hero = () => {
  return (
    <HeroContaienr>
      <div className="homepage-hero__content">
        <h2 className="intro">
          Hello! I'm <em>Park</em>
        </h2>
        <p className="short-desc">
          Web developer and designer specialized in UI & UX in mordern web.
        </p>
        <p className="long-desc">
          I come from Daegu, a city in South Korea. I currently live in Ireland,
          in County Louth. I'm a self-taught web designer/developer and I'm
          highly capable working with both wordpress and shopify. (As well as
          custom coded pages!)
        </p>
        <div className="cta">
          <Button
            href="/Jongsun Park CV.pdf"
            downlaod="Jongsun Park"
            target="_blank"
            primary
          >
            <span className="sm-hidden">DOWNLOAD&nbsp;</span> RESUME
          </Button>
          <Button href={contacts[0].href}>
            <img
              src={`/icons/${contacts[0].icon}.svg`}
              alt="icon"
              className="icon"
              loading="lazy"
            />
            <span className="sm-hidden">&nbsp;CONTACT</span>
          </Button>
        </div>
      </div>
      <div className="homepage-hero__image">
        <img
          src="/images/main-inllustration.svg"
          alt="hero-illustration"
          loading="lazy"
        />
      </div>
    </HeroContaienr>
  );
};

const HeroContaienr = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  .homepage-hero__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .intro {
      margin: 0;
      font-size: clamp(2rem, 7vw, 4rem);
    }
    .short-desc {
      margin: 0;
      font-weight: bold;
      max-width: 37ch;
    }
    .long-desc {
      margin-bottom: 2rem;
    }
    .cta {
      display: flex;
    }
  }
  .homepage-hero__image {
    flex: 1;
    img {
      max-width: 100%;
    }
    margin-left: -5rem;
    z-index: -1;

    @media (max-width: 600px) {
      text-align: center;
      padding: 2rem;
      margin-left: 0;
      img {
        max-width: 80%;
      }
    }
  }
`;
