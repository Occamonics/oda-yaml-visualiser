import React from 'react';
import {Button, Card, Divider, Form, Input, message, Space, Tag, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {convertYamlToJson} from "../utils/utils";


const dummyRequest = ({file, onSuccess}) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};


const UploadYaml = ({setAllStates, ref_upload}) => {

    const beforeUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const yamlString = event.target.result;
            const convertedJson = convertYamlToJson(yamlString);
            if (convertedJson) {
                message.success('YAML file converted to JSON successfully!');
                setAllStates(convertedJson.states);
            } else {
                message.error('Error converting YAML to JSON.');
                setAllStates(null);
            }
        };
        reader.readAsText(file);
        return false; // Prevent default upload behavior
    };

    return (

        <Upload customRequest={dummyRequest} beforeUpload={beforeUpload} >
            <Button icon={<UploadOutlined/> } block  ref={ref_upload}>Upload</Button>
        </Upload>

    );
};

export default UploadYaml;
