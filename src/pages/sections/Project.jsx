import styled from "styled-components";
import { toLocaleDateString } from "../../utils";
import { Button } from "../../compoenents/button";

export const Project = ({ project }) => {
  return (
    <ProjectContainer>
      <h2 className="homepate-section__title">
        <span>Projects</span>
      </h2>
      <div className="homepage-project">
        {project.map((p, i) => {
          const { title, description, thumbnail, url } = p.fields;
          const { id, createdAt } = p.sys;
          return (
            <div
              key={id + i}
              className={`homepage-project__item ${
                i % 2 !== 0 ? "flex-reverse" : ""
              }`}
            >
              <div
                className="homepage-project__image"
                style={{ backgroundImage: `url(${thumbnail.fields.file.url})` }}
              ></div>
              <div className="homepage-project__content">
                <h3>{title}</h3>
                <span>
                  <small>{toLocaleDateString(createdAt)}</small>
                </span>
                <p>{description}</p>
                <div className="buttons">
                  <Button primary href={url} target="_blank" rel="noreferrer">
                    Live Website
                  </Button>
                  <Button href={`/project/${id}`}>Details</Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ProjectContainer>
  );
};

const ProjectContainer = styled.div`
  .homepage-project {
    &__item {
      display: flex;
      &.flex-reverse {
        flex-direction: row-reverse;
        @media (max-width: 600px) {
          flex-direction: column;
        }
      }
      @media (max-width: 600px) {
        flex-direction: column;
      }
    }
    &__image {
      flex: 1;
      aspect-ratio: 1 / 1;
      background-size: cover;
    }
    &__content {
      flex: 1;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      aspect-ratio: 1 / 1;

      h3 {
        font-size: 1.4rem;
        margin: 0;
        padding: 0 1rem;
      }
      p {
        padding: 0 1rem;
      }
      span {
        padding: 0 1rem;
      }
      .buttons {
        margin-top: 2rem;
        padding: 0 1rem;
      }

      @media (max-width: 400px) {
        padding: 0;
        margin: 2rem 0 4rem;
        aspect-ratio: auto;
        .buttons {
          margin-top: 1rem;
        }
      }
    }
  }
`;
