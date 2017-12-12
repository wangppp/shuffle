import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getArticleListFromServe } from '../actions'
import ArticleTable from './article_table'

class ArticlePage extends Component {
    componentDidMount () {
        this.props.getArticle()
    }

    render() {
        const { list } = this.props
        return (
            <div>
                <ArticleTable data={list} />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        list: state.articles.article_list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticle: () => {
            // dispatch recived a promise function as reducer action thanks to react-redux-thunk
            dispatch(getArticleListFromServe(dispatch))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
