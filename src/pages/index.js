import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

const usePresentations = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/presentations/" } }) {
        nodes {
          frontmatter {
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  `);
  return data.allMarkdownRemark.nodes;
};

const MainPage = () => {
  const presentations = usePresentations();
  console.log({ presentations });
  return (
    <>
      <h1>Hello meet.js</h1>
      <h2>Dostępne prezentacje</h2>
      {presentations.map((presentation) => {
        return (
          <div>
            <Link to={`/presentation${presentation.fields.slug}/1`}>{presentation.frontmatter.title}</Link>
          </div>
        );
      })}
    </>
  );
};

export default MainPage;
