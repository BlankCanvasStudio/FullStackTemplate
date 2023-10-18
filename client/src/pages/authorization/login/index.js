import React from 'react';
import LoginMenu from '../../../_menus/login';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import './login.css';

function LogIn(props) {
    const navigate = useNavigate();
    
    const loginAction = () => {
        navigate('/home', {replace:true});
    }
    const signupAction = () => {
        navigate('/signup', {replace:true});
    }
    
    return (
        <Box bgcolor='lightbackground.main' height="100vh">
            <ScrollRestoration />
            <div style={{ height:"30vh" }}>
                <Typography align="center" variant="h3" color="darktext" sx={{paddingTop:"1em"}} >
                    FS Template Log In
                </Typography>
            </div>
            <div className="login-wrapper">
                <LoginMenu loginAction={loginAction} signupAction={signupAction}/>
            </div>
        </Box>
    );
}

export default LogIn;
