import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPostsData, IPostData } from '@/lib/posts'

export async function getStaticProps() {
  const postsData: IPostData[] = await getAllPostsData();

  return {
    // Props must be returned as a plain object from getStaticProps.
    // Because gameCardsData is array, it must be converted to Object.
    props: {
      postsData
    }
  }
}

export default function Home({ postsData }: { postsData: IPostData[] }) {

  return (
    <>
      <Head>
        <title>Like a Diamond</title>
        <meta name="description" content="HENOZIWD's personal page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.profile}>
        <Image 
          src="/favicon.ico"
          alt="err"
          width={200}
          height={200}
        />
        <h1>
          Like a Diamond
        </h1>
        <article>
          HENOZIWD's personal page.
        </article>
        <div className="Temp-profileLinks">
          <Link
            href="https://github.com/HENOZIWD"
            target="_black"
            rel="noopener noreferrer"
          >
            <Image 
              src="/github-mark.svg"
              alt="err"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
      <div className="Temp-postCardsContainer">
        {postsData.map((post: IPostData) => {
          
          return (
            <div className="Temp-postCard">
              <h3>
                {post.title}
              </h3>
              {post.description}
            </div>
          )
        })}
      </div>
    </>
  )
}
