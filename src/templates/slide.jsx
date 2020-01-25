import React, { useEffect } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

export const query = graphql`
  query SlideQuery($id: String!) {
    slide(id: { eq: $id }) {
      html
    }
  }
`;

const SlideNavigation = styled('nav')`
  display: flex;

  justify-content: space-between;
`;
const NEXT_PAGE_KEYCODES = [13, 32, 39];
const PREV_PAGE_KEYCODE = 37;

const SlideTemplate = (props) => {
  const { data } = props;
  const { prevPage, nextPage } = props.pageContext;
  const presentationPath = props.location.pathname.split('/', 3).join('/');
  const prevPageUrl = `${presentationPath}/${prevPage}`;
  const nextPageUrl = `${presentationPath}/${nextPage}`;

  const navigate = ({ keyCode }) => {
    const nextButtonClicked = NEXT_PAGE_KEYCODES.some((key) => key === keyCode);
    if ((keyCode === PREV_PAGE_KEYCODE && !prevPage) || (nextButtonClicked && !nextPage)) {
      return false;
    } else if (nextButtonClicked && nextPage) {
      props.navigate(nextPageUrl);
    } else if (keyCode === PREV_PAGE_KEYCODE) {
      props.navigate(prevPageUrl);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', navigate);
    return () => {
      document.removeEventListener('keydown', navigate);
    };
  });

  return (
    <div style={{ width: '100%' }}>
      <SlideNavigation>
        {prevPage ? <Link to={prevPageUrl}>Prev</Link> : <div>&nbsp;</div>}
        {nextPage && <Link to={nextPageUrl}>Next</Link>}
      </SlideNavigation>
      <div dangerouslySetInnerHTML={{ __html: data.slide.html }} />
    </div>
  );
};

export default SlideTemplate;
