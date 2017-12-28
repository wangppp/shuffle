import { Editor } from 'react-draft-wysiwyg'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { convertToRaw } from 'draft-js'
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { setArticleID, getArticleContent, setArticleContent, updateExistArticle } from '../actions'

class UpdateArticle extends Component {

    componentDidMount () {
        const { match, setArticleId, getArticleContent } = this.props
        const article_id = match.params.id
        setArticleId(article_id)
        getArticleContent(article_id)
    }

    render() {
        const {title, article_content, setContent, match, updateArticle } = this.props

        return (
            <div>
                <h1>{title}</h1>
                <Editor
                    editorState={article_content}
                    wrapperClassName="article-editor-wrapper"
                    editorClassName="article-editor"
                    onEditorStateChange={setContent} />
                <br/>
                <Button content="Update" onClick={(e) => {
                    updateArticle(match.params.id, convertToRaw(
                        article_content.getCurrentContent()
                    ))
                }} />
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        article_content: state.articles.article_content,
        title: state.articles.current_title
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setArticleId: (id) => {
            dispatch(setArticleID(id))
        },
        getArticleContent: (id) => {
            dispatch(getArticleContent(dispatch, id))
        },
        setContent (content) {
            dispatch(setArticleContent(content))
        },
        updateArticle(id, content) {
            dispatch(updateExistArticle(dispatch, id, content))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateArticle))
