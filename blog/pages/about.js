import Layout, { MiddleLayout, PaddingGap } from '../comps/Layout'

const HeadLine = () => (
    <h5>Email: adamwang@gmail.com</h5>
)

const About = () => (
    <Layout>
        <PaddingGap />
        <MiddleLayout>
            <p>Please tell me your thoughts about this site.</p>
            <HeadLine/>
        </MiddleLayout>
    </Layout>
)

export default About
