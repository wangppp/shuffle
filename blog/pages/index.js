import Layout from '../comps/Layout'
import { getArticles } from '../utils/api'
import Link from 'next/link'

const PostLink = ({title, en_title}) => (
    <li>
      <Link as={`/post/${en_title}`} href={`/post?title=${en_title}`}>
        <a>{title}</a>
      </Link>
    </li>
  )

const Index = ({ articles }) => (
    <Layout>
        <h2>
            Hello, World!
        </h2>
        {articles.map(at => (
            <div key={at.id}>
                <PostLink title={at.title} en_title={at.en_title} /> - 作者: {at.author.name}
            </div>
        ))}
    </Layout>
)

// Server-side 调用组件的getInitialProps
Index.getInitialProps = async function () {
    const articles = await getArticles()
    return {
        articles
    }
}

export default Index
