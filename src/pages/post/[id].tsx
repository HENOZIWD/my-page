import { getAllpostsId, getPostData, IPostData } from '@/lib/posts';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import styles from '@/styles/Post.module.css';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Head from 'next/head';

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
    <>
    <Head>
      <title>{`${postData.title} - Like a Diamond`}</title>
    </Head>
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
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({node, inline, className, children, style, ...props}) {

            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}>
        {postData.content}
      </ReactMarkdown>
    </div>
    </>
  )
}