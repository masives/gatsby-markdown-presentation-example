import React from 'react';
import { graphql } from 'gatsby';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;

    return (
      <article>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query PresentationBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        # date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
