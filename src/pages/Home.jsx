import { useEffect, useState } from "react";
import Instagram from "../api/instagram";
import { Inner } from "../compoenents/container";
import { client } from "../api/contentful";
import styled from "styled-components";
import { toLocaleDateString } from "../utils";
import { contacts } from "../data";

import { Button } from "../compoenents/button";

const Hero = () => {
  return (
    <HeroContaienr>
      <div className="homepage-hero__content">
        <h2 className="intro">Hello! I'm Park</h2>
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
            DOWNLOAD RESUME
          </Button>
          <Button href={contacts[0].href}>
            <img
              src={`/icons/${contacts[0].icon}.svg`}
              alt="icon"
              className="icon"
            />
            CONTACT ME
          </Button>
        </div>
      </div>
      <div className="homepage-hero__image">
        <img src="/images/main-inllustration.svg" alt="hero-illustration" />
      </div>
    </HeroContaienr>
  );
};

const Blog = ({ blog }) => {
  return (
    <BlogContainer className="homepage-blog">
      <a href="/blog">
        <h2>Blog</h2>
      </a>
      <div className="homepage-blog__container">
        {blog.map((item, index) => {
          return (
            <a
              className="homepage-blog__item"
              href={`/blog/${item.sys.id}`}
              key={item.sys.id + index}
            >
              <h3 className="title">{item.fields.title}</h3>
              <p className="meta">
                <span className="type">{item.sys.contentType.sys.id}</span>
                {" • "}
                <span className="createdAt">
                  {toLocaleDateString(item.sys.createdAt)}
                </span>
              </p>
            </a>
          );
        })}
      </div>
      <Button href="/blog">MORE POST</Button>
    </BlogContainer>
  );
};

const Project = ({ project }) => {
  return (
    <ProjectContainer>
      <h2>Projects</h2>
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
                <p>{description}</p>
                <span>{toLocaleDateString(createdAt)}</span>
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
    }
  }
`;

const Contentful = () => {
  const [blog, setBlog] = useState([]);
  const [project, setProject] = useState([]);

  useEffect(() => {
    const getEntries = async () => {
      const res = await client.getEntries();
      // if (res.items.length > 0) setBlog(res.items.splice(0, 8));
      // filter data to blog and projects
      res.items.forEach((data) => {
        const type = data.sys.contentType.sys.id;
        if (type === "projects") {
          setProject((project) => [...project, data]);
        } else {
          setBlog((blog) => [...blog, data]);
        }
      });
    };
    getEntries();
  }, []);

  return (
    <>
      <Project project={project} />
      <Blog blog={blog} />
    </>
  );
};

export const Home = () => {
  return (
    <>
      <Inner>
        <Hero />
        <Contentful />
      </Inner>
      <Instagram />
    </>
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
      font-size: 4rem;
    }
    .short-desc {
      margin: 0;
      font-weight: bold;
      max-width: 37ch;
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
  }
`;

const BlogContainer = styled.div`
  .homepage-blog {
    &__container {
      display: flex;
      flex-wrap: wrap;
    }
    &__item {
      display: flex;
      margin: 0 10px 10px 0;
      flex-direction: column;
      align-items: flex-start;

      max-width: 50%;
      border: 1px solid #eee;
      padding: 1rem;

      h3 {
        max-width: 27ch;
        font-size: 1rem;
        margin: 0 0 1rem 0;
        font-weight: normal;
      }
      .meta {
        margin: 0;
        font-size: 14px;
        .type {
          text-transform: uppercase;
        }
        .createdAt {
        }
      }
    }
  }
`;
