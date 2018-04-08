import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js'
import { getArticleByEnTitle } from '../utils/api'
import { Component } from 'react'
import Layout, { MiddleLayout } from '../comps/Layout'
import styled from 'styled-components'
import HeroContent from '../comps/HeroContent'
import {HeroArticle} from '../comps/HeadArticle'
import { getTime } from '../utils/time'

const SmallTitle = styled.div`
    color: #333;
    font-size: 12px;
    margin-bottom: 20px;
`

const HeroImg = styled.div`
    height: 350px;
    background-image: url(${props => props.heroImg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

class PostContent extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const { article_obj, article_content } = this.props
        const new_state = EditorState.createWithContent(convertFromRaw(article_content))
        return (
            <Layout primary>
                <HeroContent img={article_obj.hero_img} post>
                    <HeroArticle article={article_obj} post/>
                </HeroContent>
                <MiddleLayout style={{paddingTop: '80px'}}>
                    <Editor
                        editorKey="foo"
                        readOnly
                        toolbar={{
                            options: []
                        }}
                        toolbarHidden={true}
                        editorState={new_state} />
                </MiddleLayout>
            </Layout>
        );
    }
}


PostContent.getInitialProps = async function (context) {
    const { title } = context.query

    const article_obj = await getArticleByEnTitle(title)
    const article_raw_content = article_obj.content

    return {
        article_content: article_raw_content,
        // article_content: EditorState.createWithContent(emptyContentState),
        article_obj
    }
}

export default PostContent
