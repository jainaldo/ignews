import Head from "next/head";
import styles from './styles.module.scss'
import { GetStaticProps } from "next";
import { getPrismicClient } from "../../services/prismic";
import { stringify } from "querystring";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Axios - um cliente HTTP Full Stack</strong>
            <p>Axios é um cliente HTTP baseado em Promises para fazer requisições. Pode ser utilizado tanto no navegador quando no Node.js</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Axios - um cliente HTTP Full Stack</strong>
            <p>Axios é um cliente HTTP baseado em Promises para fazer requisições. Pode ser utilizado tanto no navegador quando no Node.js</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Axios - um cliente HTTP Full Stack</strong>
            <p>Axios é um cliente HTTP baseado em Promises para fazer requisições. Pode ser utilizado tanto no navegador quando no Node.js</p>
          </a>
          <a href="#">
            <time>12 de março de 2021</time>
            <strong>Axios - um cliente HTTP Full Stack</strong>
            <p>Axios é um cliente HTTP baseado em Promises para fazer requisições. Pode ser utilizado tanto no navegador quando no Node.js</p>
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const posts = await prismic.getByType("post", {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  })

  console.log(JSON.stringify(posts, null, 2));

  return {
    props: {
      posts
    }
  }
}