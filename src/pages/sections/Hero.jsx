import styled from "styled-components";
import { contacts } from "../../data";
import { Button } from "../../compoenents/button";
import { motion } from "framer-motion";

export const Hero = () => {
  const container = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <HeroContaienr>
      <motion.div
        className="homepage-hero__content"
        initial="hidden"
        animate="visible"
        variants={container}
        transition={{ duration: 1 }}
      >
        <motion.h2 className="intro" variants={item}>
          Hello! I'm <em>Park</em>
        </motion.h2>
        <motion.p className="short-desc" variants={item}>
          Web developer and designer specialized in UI & UX in mordern web.
        </motion.p>
        <motion.p className="long-desc" variants={item}>
          I come from Daegu, a city in South Korea. I currently live in Ireland,
          in County Louth. I'm a self-taught web designer/developer and I'm
          highly capable working with both wordpress and shopify. (As well as
          custom coded pages!)
        </motion.p>
        <motion.div className="cta" variants={item}>
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
        </motion.div>
      </motion.div>
      <motion.div
        className="homepage-hero__image"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/images/main-inllustration.svg"
          alt="hero-illustration"
          loading="lazy"
        />
      </motion.div>
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
