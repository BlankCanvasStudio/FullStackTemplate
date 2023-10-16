import React from 'react';
import LoginMenu from '../../../_menus/login';
import { ScrollRestoration, useNavigate } from 'react-router-dom';

import './login.css';


function LogIn(props) {
    const navigate = useNavigate();
    
    const loginAction = () => {
        navigate('/hub', {replace:true});
    }
    const signupAction = () => {
        navigate('/signup', {replace:true});
    }
    
    return (
        <div className="background">
            <ScrollRestoration />
            <div className={props.className} style={{display:"flex", justifyContent:'center', height:"30vh"}}>
                <h1 style={{color:"white"}}>OneUp Log In</h1>
            </div>
            <div className="login-wrapper">
                <LoginMenu loginAction={loginAction} signupAction={signupAction}/>
            </div>
        </div>
    );
}

export default LogIn;
