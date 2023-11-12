import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import Axios from 'axios';

const { Title } = Typography;

const Registration = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    // Simulate an API request using Axios without async/await
    Axios.post('/api/register', values)
      .then((response) => {
        // Assuming the server returns a token upon successful registration
        const { token } = response.data;

        // Save the token to localStorage or a secure storage method
        localStorage.setItem('token', token);

        // Handle the response
        console.log('Registration successful', response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error('Registration failed', error);
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

  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || !emailRegex.test(value)) {
      return Promise.reject('Please enter a valid email address!');
    }
    return Promise.resolve();
  };

  const validateName = (_, value) => {
    if (!value || value.length < 2) {
      return Promise.reject('Name must be at least 2 characters!');
    }
    return Promise.resolve();
  };

  return (
    <Row justify="center" align="middle" style={{ height: '100vh', marginTop:'40px' }}>
      <Col span={8}>
        <Card>
          <Title level={2}>Registration</Title>
          <Form
            form={form}
            name="registrationForm"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, validator: validateName }]}
              help="Enter your first name."
            >
              <Input prefix={<IdcardOutlined />} placeholder="First Name" />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, validator: validateName }]}
              help="Enter your last name."
            >
              <Input prefix={<IdcardOutlined />} placeholder="Last Name" />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, validator: validateUsername }]}
              help="Choose a unique username with at least 4 characters."
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, validator: validateEmail }]}
              help="Provide a valid email address for communication."
            >
              <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, validator: validatePassword }]}
              help="Password should be at least 6 characters long."
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Registration;
