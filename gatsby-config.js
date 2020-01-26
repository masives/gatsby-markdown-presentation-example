module.exports = {
  siteMetadata: {
    title: `Gatsby example`,
    author: `Józef Piecyk`,
    description: `Gatsby example`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
  },
  plugins: [
    // load data from filesystem
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/presentations`,
        name: `presentations`,
      },
    },
    // transform markdown into usable form
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    // image optimization
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // styling
    'gatsby-plugin-styled-components',
    // having static layout so it doesn't rerender on each route change
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.jsx`),
      },
    },
  ],
};
