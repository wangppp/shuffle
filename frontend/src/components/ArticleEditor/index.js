import { Editor } from 'react-draft-wysiwyg'
import React, { Component } from 'react'

class ArticleEditor extends Component {
    render() {
        return (
            <Editor
            {...this.props}
            wrapperClassName="article-editor-wrapper"
            editorClassName="article-editor"
            />
        );
    }
}

export { ArticleEditor };
