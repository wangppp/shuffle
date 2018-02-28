import React from 'react'
import Header from './Header'
import styled from 'styled-components'
import { initGA, logPageView } from '../utils/analytics'


const LayoutDiv = styled.div`
    width: 100%;
`

const MiddleLayout = styled.div`
    padding: 0 20px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`

export const PaddingGap = styled.div`
    padding: 23px 0;
`

export { MiddleLayout }

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()
    }

    render() {
        const { children, primary } = this.props
        return (
            <LayoutDiv>
                <Header primary={primary} />
                {children}
            </LayoutDiv>
        )
    }
}
