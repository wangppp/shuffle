import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import React, { Component } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class ArticleEditor extends Component {
    constructor (props) {
        super(props)
        this.state = { editorState: EditorState.createEmpty() }
        this.onEditorStateChange = (state) => {
            this.setState({editorState: state})
            this.props.OnChange && this.props.OnChange(state)
        }
        
    }

    render() {
        let { editorState } = this.state
        return (
            <Editor
            editorState={editorState}
            wrapperClassName="article-editor-wrapper"
            editorClassName="article-editor"
            onEditorStateChange={this.onEditorStateChange} />
        );
    }
}

export { ArticleEditor };
