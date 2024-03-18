import React, { Component, useState } from 'react';
import {Form,Input,Button,Card,Layout,Typography} from "antd";
import {useDispatch} from 'react-redux';
import styles from './styles';
import {login,signup} from '../../actions/authentication';

import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

import {useNavigate} from 'react-router-dom';

const { Title } = Typography;



function AuthForm() {
    const user=null;
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [form]=Form.useForm();

    const [isLogin,setIsLogin]=useState(true);


    const onSubmit = (formValues) => {
        if(isLogin)
        {
            dispatch(login(formValues,navigate));
        }
        else
        {
            dispatch(signup(formValues,navigate));            
        }
    }

    const switchMode = () => {
        setIsLogin(login=>!login);
    }


    return (
      <Layout style={styles.container}>
        <Card 
            style={styles.card}
            title={
                <Title level={4} style={{textAlign:"center"}}>
                    {isLogin? "Login to":"Sign up"} Instaverse
                </Title>
            }        
        >
            <Form
                name='authform'
                form={form}
                size='large'
                wrapperCol={{span:20, offset:2 }}
                onFinish={onSubmit}
            >
                {
                    isLogin || (
                        <>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required:true,
                                        message:"Please enter your username"
                                    }
                                ]}
                                
                            >
                                <Input prefix={<UserOutlined />} placeholder='username'/>
                            </Form.Item>
                        </>
                    )
                }
                <Form.Item
                        name="email"
                        rules={[
                            {
                                required:true,
                                message:"Please enter valid email address"
                            }
                        ]}
                        
                    >
                        <Input type='email' prefix={<MailOutlined />} placeholder='email address'/>
                </Form.Item>
                <Form.Item
                        name="password"
                        rules={[
                            {
                                required:true,
                                message:"Please enter your password"
                            }
                        ]}
                        
                    >
                        <Input.Password type='password' prefix={<LockOutlined />} placeholder='password'/>
                </Form.Item>
                {
                    isLogin || (
                            <Form.Item
                        name="confirmPassword"
                        rules={[
                            {
                                required:true,
                                message:"Please re-enter your password"
                            }
                        ]}
                        
                    >
                        <Input.Password type='password' prefix={<LockOutlined />} placeholder='Confirm password'/>
                </Form.Item>
                )}
                <Form.Item>
                    <Button htmlType='submit' typeof='primary'>
                        {isLogin ? "Log In":"Sign In"}
                    </Button>
                    <span style={{margin:"0 10px 0px 20px"}}>Or</span>
                    <Button type='link' onClick={switchMode}>
                        {isLogin?"Sign in now":"Have an account?"}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
      </Layout>
    )
}

export default AuthForm

//button of type=submit calls upon onFinish which in turn calls onSubmit function