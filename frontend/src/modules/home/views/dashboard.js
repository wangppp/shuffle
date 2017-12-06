import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { ArticleEditor } from '../../../components/ArticleEditor';
import http from '../../../utils/http'

class Dashboard extends Component {

  constructor (props) {
    super(props)
    this.state = {
      editorSate: {}
    }
    this.OnChange = (editorSate) => {
      this.setState({
        editorSate
      })
    }

    this.clickSaveArticle = (e) => {
      http.post('/article', {
        title: 'hey, how\'re u doing?',
        content: this.state.editorSate
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