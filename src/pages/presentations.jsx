import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/seo';

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

const PresentationLinksContainer = styled('div')`
  * {
    color: #222;
    font-size: 1rem;
    line-height: 1;
    margin: 0 0.5rem 0 0;
    padding: 0.25rem;
    text-decoration: none;

    &.current-page {
      border-bottom: 2px solid #222;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;
const PresentationListItem = ({ title, slug, description, materialsUrl, events }) => {
  return (
    <>
      <h2>{title}</h2>
      <PresentationLinksContainer>
        <Link to={`/presentation${slug}/1`}>Presentation</Link>
        <a target="_blank" rel="noopener noreferrer" href={materialsUrl}>
          Materials
        </a>
      </PresentationLinksContainer>

      <p>{description}</p>
      <ul>{Boolean(events) && events.map((event, index) => <li key={`presentation-events-${slug}-${index}`}>{event}</li>)}</ul>
    </>
  );
};

const PresentationsPage = () => {
  const presentations = usePresentations();
  console.log({ presentations });
  return (
    <>
      <SEO title="Presentations" />
      <>
        <h1>Presentation</h1>
        <p>I like to share my knowledge and give back to community. Because of that I conduct workshops for local groups.</p>
        {presentations.map((presentation) => {
          if (presentation.frontmatter.notPublished) {
            console.log('nieopublikowane');
            return null;
          }
          return (
            <PresentationListItem
              key={`presentation-${presentation.fields.slug}`}
              slug={presentation.fields.slug}
              title={presentation.frontmatter.title}
              description={presentation.frontmatter.description}
              materialsUrl={presentation.frontmatter.materialsUrl}
              events={presentation.frontmatter.events}
            />
          );
        })}
      </>
    </>
  );
};

export default PresentationsPage;
