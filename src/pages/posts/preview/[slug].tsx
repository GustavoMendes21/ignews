import { PrismicRichText } from "@prismicio/react"
import {  GetStaticPaths, GetStaticProps } from "next"
import { getSession, useSession } from "next-auth/react"
import Head from "next/head"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { useEffect } from "react"
import { createClient } from "../../../services/prismic"

import styles from '../post.module.scss'

interface PostPreviewProps {
  post: {
    slug:  string,
    title: string,
    content: [],
    updatedAt: string
  }
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])
  
  return (
    <>
      <Head>
        <title> {post.title}| Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div className={`${styles.postContent} ${styles.previewContent}`}>
            <PrismicRichText field={post.content} />
          </div>
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a href="">Subscribe Now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const client = createClient()

  const response = await client.getByUID('posts', String(slug), {})

  const post = {
    slug,
    title: response.data.Title,
    content: response.data.content.splice(0,3),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })  
  }

  return {
    props: {
      post
    },
    redirect: 60 * 30, // 30 minutos
  }
}

