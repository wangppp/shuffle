import React, { Component } from 'react';
import { Button, Form, Icon, Message } from 'semantic-ui-react';
import { ArticleEditor } from '../../../components/ArticleEditor';
import http from '../../../utils/http';
import { convertToRaw } from 'draft-js';
import { connect } from 'react-redux';
import { contentChange, setFormChange, getDashboardInitData, saveNewArticle } from '../actions'

// 输入图片地址显示图片
const HeroImgInput = ({ heroImg, onChange }) => (
  <div>
    { 
      heroImg === '' ?
      <Form.Input onChange={onChange} type="text" placeholder="粘贴图片地址"/> :
      <img style={{width: "100%"}} src={heroImg} />
    }
  </div>
)

class Dashboard extends Component {
  constructor (props) {
    super(props);
    const { dispatchSaveArticle } = this.props;
    // 保存文章
    this.clickSaveArticle = (e) => {
      // 在点击的时候构建post，提高些性能
      const post = {
        ...this.props.form_value,
        content: convertToRaw(this.props.new_article_content.getCurrentContent())
      };
      dispatchSaveArticle(post);
    }
  }

  componentDidMount () {
    this.props.getDashboardData();
  }
  
  render() {
    const { contentChange, tag_options, form_value, formFieldChange, form_loading, show_success_msg, hero_img } = this.props;
    return ( 
      <div>
        {
          show_success_msg ? 
          <Message
            color='green'
            attached
            header='发布文章成功!'
            content='您可以从文章版块管理保存的文章'
          /> : 
          null
        }
        <Form className='attached fluid segment' loading={form_loading}>
          
          {
            form_value.hero_img.trim() === '' ?
            <Form.Input 
              name='hero_img'
              value={form_value.hero_img}
              placeholder='粘贴封面图片地址'
              onChange={formFieldChange}
              type='text' /> :
            <img style={{width: "100%"}} src={form_value.hero_img} />
          }
          <Form.Input 
              name='head_title'
              value={form_value.head_title}
              placeholder='文章标题'
              onChange={formFieldChange}
              type='text' />
          <Form.Input 
              name='en_title'
              value={form_value.en_title}
              onChange={formFieldChange}
              placeholder='文章英文title'
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
          
          <Button disabled={show_success_msg} color='blue' onClick={this.clickSaveArticle}>Submit</Button>
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
  const homeState = state.home;
  return {
    new_article_content: homeState.new_article_content,
    tag_options: homeState.tag_options,
    form_value: homeState.form_value,
    form_loading: homeState.form_loading,
    // 显示保存成功状态
    show_success_msg: homeState.show_success_msg
  }
}

function mapDispatchToProps(dispatch) {
  return {
    contentChange: (new_content) => {
      dispatch(contentChange(new_content))
    },
    formFieldChange: (e, form_change_value_obj) => {
      dispatch(setFormChange(form_change_value_obj))
    },
    getDashboardData: () => {
      dispatch(getDashboardInitData())
    },
    dispatchSaveArticle: (post) => {
      dispatch(saveNewArticle(post));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);