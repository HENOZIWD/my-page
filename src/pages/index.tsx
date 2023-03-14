import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPostsData, IPostCardData } from '@/lib/posts'
import { useContext, useState } from 'react'
import { useThemeContext } from '@/components/layout'

export async function getStaticProps() {
  const postsData: IPostCardData[] = await getAllPostsData();

  return {
    // Props must be returned as a plain object from getStaticProps.
    // Because gameCardsData is array, it must be converted to Object.
    props: {
      postsData
    }
  }
}

export default function Home({ postsData }: { postsData: IPostCardData[] }) {

  const isThemeNight = useThemeContext();

  return (
    <>
      <Head>
        <title>Like a Diamond</title>
        <meta name="description" content="HENOZIWD's personal page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={isThemeNight ? "#232323" : "#dcdcdc"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={isThemeNight ? styles.night : styles.day}>
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
            HENOZIWD&apos;s personal page.
          </article>
          <div>
            <Link
              href="https://github.com/HENOZIWD"
              target="_black"
              rel="noopener noreferrer"
            >
              <Image 
                src={isThemeNight ? "/github-mark-white.svg" : "/github-mark.svg"}
                alt="err"
                width={20}
                height={20}
              />
            </Link>
          </div>
        </div>
        <div className={styles.grid}>
          {postsData.map((post: IPostCardData) => {
            
            return (
              <Link
                key={post.id}
                href={`/post/${post.id}`}
              >
                <div 
                  key={post.id}
                  className={styles.card}
                >
                  <h3>
                    {post.title}
                  </h3>
                  <div>
                    <div>{post.description}</div>
                    <div>{post.date.year} {post.date.month} {post.date.day}</div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
