import React, { useState } from 'react';
import { Row, Col } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
// import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Form, Input, Button, Upload, Alert } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import UserAxios from '../../redux/Axios/UserAxios';
import Editor from '../../components/editor/Editor';
const Editors = () => {
  const [form] = Form.useForm();
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [load, setLoad] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const onReset = () => {
    form.resetFields();
  };
  const handleSubmit = async () => {
    // let data = {
    //   photo,
    //   title,
    //   body: description
    // }

    console.log(photo);
    let formData = new FormData();
    formData.append('title', title);
    formData.append('body', description);
    formData.append('photo', photo.originFileObj);

    try {
      setLoad(true);
      let result = await UserAxios.post('/posts', formData);
      setErrors({});
      setSuccess(true);
      setLoad(false);
      setTitle('');
      setDescription('');
      setPhoto(null);
      onReset();
    } catch (err) {
      console.log(err.response.data);
      setSuccess(false);
      setErrors(err.response.data.errors);
      setLoad(false);
    }
    // dispatch(login(history, data));
    // history.push('/admin');
  };

  const normFile = e => {
    console.log('Upload event:', e);

    setPhoto(e.file);
  };

  return (
    <>
      <PageHeader
        title="Editors"
        buttons={[
          <div key="1" className="page-header-actions">
            <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader />
            {/* <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Add New
            </Button> */}
          </div>,
        ]}
      />
      <Main>
        <h2>Create Post </h2>
        {success && <Alert message="Post add successfully" type="success" />}
        <Form
          name="login"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          {/* <Heading as="h3">
            Sign in to <span className="color-secondary">Admin</span>
          </Heading> */}

          <Form.Item
            name="Image"
            label="Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="Title"
            label="Title"
            rules={[{ message: 'Please input your title!', required: true }]}
            value={title}
            // label="Email Address"
            onChange={e => {
              console.log(e.target.value);
              setTitle(e.target.value);
            }}
            validateStatus={errors.title ? 'error' : ''}
            help={errors.title ? errors.title : ''}
          >
            <Input placeholder="Title" />
          </Form.Item>
          {/* <Form.Item
            name="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            label="Description"
            rules={[
              { message: 'Please input your description!', required: true },
            ]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item> */}

          <Editor
            onChange={e => {
              setDescription(e);
            }}
          />

          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
            >
              {load ? 'Loading...' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Main>
    </>
  );
};

export default Editors;
