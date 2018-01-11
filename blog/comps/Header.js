import Link from 'next/link'
import styled from 'styled-components'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'

// Router change with progress bar animation
Router.onRouteChangeStart = url => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()



const HeaderDiv = styled.div`
    margin: 2em auto;
`
const StyledLink = styled.a`
    color: rgba(0,0,0,0.75);
    font-weight: 400;
    font-size: 15px;
    cursor: pointer;
    padding: 10px 10px;
    letter-spacing: 0.5px;
    font-family: "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
    transition: background 0.3s ease;
    margin-right: 10px;
    &:hover {
        color: white;
        background-color: orange;
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

const Header = () => (
    <HeaderDiv>
        <Head>
            {/* Import CSS for nprogress */}
            <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
        </Head>
        <Link href='/'>
            <LogoDiv>W</LogoDiv>
        </Link>
        <Link href='/'>
            <StyledLink>Home</StyledLink>
        </Link>
        <Link href='/about'>
            <StyledLink>About</StyledLink>
        </Link>
    </HeaderDiv>
)

export default Header
