import React from 'react';

import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  
  body {
    font-size: 18px;
    line-height: 1.4;
    color: #555;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';

    /* remove margin for the main div that Gatsby mounts into */
    > div {
      margin-top: 0;
    }
    /* More info: https://bit.ly/2PsCnzk */
    * + * {
      margin-top: 1rem;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #222;
    line-height: 1.1;

    + * {
      margin-top: 0.5rem;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease-in-out;

  }
  img {
    height: auto;
    max-width: 100%;
    /* this normalizes after lobotimed owl */
    margin-top: 0rem;
  }
`;

const Main = styled('main')`
  margin: auto;
  max-width: 800px;
  padding: 1rem;
  /* entire view - footer and header, just so footer is always at bottom  */
  min-height: calc(100vh - 42px);
`;
class Layout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <GlobalStyle />
        <Main>{children}</Main>
        <footer>
          Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </>
    );
  }
}

export default Layout;
