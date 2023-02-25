import { getAllpostsId, getPostData, IPostData } from '@/lib/posts';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from '@/styles/Post.module.css';

export async function getStaticPaths() {
  const postsId = await getAllpostsId();

  return {
    paths: postsId,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);

  return {
    props: postData
  }
}

export default function Post(postData: IPostData) {

  return (
    <div className={styles.post}>
      <Link
        href='/'
      >
        Back to Home
      </Link>
      <div className={styles.title}>
        {postData.title}
      </div>
      <div className={styles.date}>
        {postData.date.year} {postData.date.month} {postData.date.day} {postData.date.hour} : {postData.date.minute}
      </div>
      <ReactMarkdown>
        {postData.content}
      </ReactMarkdown>
    </div>
  )
}