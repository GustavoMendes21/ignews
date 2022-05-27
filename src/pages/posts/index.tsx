import Head from 'next/head'
import styles from './styles.module.scss'
import { createClient } from '../../services/prismic'

import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostProps {
  posts: Post[]
}

export default function Posts( { posts }: PostProps ) {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`}  key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>

    </>
  )
}

export const getStaticProps = async () => {
  const client = createClient()

  const response = await client.getAllByType("posts")

  const posts = response.map(post => {
    return {
      slug: post.uid,
      title: post.data.Title,
      excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '', 
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })    
    }
  })


  return {
    props: { posts }
  }
}
