import React, { useState } from "react";
import { Upload, Icon, message, Modal } from 'antd';
import './index.css'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
        message.error('Image must smaller than 20MB!');
    }
    return isJpgOrPng && isLt2M;
}

function UploadFunction(props) {

    const [loading, setLoading] = useState(false)
    const [imageURL, setImageUrl] = useState('')
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    // const [fileList, setFileList] = useState([])

    function handleChange(info) {
        if (info.fileList.length !== 0) {
            setImageUrl(info.file.thumbUrl)
            props.uploadImage(imageURL)
        }
        
    };

    function handleCancel() {
        setPreviewVisible(false)
    }

    async function handlePreview(file) {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewVisible(true)
        setPreviewImage(file.url || file.preview)
    }

    function handleRemove(file) {
        setImageUrl('')
        return true
    }

    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <div>
            <Upload
                name="avatar"
                listType="picture-card"
                className="image-uploader"
                showUploadList={true}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
            >
                {imageURL ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} onCancel={handleCancel}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );

}

export default UploadFunction