const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

const createPresentationPages = async ({ graphql, actions, createContentDigest, createNodeId }) => {
  const { createPage, createNode } = actions;

  const result = await graphql(
    `
      {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/content/presentations/" } }) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
            html
          }
        }
      }
    `,
  );

  if (result.errors) {
    throw result.errors;
  }

  const presentations = result.data.allMarkdownRemark.nodes;

  presentations.forEach((presentation) => {
    const slideNodes = presentation.html.split('<hr>').map((html, index) => {
      return {
        id: createNodeId(`${presentation.id}_${index + 1} >>> Slide`),
        node: presentation,
        html,
      };
    });

    slideNodes.forEach(({ node, html, id }, index) => {
      // create graphql node for each slide
      const pageIndex = index + 1;
      createNode({
        id,
        parent: node.id,
        children: [],
        internal: {
          type: `Slide`,
          contentDigest: createContentDigest(html),
        },
        html: html,
        index: pageIndex,
      });

      const hasPrev = pageIndex > 1;
      const hasNext = pageIndex < slideNodes.length;

      // create page for each node
      createPage({
        path: `/presentation${presentation.fields.slug}${pageIndex}`,
        component: path.resolve('./src/templates/slide.jsx'),
        context: {
          id,
          prevPage: hasPrev ? pageIndex - 1 : null,
          nextPage: hasNext ? pageIndex + 1 : null,
        },
      });
    });
  });

  // Create full presentations as fallback.
  const posts = result.data.allMarkdownRemark.nodes;
  posts.forEach((post, index) => {
    createPage({
      path: '/presentation' + post.fields.slug,
      component: path.resolve(`./src/templates/presentation.jsx`),
      context: {
        slug: post.fields.slug,
      },
    });
  });
};

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Slide implements Node {
      html: String!
      index: Int!
    }
  `);
};

exports.createPages = async ({ graphql, actions, createContentDigest, createNodeId }) => {
  await createPresentationPages({
    graphql,
    actions,
    createContentDigest,
    createNodeId,
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
