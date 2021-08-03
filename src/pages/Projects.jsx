// Project List Componenet

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../api/contentful";
import { Button } from "../compoenents/button";
import { Inner } from "../compoenents/container";
import { colors } from "../styles/colors";

const Project = ({ id }) => {
  const [project, setProject] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const getEntry = async (id) => {
      try {
        const res = await client.getEntry(id);
        setProject(res);
        setVisible(true);
      } catch (err) {
        console.log(err);
      }
    };
    getEntry(id);
  }, [id]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  if (!project || !project.fields) {
    return (
      <div className="project__not-found">
        <h2>Not found</h2>
        <p>Please select any items in the list</p>
      </div>
    );
  }

  return (
    <AnimatePresence exitBeforeEnter>
      {visible && (
        <motion.div
          className="project__container"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
          key={id}
        >
          <h1 className="project__title">{project.fields.title}</h1>
          <p className="project__description">{project.fields.description}</p>
          <Button href={project.fields.url} target="_blank" rel="noreferrer">
            Live Website
          </Button>
          <img
            src={project.fields.fullpage.fields.file.url}
            alt={project.fields.fullpage.fields.title}
            className="project__fullpage"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Projects = (props) => {
  const [selectedId, setSelectedId] = useState("");
  const [projects, setProjects] = useState([]);

  const params_id = props.match.params.id;

  // get data from contentful and filter by content type
  useEffect(() => {
    const getEntries = async () => {
      const res = await client.getEntries();
      const newProjects = res.items.filter(
        (item) => item.sys.contentType.sys.id === "projects"
      );
      setProjects(newProjects);
    };
    getEntries();
  }, []);

  // When selectedId is not exist, make first project id is selected
  useEffect(() => {
    if (params_id) {
      setSelectedId(params_id);
    }
    if (!params_id && projects[0]) {
      setSelectedId(projects[0].sys.id);
    }
  }, [params_id, projects]);

  // project list + onclick handler
  const nav = projects.map((project) => {
    const { id } = project.sys;
    const { title } = project.fields;
    return (
      <span
        key={id}
        onClick={() => setSelectedId(id)}
        className={`project_list__link ${id === selectedId ? "selected" : ""}`}
      >
        {title}
      </span>
    );
  });

  return (
    <Inner>
      <ProjectsContainer>
        <div className="project__list">
          <h3>Project List</h3>
          {nav}
        </div>
        <Project id={selectedId} />
      </ProjectsContainer>
    </Inner>
  );
};

const ProjectsContainer = styled.div`
  display: flex;
  list-style: none;
  align-items: flex-start;
  @media (max-width: 600px) {
    flex-direction: column;
  }

  .project__list {
    min-width: 30%;
    position: sticky;
    top: 1rem;
    margin: 0 2rem 1rem 0;

    @media (max-width: 600px) {
      position: unset;
      border-bottom: 1px solid #eee;
      width: 100%;
    }

    .project_list__link {
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        color: ${colors.primary};
      }

      display: block;
      transition: color ease-out 100ms;

      &.selected {
        text-decoration: underline;
        text-underline-offset: 10%;
        color: ${colors.primary};
      }
    }
  }

  .project__not-found {
    width: 100%;
    text-align: center;
    height: 100%;
  }

  .project__container {
    padding: 1rem;
    text-align: center;
    min-height: calc(100vh - 84px);

    @media (max-width: 600px) {
      padding: 0;
    }

    .project__fullpage {
      max-width: 100%;
      margin: 1rem;
    }
  }
`;
