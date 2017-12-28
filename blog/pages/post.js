import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw } from 'draft-js'
import { getArticleByEnTitle } from '../utils/api'
import { Component } from 'react'

const Post = ({ article_obj, article_content}) => (
    <div>
        <Editor
            editorKey="editor"
            readOnly
            toolbar={{
                options: []
            }}
            toolbarHidden={true}
            editorState={article_content}
        />
    </div>
)

class PostContent extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const { article_obj, article_content } = this.props
        const new_state = EditorState.createWithContent(convertFromRaw(article_content))
        return (
            <div>
                <Editor
                    editorKey="foo"
                    readOnly
                    toolbar={{
                        options: []
                    }}
                    toolbarHidden={true}
                    editorState={new_state} />
            </div>
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
