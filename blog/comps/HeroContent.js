import styled from 'styled-components';
import {Button} from './Button'

const StyledHeroTitle = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  & h2 {
    color: #36474f;
    font-size: 50px;
    font-weight: lighter;
    line-height: 56px;
    max-width: 600px;
    text-transform: none;
  }
`

const StyledHeroImage = styled.div`
  display: flex;
  flex: 1;
  height: 375px;
  max-width: 400px;
  min-width: 300px;
  & img {
    max-width: 100%;
    border: 0;
  }
`

const StyledHeroContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 20px 0 20px;
`
const HeroTitle = () => (
    <StyledHeroTitle>
        <h2>
            Shuffle, 更快，更优雅的博客程序。
        </h2>
        <h3>利用shuffle创造激动人心的Blog</h3>
        <div>
            <Button primary>与销售人员联系</Button>
            <Button>立即试用</Button>
        </div>
    </StyledHeroTitle>
)

const HeroImage = () => (
    <StyledHeroImage>
        <img src="/static/imgs/hero_img.png" alt=""/>
    </StyledHeroImage>
)

const HeroContent = () => (
    <StyledHeroContent>
        <HeroTitle/>
        <HeroImage/>
    </StyledHeroContent>
)

export default HeroContent
