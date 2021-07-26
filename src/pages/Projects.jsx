// Project List Componenet

import { useEffect, useState } from "react";
import styled from "styled-components";
import { client } from "../api/contentful";
import { Button } from "../compoenents/button";
import { Inner } from "../compoenents/container";

const Project = ({ id }) => {
  const [project, setProject] = useState({});
  useEffect(() => {
    const getEntry = async (id) => {
      try {
        const res = await client.getEntry(id);
        setProject(res);
      } catch (err) {
        console.log(err);
      }
    };
    getEntry(id);
  }, [id]);

  if (!project || !project.fields) {
    return <div>Not found</div>;
  }

  return (
    <div className="project__container">
      <h1 className="project__title">{project.fields.title}</h1>
      <p className="project__description">{project.fields.description}</p>
      <Button href={project.fieldsurl} target="_blank" rel="noreferrer">
        Live Website
      </Button>
      <img
        src={project.fields.fullpage.fields.file.url}
        alt={project.fields.fullpage.fields.title}
        className="project__fullpage"
      />
    </div>
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
      <li
        key={id}
        onClick={() => setSelectedId(id)}
        className={`project_list__link ${id === selectedId ? "selected" : ""}`}
      >
        {title}
      </li>
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
    margin-bottom: 1rem;
    @media (max-width: 600px) {
      position: unset;
    }

    .project_list__link {
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        color: blue;
      }
      &.selected {
        font-weight: bold;
      }
    }
  }
  .project__container {
    padding: 1rem;
    background: #eee;
    text-align: center;
    .project__fullpage {
      max-width: 100%;
      background-blend-mode: overlay;
    }
  }
`;