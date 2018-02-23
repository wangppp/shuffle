import styled from 'styled-components'
import Link from 'next/link'

const Layout = styled.div`
    padding-right: 20px;
    float: left;
    max-width: 300px;
    & ul {
        list-style-type: none;
        margin: 6px 0 0;
        line-height: 1.4;
        padding: 0px;
        & li {
            font-size: 14px;
            margin: 0;
            & a {
                display: block;
                padding: 6px 0;
                color: #1e8cbe;
                text-decoration: none;
                display: block;
                padding: 6px 0;
            }
        }
    }
`

const LeftSider = ({rank}) => (
    <Layout>
        <h4>本月文章排行</h4>
        <ul>
            {
                rank.map(r => (
                    <li key={r.id}><Link as={`/post/${r.en_title}`} href={`/post?title=${r.en_title}`}><a href="#">{r.title}</a></Link></li>
                ))
            }
        </ul>
    </Layout>
)

export default LeftSider
