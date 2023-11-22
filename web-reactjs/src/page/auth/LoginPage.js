

import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const onFinish = (values) => {
    // employee/login
    const staticUsername = "sa", staticPassword="123456"
    if(values.username == staticUsername && values.password == staticPassword){
        localStorage.setItem("isLogin",'1')
        window.location.href="/" // link to other page by routename
    }else{
        message.warning("Username or password incorrect!")
    }
  };
  return (
    <div className={styles.container}>
        <div className={styles.txtLogin}>Login</div>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
        <Form.Item
            name="username"
            rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
            Forgot password
            </a>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
            Or <a href="">register now!</a>
        </Form.Item>
        </Form>
    </div>
  );
};
export default LoginPage;



// import { useState } from "react"
// const LoginPage = () => {

//     const [username,setUsername] = useState("")
//     const [password,setPassword] = useState("")


//     const onLogin = () => {
//         // correct password
//         const staticUsername = "sa", staticPassword="123456"
//         if(username == staticUsername && password == staticPassword){
//             localStorage.setItem("isLogin",'1')
//             window.location.href="/" // link to other page by routename
//         }else{
//             alert("Username or password incorrect!")
//         }
        
//     }

//     return (
//         <div>
//             <h1>LoginPage</h1>
//             <input 
//                 placeholder="username"
//                 onChange={(event)=>{
//                     setUsername(event.target.value)
//                 }}
//             />
//             <input 
//                 placeholder="password"
//                 onChange={(event)=>{
//                     setPassword(event.target.value)
//                 }}
//             />
//             <br/>
//             <button onClick={onLogin}>Login</button>
//             <button>Register</button>
//         </div>
//     )
// }

// export default LoginPage;