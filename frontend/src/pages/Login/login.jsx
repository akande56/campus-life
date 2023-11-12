import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Axios from 'axios';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // Simulate an API request using Axios without async/await
    Axios.post('/api/login', values)
      .then((response) => {
        const { token } = response.data;

        // Save the token to localStorage or a secure storage method
        localStorage.setItem('token', token);

        // Handle the response
        console.log('Login successful', response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error('Login failed', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateUsername = (_, value) => {
    if (!value || value.length < 4) {
      return Promise.reject('Username must be at least 4 characters!');
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value || value.length < 6) {
      return Promise.reject('Password must be at least 6 characters!');
    }
    return Promise.resolve();
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Card>
          <Title level={2}>Login</Title>
          <Form
            form={form}
            name="loginForm"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, validator: validateUsername, message: 'Please enter your username!' },
              ]}
              help="Choose a unique username with at least 4 characters."
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, validator: validatePassword, message: 'Please enter your password!' },
              ]}
              help="Password should be at least 6 characters long."
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
