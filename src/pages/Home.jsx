import { useEffect, useState } from "react";
// import Instagram from "../api/instagram";
import { Inner } from "../compoenents/container";
import { client } from "../api/contentful";

import { Hero, Project, Blog, InstagramFeed } from "./sections";

import axios from "axios";
import { instagramEndpoint } from "../api/instagram";

const Instagram = () => {
  // instagram getEntries
  const [posts, setPost] = useState([]);
  useEffect(() => {
    const getInstagramPost = async () => {
      const res = await axios.get(instagramEndpoint);
      setPost(res.data.data);
    };
    getInstagramPost();
  }, []);

  return <InstagramFeed posts={posts} limit="12" />;
};

const Contentful = () => {
  const [blog, setBlog] = useState([]);
  const [project, setProject] = useState([]);

  // contentful getEntiries
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
      <Blog blog={blog} limit="8" />
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
