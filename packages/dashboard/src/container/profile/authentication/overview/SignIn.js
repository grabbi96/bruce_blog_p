import React, { useState, useCallback } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AuthWrapper } from './style';
import { login } from '../../../../redux/authentication/authReducer';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';
import { auth0options } from '../../../../config/auth0';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, errors } = useSelector(state => state.auth);
  const [form] = Form.useForm();
  // const [state, setState] = useState({
  //   checked: null,
  // });

  const handleSubmit = () => {
    let data = {
      email,
      password,
    };
    dispatch(login(history, data));
    // history.push('/admin');
  };

  const onChange = checked => {
    // setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form
          name="login"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Heading as="h3">
            Sign in to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item
            name="username"
            rules={[{ message: 'Please input your email!', required: true }]}
            initialValue={email}
            label="Email Address"
            onChange={e => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email ? errors.email : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue={password}
            // onChange={e => setPassword(e.target.value)}
            label="Password"
            rules={[{ message: 'Please input your password!', required: true }]}
            onChange={e => {
              console.log(e.target.value);
              setPassword(e.target.value);
            }}
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password ? errors.password : ''}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <div className="auth-form-action">
            <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            <NavLink className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div>
          <Form.Item>
            <Button
              className="btn-signin"
              htmlType="submit"
              type="primary"
              size="large"
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
