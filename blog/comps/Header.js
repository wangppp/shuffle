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
    background-color: rgba(0,0,0,0.05);
    position: fixed;
    top: 0;
`
const StyledLink = styled.a`
    color: ${props => {
        return props.primary === true ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.75)";
    }};
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    letter-spacing: 0.5px;
    font-family: "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
    margin-right: 10px;
    height: 56px;
    display: inline-block;
    line-height: 56px;
    vertical-align: top;
    &:hover {
        color: ${props => {
            return props.primary === true ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
        }};
        /* background-color: orange; */
    }
    
`
const LogoDiv = styled.div`
    padding: 10px;
    background-color: rgba(0,0,0,0.75);
    display: inline-block;
    font-size: 36px;
    color: rgba(255,255,255, 0.75);
    line-height: 36px;
    cursor: pointer;
    font-family: medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif;
    margin-right: 40px;
`

const Header = ({ primary }) => (
    <HeaderDiv>
        <Link href='/'>
            <LogoDiv>W</LogoDiv>
        </Link>
        <Link href='/'>
            <StyledLink primary={primary}>Home</StyledLink>
        </Link>
        <Link href='/about'>
            <StyledLink primary={primary}>About</StyledLink>
        </Link>
    </HeaderDiv>
)

export default Header
