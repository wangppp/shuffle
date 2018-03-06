import React from 'react';
import { Tab, Card, Image, Icon, Pagination } from 'semantic-ui-react';
import DropzoneComponent from 'react-dropzone-component';
import { url_prefix } from '../../../utils/http';
import { getToken } from '../../../utils/auth';
import PropTypes from 'prop-types';
import { getThumbnailSrc } from '../../../utils/resource';
import { getTime } from '../../../utils/time';
import 'dropzone/dist/min/dropzone.min.css';
import { connect } from 'react-redux';
import { pageChange } from '../actions'

const PaginationComponent = ({ active, total, ...props }) => (
  <Pagination
    {...props}
    defaultActivePage={active}
    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
    prevItem={{ content: <Icon name='angle left' />, icon: true }}
    nextItem={{ content: <Icon name='angle right' />, icon: true }}
    totalPages={total}
  />
)

class UploadedPicturesView extends React.Component{
  constructor(props) {
    super(props);
  }

  handlePaginationChange = this.props.paginationChange

  componentDidMount() {
    console.log("pictures is loaded!")
  }

  render() {
    const { page, list, total} = this.props;
    return (
      <div>
        <Card.Group>
          {list.map(img => (
            <Card
              key={img.version}
              raised
              image={getThumbnailSrc(img.secure_url)}
            />
          ))}
        </Card.Group>
        <div style={{margin: "20px"}}>
          <PaginationComponent
            onPageChange={this.handlePaginationChange}
            active={page}
            total={total}
          />
        </div>
      </div>
    )
  }
}

const UploadPicturePanel = () => {
  const uploadUrl = url_prefix + '/admin/upload-picture';
  const token = getToken();
  const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: uploadUrl
  };
  const djsConfig = {
    autoProcessQueue: true,
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }
  const eventHandlers = {
    // All of these receive the event as first parameter:
    // drop:  [
    //   function () {
    //       console.log('Look Ma, I\'m a callback in an array!');
    //   },
    //   function () {
    //       console.log('Wooooow!');
    //   }
    // ],
    // dragstart: null,
    // dragend: null,
    // dragenter: null,
    // dragover: null,
    // dragleave: null,
    // All of these receive the file as first parameter:
    // removedfile: null,
    // thumbnail: null,
    // error: null,
    // processing: null,
    // uploadprogress: null,
    // sending: null,
    success: function (file, response) {
      // 成功回调
      window.prompt("上传成功, 这是图片地址:", response.data)
    },
    // complete: null,
    // canceled: null,
    // maxfilesreached: null,
    // maxfilesexceeded: null,
    // All of these receive a list of files as first parameter 
    // and are only called if the uploadMultiple option 
    // in djsConfig is true:
    // processingmultiple: null,
    // sendingmultiple: null,
    // successmultiple: null,
    // completemultiple: null,
    // canceledmultiple: null,
    // Special Events
    // totaluploadprogress: null,
    // reset: null,
    // queuecompleted: null
  }
  return (
    <DropzoneComponent
      config={componentConfig}
      eventHandlers={eventHandlers}
      djsConfig={djsConfig}
    />
  )
}

function mapStateToProps(state) {
  const mediaState = state.media;
  return {
    page: mediaState.page,
    list: mediaState.list,
    total: Math.ceil(mediaState.count / 10)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    paginationChange: (e, { activePage }) => {
      dispatch(pageChange(activePage))
    }
  }
}

UploadedPicturesView = connect(mapStateToProps, mapDispatchToProps)(UploadedPicturesView);

const panes = [
  { menuItem: '上传照片', render: () => <Tab.Pane attached={true}><UploadPicturePanel /></Tab.Pane> },
  { menuItem: '查看照片', render: () => <Tab.Pane attached={true}><UploadedPicturesView /></Tab.Pane> },
]



export default class MediaManage extends React.Component {
  
  render() {
    return (
      <Tab menu={{ secondary: true }} panes={panes} />
    )
  }
}


MediaManage.propTypes = {
  uploadSuccess: PropTypes.func
};
