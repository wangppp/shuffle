import Layout, { MiddleLayout, PaddingGap } from '../comps/Layout'
import HeroContent from '../comps/HeroContent'
import { getArticles } from '../utils/api'
import styled from 'styled-components'
import Link from 'next/link'

const PainLink = styled.a`
    cursor: pointer;
`
const LinkWrapper = styled.div`
    font-size: 16px;
    margin: 10px 0px;
`



const PostLink = ({title, en_title}) => (
    <LinkWrapper>
      <Link as={`/post/${en_title}`} href={`/post?title=${en_title}`}>
        <PainLink>{title}</PainLink>
      </Link>
    </LinkWrapper>
  )

const Index = ({ articles }) => (
    <Layout>
        <PaddingGap />
        <MiddleLayout>
            <HeroContent />
            <div>
                <h2>
                    近期文章
                </h2>
                {articles.map(at => (
                    <div key={at.id}>
                        <PostLink title={at.title} en_title={at.en_title} />
                    </div>
                ))}
            </div>
        </MiddleLayout>
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
