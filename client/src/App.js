/*
React App which we render through the ReactDom in the actudal DOM by the index.html file through 
ReactDom.render(
    <App />,
    document.getElementById("root")
);
*/
import React from 'react';
import {Layout} from "antd";
import { Footer} from 'antd/es/layout/layout';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import AuthForm from './components/AuthForm';
import styles from './styles';
import AppBar from './components/AppBar/AppBar';
import "./App.css";


//the functional component
const App=()=>{  
    return(
        <BrowserRouter>
            <Layout style={styles.layout}>
                
                <AppBar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/authform' element={<AuthForm />} />
                </Routes>
                
                <Footer style={styles.footer}  >2024 Instaverse</Footer>
            </Layout>
        </BrowserRouter>
    )
}

export default App;