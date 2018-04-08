import Link from 'next/link'
import styled, {css} from 'styled-components'
import NProgress from 'nprogress'
import Router, {withRouter} from 'next/router'

// Router change with progress bar animation
Router.onRouteChangeStart = url => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

const HeaderDiv = styled.div`
    width: 100%;
    height: 46px;
    padding: 20px;
    background-color: transparent;
    position: absolute;
    top: 0;
    z-index:1000;
`;
const StyledLink = styled.a`
    color: rgba(255,255,255,0.9);
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
        color: rgba(255,255,255,1);
        cursor: pointer;
    }
    
    ${props => props.primary && css`
        border-bottom-color: rgba(255,255,255,1);
        color: rgba(255,255,255,1);
        font-weight: 500;
    `}
`
const LogoDiv = styled.div`
    width: 68px;
    height: 50px;
    background-image: url('/static/imgs/logo_.png');
    background-size: cover;
    display: inline-block;
    cursor: pointer;
    margin-right: 40px;
`

const LinksWrapper = styled.nav`
    float: right;
`

const ActiveLink = withRouter(({href, text, router}) => {
    console.log(router.pathname, href)
    const isPrimary = router.pathname === href || 
        ((router.pathname === "/" || router.pathname === "index") && (href === "" || href === "/"))
    return (
        <Link href={href}>
            <StyledLink primary={isPrimary}>{text}</StyledLink>
        </Link>
    )
})

const Header = ({primary}) => {
    return (
        <HeaderDiv>
            <Link href='/'>
                <LogoDiv/>
            </Link>
            <LinksWrapper>
                <ActiveLink
                    text="主页"
                    href="/"
                />
                {/* 文章
                    视频
                    产品 */}
                <ActiveLink
                    text="关于"
                    href="/about"
                />
    
            </LinksWrapper>
        </HeaderDiv>
    )
}

export default Header
