import Link from 'next/link'
import styled from 'styled-components'
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
    background-color: #0085be;
    position: fixed;
    top: 0;
`
const StyledLink = styled.a`
    color: white;
    padding: 0 10px;
    font-weight: 500;
    font-size: 0.9 rem;
    cursor: pointer;
    letter-spacing: 0.5px;
    font-family: "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
    margin-right: 10px;
    height: 46px;
    display: inline-block;
    line-height: 46px;
    transition: background 100ms ease-in-out, color 80ms ease-in-out;
    &:hover {
        background: #00aadc;
        color: white;
        cursor: pointer;
        box-shadow: inset 0 -2px rgba(0, 86, 132, 0.2);
        /* background-color: orange; */
    }
`
const LogoDiv = styled.div`
    width: 46px;
    height: 46px;
    background-image: url(/static/imgs/logo.png);
    background-size: cover;
    display: inline-block;
    cursor: pointer;
    margin-right: 40px;
`

const LinksWrapper = styled.nav`
    float: right;
`

const Header = ({ primary }) => (
    <HeaderDiv>
        <Link href='/'>
            <LogoDiv />
        </Link>
        <LinksWrapper>
            <Link href='/'>
                <StyledLink primary={primary}>Home</StyledLink>
            </Link>
            <Link href='/about'>
                <StyledLink primary={primary}>About</StyledLink>
            </Link>
        </LinksWrapper>
    </HeaderDiv>
)

export default Header
