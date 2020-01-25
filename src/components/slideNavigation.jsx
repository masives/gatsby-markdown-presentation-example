import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledSlideNavigation = styled('nav')`
  display: flex;

  justify-content: space-between;
`;
const NEXT_PAGE_KEYCODES = [13, 32, 39];
const PREV_PAGE_KEYCODE = 37;

const SlideNavigation = ({ pathname, navigate, prevPage, nextPage }) => {
  const presentationPath = pathname.split('/', 3).join('/');
  const prevPageUrl = `${presentationPath}/${prevPage}`;
  const nextPageUrl = `${presentationPath}/${nextPage}`;

  const handleNavigation = ({ keyCode }) => {
    const nextButtonClicked = NEXT_PAGE_KEYCODES.some((key) => key === keyCode);
    if ((keyCode === PREV_PAGE_KEYCODE && !prevPage) || (nextButtonClicked && !nextPage)) {
      return false;
    } else if (nextButtonClicked && nextPage) {
      navigate(nextPageUrl);
    } else if (keyCode === PREV_PAGE_KEYCODE) {
      navigate(prevPageUrl);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleNavigation);
    return () => {
      document.removeEventListener('keydown', handleNavigation);
    };
  });

  return (
    <StyledSlideNavigation>
      {prevPage ? <Link to={prevPageUrl}>Prev</Link> : <div>&nbsp;</div>}
      {nextPage && <Link to={nextPageUrl}>Next</Link>}
    </StyledSlideNavigation>
  );
};

export default SlideNavigation;
