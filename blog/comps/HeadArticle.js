import styled from 'styled-components'
import Clock from '../res/clock'
import CommentIcon from '../res/comment'
import Link from 'next/link'
import {getTime} from '../utils/time'

const HeadArticle = ({article}) => (
    <StyledHeadArticle>
        <h4>{article.updated_at ? getTime(article.updated_at) : '*'}</h4>
        <h2>
            <Link as={`/post/${article.en_title}`} href={`/post?title=${article.en_title}`}>
                <a>{article.title}</a>
            </Link>
        </h2>
        <h3>{article.caption}</h3>
        <div className="post-info">
            <div className="post-comments-date">
                {/* <span className="divider"> / </span>
                <a className="comments" href="#">
                    <CommentIcon />
                    1
                </a> */}
            </div>
            <p className="post-author-name">Admin</p>
        </div>
    </StyledHeadArticle>
)

const HeroArticle = ({article, post}) => (
    <StyledHeroArticle>
        <div className="title-box">
            <Link as={`/post/${article.en_title}`} href={`/post?title=${article.en_title}`}>
            <div className="c">
                <h2>
                    {article.updated_at ? getTime(article.updated_at) : '*'}
                </h2>
                <h1>{article.title}</h1>
                {
                    typeof post !== 'undefined' ? 
                    null :
                    <h2 className="view-post">View Post→</h2>
                }
            </div>
            </Link>
        </div>
    </StyledHeroArticle>
)

const StyledHeroArticle = styled.div`
    color: white;
    /* display: flex; */
    /* flex-direction: row; */
    height: 100%;
    justify-content: center;
    & .title-box{
        height: 100%;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        &>.c {
            cursor:pointer;
            h2{
                font-family: Times, TimesNR, 'New Century Schoolbook',Georgia, 'New York', serif;
                font-size: 24px;
                line-height: 1.5em;
                text-transform: none;
                letter-spacing: 1px;
                font-weight: 400;
                font-style: italic;
                color: #fff;
                line-height: 1.125em;
                margin-bottom: .75em;
                text-align: center;
            }
            h1{
                font-size: 68px;
                font-family: Times, TimesNR, 'New Century Schoolbook',Georgia, 'New York', serif;
                text-align: center;
            }
        }
    }
    
`

const StyledHeadArticle = styled.div`
    margin-top: 20px;
    & h4{
        font-size: 18px;
        color: rgba(26,26,26,.4);
        font-family: Times, TimesNR, 'New Century Schoolbook',Georgia, 'New York', serif;
    }
    & h2 {
        &:hover{
            cursor: pointer;
        }
        margin: 0;
        line-height: 1.2;
        font-size: 32px;
        margin: 0 auto;
        color: #2e4453;
        -webkit-font-smoothing: antialiased;
        font-family: Times, TimesNR, 'New Century Schoolbook',Georgia, 'New York', serif;
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

export {HeroArticle}
