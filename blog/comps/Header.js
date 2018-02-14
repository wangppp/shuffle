import Link from 'next/link'
import styled, {css} from 'styled-components'
import NProgress from 'nprogress'
import Router from 'next/router'

// Router change with progress bar animation
Router.onRouteChangeStart = url => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

const HeaderDiv = styled.div`
    width: 100%;
    height: 46px;
    background-color: #fefefe;
    box-shadow: 0 0 4px rgba(0,0,0,.12), 0 4px 4px rgba(0,0,0,.1);
    position: fixed;
    top: 0;
`;
const StyledLink = styled.a`
    color: rgba(0,0,0,.54);
    padding: 0 24px;
    font-weight: 400;
    font-size: 14px;
    cursor: pointer;
    letter-spacing: 0.5px;
    font-family: "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
    margin-right: 10px;
    height: 46px;
    display: inline-block;
    line-height: 46px;
    border-bottom: 2px solid transparent;
    box-sizing: border-box;
    &:hover {
        color: rgba(0,0,0,.87);
        cursor: pointer;
    }
    
    ${props => props.primary && css`
        border-bottom-color: #0277bd;
        color: #3c4367;
        font-weight: 500;
    `}
`
const LogoDiv = styled.div`
    width: 246px;
    height: 46px;
    background-image: url('/static/imgs/logo-text.png');
    background-size: cover;
    display: inline-block;
    cursor: pointer;
    margin-right: 40px;
`

const LinksWrapper = styled.nav`
    float: right;
`

const Header = ({primary}) => (
    <HeaderDiv>
        <Link href='/'>
            <LogoDiv/>
        </Link>
        <LinksWrapper>
            <Link href='/'>
                <StyledLink primary={true}>主页</StyledLink>
            </Link>
            <Link href='/about'>
                <StyledLink>文章</StyledLink>
            </Link>
            <Link href='/about'>
                <StyledLink>视频</StyledLink>
            </Link>
            <Link href='/about'>
                <StyledLink>产品</StyledLink>
            </Link>
            <Link href='/about'>
                <StyledLink>合作</StyledLink>
            </Link>

        </LinksWrapper>
    </HeaderDiv>
)

export default Header
