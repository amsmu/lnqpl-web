import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, notification } from 'antd';
const axios = require('axios');

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);

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

  const onFinish = (values) => {
    setIsLoading(true);
    axios({
      method: 'post',
      url: 'http://localhost:8000/users/sign-in',
      data: values,
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
    })
      .then(function (response) {
        localStorage.setItem('token', response.data.data.token);
        props.callback();
      })
      .catch(function (error) {
        if (error.response.status == 500) {
          localStorage.removeItem('token');
        }
        notification.error({
          message: error.response.data.message,
        });
      })
      .then(function () {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Form {...layout} name='nest-messages' onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name='email'
          label='Email'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

Login.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default Login;
