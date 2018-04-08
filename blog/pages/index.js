import Layout, { MiddleLayout, PaddingGap } from '../comps/Layout'
import HeroContent from '../comps/HeroContent'
import HeadArticle, {HeroArticle} from '../comps/HeadArticle'
import { getArticles, getInitialData } from '../utils/api'
import styled from 'styled-components'
import Link from 'next/link'
import LeftSider from '../comps/LeftSideBar'
import RightSider from '../comps/RightSideBar'

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

const Index = ({ articles, rankList }) => {
    let FirstArticle = null
    let fakeHero = {title: "为社会主义建设添砖加瓦", en_title: "for-communist", caption: "牢记社会主义核心价值观，不忘使命, 砥砺前行。"}
    let left_articles = [];
    if (articles.length > 0) {
        FirstArticle = articles[0]
        left_articles = articles.slice(1)
    }
    FirstArticle = FirstArticle ? FirstArticle : fakeHero
    return (
        <Layout>
            <HeroContent img={FirstArticle.hero_img}>
                <HeroArticle article={FirstArticle} />
            </HeroContent>
            <MiddleLayout>
                <RightSider articles={left_articles} />
                {/* <LeftSider rank={rankList} /> */}
            </MiddleLayout>
        </Layout>
    )
}

// Server-side 调用组件的getInitialProps
Index.getInitialProps = async function () {
    const data = await getInitialData()
    return {
        articles: data.list,
        rankList: data.rank
    }
}

export default Index
