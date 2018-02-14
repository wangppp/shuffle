import Header from './Header'
import styled from 'styled-components'

const LayoutDiv = styled.div`
    width: 100%;
    /* background-image: url('/static/imgs/sparks.jpeg'); */
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
`

const MiddleLayout = styled.div`
    max-width: 1350px;
    margin-left: auto;
    margin-right: auto;
`

const Layout = ({children, primary}) => (
    <LayoutDiv>
        <Header primary={primary} />
        {children}
    </LayoutDiv>
)

export const PaddingGap = styled.div`
    padding: 30px 0;
`

export { MiddleLayout }

export default Layout
