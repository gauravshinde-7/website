import React from 'react'
import { Link } from 'gatsby'
import { OneLineByline } from '~components/pages/blog/byline'
import RelatedPostsStyles from '~components/pages/blog/related-posts.module.scss'

export default ({ posts }) => (
  <div className={RelatedPostsStyles.container}>
    <h2>Related</h2>
    {posts.map(post => (
      <div key={post.slug}>
        <h3>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <OneLineByline authors={post.authors} date={post.publishDate} />
      </div>
    ))}
  </div>
)
