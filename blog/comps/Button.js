import styled, {css} from 'styled-components'

const Button = styled.button`
  font-size: 14px;
  border-radius: 2px;
  padding: 0 48px;
  line-height: 48px;
  font-weight: 500;
  margin-right: 16px;
  background: #fff;
  border: 1px solid #dfdfdf;
  color: #4285f4;
  ${props => props.primary && css`
    border: none;
    background: #4285f4 16px 50% no-repeat;
    color: white;
  `}
  &:hover {
    cursor: pointer;
  }
`

export {Button}