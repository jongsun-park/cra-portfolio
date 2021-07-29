import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

export const ScrollContainer = (props) => {
  const { children } = props;
  const containerEl = useRef(null);
  const [visible, setVisible] = useState(false);
  const animationPostion = 0.8;

  useEffect(() => {
    const windowHeight = window.screen.height;
    const containerElYPosition = containerEl.current
      ? containerEl.current.getBoundingClientRect().top
      : 0;

    const root = document.querySelector("#root");

    if (
      windowHeight * animationPostion + root.scrollTop >
      containerElYPosition
    ) {
      // console.log("visible");
      setVisible(true);
    }

    const scrollHandle = () => {
      // console.log("windowHeight", windowHeight); // fixed 864
      // console.log("containerElYPosition", containerElYPosition); // fixed 893
      // console.log("root.scrollTop", root.scrollTop); // changed
      if (
        windowHeight * animationPostion + root.scrollTop >
        containerElYPosition
      ) {
        // console.log("visible");
        setVisible(true);
      } else {
        // console.log("hidden");
        setVisible(false);
      }
    };

    root.addEventListener("scroll", scrollHandle, false);

    // return root.removeEventListener("scroll", scrollHandle, false);
  }, []);

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
      transition: {
        staggerChildren: 0.5,
      },
    },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container
      as={motion.div}
      animate={visible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5 }}
      ref={containerEl}
    >
      {children}
    </Container>
  );
};

const Container = styled.div`
  // testing style
  // padding: 1rem;
  // border: 1px solid;
  // text-align: center;
  // background: #eee;
  // margin: 2rem auto;
`;
