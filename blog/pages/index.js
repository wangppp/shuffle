import Layout from '../comps/Layout'
import { getArticles } from '../utils/api'

const Index = ({ articles }) => (
    <Layout>
        <h2>
            Hello, World!
        </h2>
        {
            articles.map(at => (
                <div key={at.id}>
                    {at.title} - 作者 - {at.author.name}
                </div>
            ))
        }
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
