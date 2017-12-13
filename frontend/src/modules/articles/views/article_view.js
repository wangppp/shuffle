import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg'
import { getArticleContent } from '../actions'

class ArticleView extends Component {
    componentDidMount () {
        const { match } = this.props
        const article_id = match.params.id
        const { getArticle } = this.props
        // 通过route 上的id，来获取文章
        getArticle(article_id)
    }
    render() {
        return (
            <div>   
                <Editor readOnly 
                        editorState={this.props.article_content} />
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        article_content: state.articles.article_content
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticle: (articleId) => {
            dispatch(getArticleContent(dispatch, articleId))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleView))
