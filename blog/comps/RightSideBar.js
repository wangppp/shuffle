import styled from 'styled-components'
import HeadArticle from './HeadArticle'

const ListLayout = styled.div`
    position: relative;
    & .thumbernail {
        position: absolute;
        width: 30%;
        bottom: 30px;
        top: 0;
        float: left;
        background: #f3f6f8 url('/static/imgs/image-placeholder.svg') center center no-repeat;
        background-size: cover;
        border: 1px solid rgba(200, 215, 225, 0.5);
    }
    & .article-info {
        border-bottom: 1px solid #f3f6f8;
        margin-bottom: 30px;
        margin-left: calc(30% + 20px );
    }
`
const ArticleList = ({article}) => {
    return (
        <ListLayout className="post">
            {/* 取article里面的thumbnail地址 */}
            <div
                style={{backgroundImage: `url(${article.thumbnail})`}}
                className="thumbernail"/>
    
            <div className="article-info">
                <HeadArticle article={article} />
            </div>
        </ListLayout>
    )
}

const Layout = styled.div`
    max-width: 880px;
    float: right;
    position: relative;
    width: 100%;
`

const RightSider = ({children, articles}) => (
    <Layout>
        {
            articles.map(article => (
                <ArticleList
                article={article}
                key={article.id}/>
            ))
        }
        
    </Layout>
)

export default RightSider
