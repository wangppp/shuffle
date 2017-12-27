import React, { Component } from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react';
import { ArticleEditor } from '../../../components/ArticleEditor';
import http from '../../../utils/http';
import { convertToRaw } from 'draft-js';
import { connect } from 'react-redux';
import { contentChange, setFormChange } from '../actions'

class Dashboard extends Component {

  constructor (props) {
    super(props);
    this.clickSaveArticle = (e) => {
      http.post('/admin/article', {
        title: 'Do we Succeed!?',
        content: convertToRaw(this.state.editorState.getCurrentContent())
      }).then(res => {})
    }
  }
  
  render() {
    const { contentChange, tag_options, form_value, formFieldChange } = this.props;
    console.log("rendered!")
    return ( 
      <div >
        <Message
          color='blue'
          attached
          header='从这里开始写文章!'
          content='Fill out the form below to sign-up for a new account'
        />
        <Form className='attached fluid segment'>
          
          <Form.Input 
              name='head_title'
              value={form_value.head_title}
              label='文章标题'
              placeholder='不超过100字'
              onChange={formFieldChange}
              type='text' />
          <Form.Input 
              name='en_title'
              value={form_value.en_title}
              label='文章英文title'
              onChange={formFieldChange}
              placeholder='不超过100字'
              type='text' />

          <ArticleEditor 
              editorState={this.props.new_article_content}
              onEditorStateChange={contentChange} /><br/>

          <Form.Group>
            <Form.Select
                name='tag'
                value={form_value.tag}
                label='文章标签'
                onChange={formFieldChange}
                options={tag_options}
                width={4} />
          </Form.Group>

          <Form.Group>
            <Form.Checkbox
                name='post_to_index'
                checked={form_value.post_to_index}
                onChange={formFieldChange}
                inline
                label='立即发布到主页'
                width={4} />
          </Form.Group>
          
          <Button color='blue'>Submit</Button>
        </Form>
        <Message attached='bottom' warning>
          <Icon name='help' />
          Ready to post...
        </Message>
      </div>
    );
  }
}

function  mapStateToProps (state) {
  return {
    new_article_content: state.home.new_article_content,
    tag_options: state.home.tag_options,
    form_value: state.home.form_value
  }
}

function mapDispatchToProps(dispatch) {
  return {
    contentChange: (new_content) => {
      dispatch(contentChange(new_content))
    },
    formFieldChange: (e, form_change_value_obj) => {
      dispatch(setFormChange(form_change_value_obj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);