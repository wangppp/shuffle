import Header from './Header'
import styled from 'styled-components'

const LayoutDiv = styled.div`
    width: 100%;
`

const MiddleLayout = styled.div`
    padding: 0 20px;
    max-width: 1200px;
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
    padding: 23px 0;
`

export { MiddleLayout }

export default Layout
