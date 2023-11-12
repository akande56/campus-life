import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setImageUrl(info.file.response.url); // Assuming the server returns the image URL
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('image', file);

    // Use axios to send the image to the server
    axios.post('/api/upload', formData)
      .then(response => {
        onSuccess(response.data, file);
      })
      .catch(error => {
        onError(error);
      });
  };

  return (
    <div>
      <Upload
        customRequest={customRequest}
        showUploadList={false}
        onChange={handleChange}
        beforeUpload={() => false} // Prevent default behavior to upload immediately
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            border: '1px dashed #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          ) : (
            <UploadOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
          )}
        </div>
      </Upload>
      <Button type="primary" onClick={() => message.success('Image submitted successfully')}>
        Submit
      </Button>
    </div>
  );
};

export default ImageUpload;
