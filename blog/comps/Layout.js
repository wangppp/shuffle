import Header from './Header'
import styled from 'styled-components'

const LayoutDiv = styled.div`
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
`

const Layout = ({children}) => (
    <LayoutDiv>
        <Header />
        {children}
    </LayoutDiv>
)

export default Layout
