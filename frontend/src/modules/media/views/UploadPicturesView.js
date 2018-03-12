import React from 'react';
import { Button, Card, Icon, Pagination } from 'semantic-ui-react';
import { initImageList, refreshLocalStorage } from '../../../utils/resource';
import { getThumbnailSrc } from '../../../utils/resource';
import { connect } from 'react-redux';
import { pageChange, selectedImgChange } from '../actions';

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

const cardStyle = { width: '100px', height: '100px' };
const activeClass = 'card-active';

class UploadedPicturesView extends React.Component{
  constructor(props) {
    super(props);
    this.copyUrlToClipboard = this.copyUrlToClipboard.bind(this);
    this.state = { clipboard: "" }
  }

  handlePaginationChange = this.props.paginationChange

  copyUrlToClipboard(url) {
    this.setState({clipboard: url});
    setTimeout(() => {
      this._inputElement.select();
      document.execCommand('Copy');
      console.log(url);
      // alert("Image url copied!");
    }, 0);
  }

  componentDidMount() {
    initImageList();
  }
  
  render() {
    const { page, list, total, selected_img, selectedImgChange} = this.props;
    const getClassName = img => (img === selected_img ? activeClass : '');
    return (
      <div>
        <Button
          style={{marginBottom: '10px'}}
          onClick={refreshLocalStorage}
          icon="refresh"
          />
        <Card.Group>
          <input
            style={{width: '100px', height: '1px', opacity: 0, position: 'absolute'}}
            type="text"
            value={this.state.clipboard}
            ref={el => this._inputElement = el}
            />
          {list.map(img => (
            <Card
              style={cardStyle}
              className={getClassName(img.url)}
              onClick={() => {
                selectedImgChange(img.url);
                this.copyUrlToClipboard(img.url);
                
              }}
              key={img.version}
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

  function mapStateToProps(state) {
    const mediaState = state.media;
    return {
      page: mediaState.page,
      list: mediaState.list,
      total: Math.ceil(mediaState.count / 10),
      selected_img: mediaState.selected_img
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      paginationChange: (e, { activePage }) => {
        dispatch(pageChange(activePage))
      },
      selectedImgChange: (img_url) => {
        dispatch(selectedImgChange(img_url))
      }
    }
  }

UploadedPicturesView = connect(mapStateToProps, mapDispatchToProps)(UploadedPicturesView);

export default UploadedPicturesView;
