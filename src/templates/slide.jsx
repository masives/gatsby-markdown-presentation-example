import React from 'react';
import { graphql } from 'gatsby';
import SlideNavigation from '../components/slideNavigation';

export const query = graphql`
  query SlideQuery($id: String!) {
    slide(id: { eq: $id }) {
      html
    }
  }
`;

const SlideTemplate = ({ data, navigate, location, pageContext }) => {
  const { prevPage, nextPage } = pageContext;

  return (
    <div style={{ width: '100%' }}>
      <SlideNavigation pathname={location.pathname} navigate={navigate} prevPage={prevPage} nextPage={nextPage} />
      <div dangerouslySetInnerHTML={{ __html: data.slide.html }} />
    </div>
  );
};

export default SlideTemplate;
