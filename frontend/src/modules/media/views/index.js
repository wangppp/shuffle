import React from 'react';
import { Tab } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UploadedPicturesView from './UploadPicturesView';
import UploadPicturePanel from './UploadPicturePanel';

const panes = [
  { menuItem: '上传照片', render: () => <Tab.Pane attached={true}><UploadPicturePanel /></Tab.Pane> },
  { menuItem: '查看照片', render: () => <Tab.Pane attached={true}><UploadedPicturesView /></Tab.Pane> },
]

const MediaManage = () => (
  <Tab menu={{ secondary: true }} panes={panes} />
)

MediaManage.propTypes = {
  uploadSuccess: PropTypes.func
};

export default MediaManage;
