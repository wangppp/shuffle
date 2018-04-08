import Layout, { MiddleLayout, PaddingGap } from '../comps/Layout'
import HeroContent from '../comps/HeroContent'
import {HeroArticle} from '../comps/HeadArticle'



const About = () => (
    <Layout>
        <HeroContent
            img="http://res.cloudinary.com/dvr2kk33p/image/upload/v1519971308/photo-1515311541935-8e5a245b2999.jpg"
            post
        >
            <HeroArticle
                article={{title: '关于站长'}}
                slim
                post
            />
        </HeroContent>
        <MiddleLayout style={{}}>

            <h3>我是一位web开发者，热爱开源社区</h3>
            
            <p>
                这个网站是我用来记录平时的生活心得，以及工作中的一些想与大家分享的经验体会。
                
            </p>

            <p>
                如果你想与我联系交流，可以发送邮件给我: <a>wangpeng0610@gmail.com</a>
            </p>

            <p>You can send email to wangpeng0610@gmail.com to contact with me.</p>
        </MiddleLayout>
    </Layout>
)

export default About
