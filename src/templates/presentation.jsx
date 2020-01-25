import React from 'react';
import { graphql } from 'gatsby';

export const pageQuery = graphql`
  query PresentationBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
  }
`;

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
