import styled from 'styled-components';
import {Button} from './Button';
import Header from './Header';

const StyledHeroImage = styled.div`
  height: ${({mini}) => {
      if (mini === true) return '70vh'
      return '100vh';
  }};
  max-height: 1200px;
  width: 100%;
  background-image: url('${({img}) => img}');
  background-position: center;
  background-size: cover;
`

const StyledHeroContent = styled.div`
  width: 100%;
  position: relative;
  &>.glass-overlay{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 99;
  }
  &>.hero-title{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
`


const HeroImage = (props) => (
    <StyledHeroImage {...props} />
)


const HeroContent = ({img, children, post}) => (
    <StyledHeroContent>
        <Header primary={true} />
        <div className="glass-overlay" />
        <div className="hero-title">
            {children}
        </div>
        <HeroImage
            mini={typeof post !== 'undefined' ? true : false}
            img={img}
        />

    </StyledHeroContent>
)

export default HeroContent
