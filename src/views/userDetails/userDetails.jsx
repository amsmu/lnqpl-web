import React from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
const axios = require('axios');

function UserDetails() {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
  };

  const prefixSelector = (
    <Form.Item name='prefix' noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value='91'>+91</Select.Option>
        <Select.Option value='1'>+1</Select.Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values) => {
    values.phone = values.prefix + values.phone;

    axios({
      method: 'post',
      url: 'http://localhost:8000/person/',
      data: values,
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
    })
      .then(function (response) {
        console.log(response);
        notification.success({
          message: response.data.message,
        });
      })
      .catch(function (error) {
        notification.error({
          message: error.data.message,
        });
      });
  };

  return (
    <div>
      <div>
        <h1 className='text-center title'>Why so serious? Just give us your details. We're from your bank.</h1>
      </div>
      <Form {...layout} name='nest-messages' onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name='first_name'
          label='First Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='last_name'
          label='Last Name'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='phone'
          label='Phone'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input addonBefore={prefixSelector} />
        </Form.Item>
        <Form.Item
          name='address'
          label='Address'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name='ssn'
          label='SSN'
          extra="It'll be encrypted before saving"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UserDetails;
