import Link from 'next/link'
import styled from 'styled-components'

const HeaderDiv = styled.div`
    margin: 2em auto;
`
const StyledLink = styled.a`
    color: rgba(0,0,0,0.75);
    font-weight: 400;
    font-size: 15px;
    cursor: pointer;
    margin: 10px 10px;
    letter-spacing: 0.5px;
    font-family: "Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
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
`

const Header = () => (
    <HeaderDiv>
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
