import React from 'react';
import DropzoneComponent from 'react-dropzone-component';
import { url_prefix } from '../../../utils/http';
import { getToken } from '../../../utils/auth';
import 'dropzone/dist/min/dropzone.min.css';

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
      success: function (file, response) {
        // 成功回调
        window.prompt("上传成功, 这是图片地址:", response.data)
      },
    }
    return (
      <DropzoneComponent
        config={componentConfig}
        eventHandlers={eventHandlers}
        djsConfig={djsConfig}
      />
    )
  }

export default UploadPicturePanel;
