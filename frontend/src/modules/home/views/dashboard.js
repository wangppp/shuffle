import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { ArticleEditor } from '../../../components/ArticleEditor';
import http from '../../../utils/http'
import { convertToRaw } from 'draft-js'

class Dashboard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      editorState: {}
    }
    this.OnChange = (editorState) => {
      this.setState({
        editorState
      })
    }

    this.clickSaveArticle = (e) => {
      http.post('/admin/article', {
        title: 'Do we Succeed!?',
        content: convertToRaw(this.state.editorState.getCurrentContent())
      }).then(res => {})
    }
  }
  
  render() {
    return ( 
      <div >
        <ArticleEditor OnChange={this.OnChange} />
        <Button content="Save" onClick={this.clickSaveArticle}/>
      </div>
    );
  }
}

export default Dashboard;