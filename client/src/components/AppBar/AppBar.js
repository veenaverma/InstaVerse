import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { Layout, Image, Typography, Button, Avatar } from 'antd';
import styles from './style';
import { LOGOUT } from "../../constants/actionTypes";
import Logo from "../../images/Logo.png";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {jwtDecode} from "jwt-decode";

const { Title } = Typography;
const { Header } = Layout;


export default function AppBar() {
    const [user,setUser]=useState();

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();
    


    useEffect(()=>{
        const token=user?.token;

        if(token){
            const decodedToken=jwtDecode(token);
            if(decodedToken.exp*1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem("profile")));
    },[location]);

    const logout=()=>{
        dispatch({type:LOGOUT});
        navigate("/authform");
        setUser(null);
    }


  return (
    <Header style={styles.header}>

    <Link to="/">
       {/* <Image src={Logo} alt="Instaverse Logo" preview={false} style={styles.image} width={45}/> */}
<Title style={styles.title}>Instaverse</Title>
    </Link>
    {
        !user?(
            <Link to="/authform">
                <Button htmlType='button' style={styles.login} >
                    Log In
                </Button>
            </Link>
            
        ):(
            <div style={styles.userInfo}>
                <Avatar style={styles.avatar} alt='username' size="large">
                    {user?.result?.username?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Title style={styles.title} level={4}>
                    {user?.result?.username}
                </Title>
                <Button onClick={logout} htmlType='button'>
                    Log Out
                </Button>
            </div>
        )

    }
    </Header>
  )
}
