import styled from 'styled-components'
import Clock from '../res/clock'
import CommentIcon from '../res/comment'
import Link from 'next/link'
import {getTime} from '../utils/time'

const HeadArticle = ({article}) => (
    <StyledHeadArticle>
        <h2>
            <Link as={`/post/${article.en_title}`} href={`/post?title=${article.en_title}`}>
                <a>{article.title}</a>
            </Link>
        </h2>
        <h3>{article.caption}</h3>
        <div className="post-info">
            <div className="post-comments-date">
                <Clock />
                <span className="date">{article.updated_at ? getTime(article.updated_at) : '*'}</span>
                {/* <span className="divider"> / </span>
                <a className="comments" href="#">
                    <CommentIcon />
                    1
                </a> */}
            </div>
            <img alt="" src="//res.cloudinary.com/dvr2kk33p/image/upload/c_scale,w_100/v1519369280/Vterm_dbiftu.png" className="avatar" height="64" width="64" />
            <p className="post-author-name">Admin</p>
        </div>
    </StyledHeadArticle>
)

const StyledHeadArticle = styled.div`
    margin-top: 20px;
    & h2 {
        &:hover{
            cursor: pointer;
        }
        margin: 0;
        font-weight: 700;
        line-height: 1.2;
        font-size: 42px;
        margin: 0 auto;
        color: #2e4453;
        -webkit-font-smoothing: antialiased;
    }

    & h3 {
        margin: 0;
        padding-top: 17px;
        font-size: 16px;
        color: #2e4453;
    }
    & svg {
        fill: #87a6bc;
        width: 14px;
        height: 14px;
        position: relative;
        top: 2px;
        margin-right: 4px
    }
    & .post-info {
        padding-bottom: 20px;
        margin: 0 0 38px 0;
        border-bottom: 1px solid rgba(200, 215, 225, 0.5);
    }
    & .post-comments-date {
        color: #87a6bc;
        font-size: 14px;
        float: right;
        position: relative;
        & a {
            display: inline-block;
            cursor: pointer;
            color: #87a6bc;
        }
    }
    & .avatar{
        width: 32px;
        height: 32px;
        border-radius: 100%;
        float: left;
        margin-right: 12px;
    }
    & .post-author-name{
        position: relative;
        top: 0.25em;
        font-size: 15px;
        line-height: 1.6em;
        margin-bottom: 1.6em;
        color: #87a6bc;
    }
    & a{
        text-decoration: none;
        color: #2e4453;
    }
`

export default HeadArticle
