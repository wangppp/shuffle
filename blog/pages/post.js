import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js'
import { getArticleByEnTitle } from '../utils/api'
import { Component } from 'react'
import Layout from '../comps/Layout'
import styled from 'styled-components'
import { getTime } from '../utils/time'

const SmallTitle = styled.div`
    color: #333;
    font-size: 12px;
    margin-bottom: 20px;
`

class PostContent extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const { article_obj, article_content } = this.props
        const new_state = EditorState.createWithContent(convertFromRaw(article_content))
        return (
            <Layout>
                <div>
                    <h3>
                        {article_obj.title}
                    </h3>
                    <SmallTitle>发布于 {getTime(article_obj.created_at)}</SmallTitle>
                </div>
                <Editor
                    editorKey="foo"
                    readOnly
                    toolbar={{
                        options: []
                    }}
                    toolbarHidden={true}
                    editorState={new_state} />
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
