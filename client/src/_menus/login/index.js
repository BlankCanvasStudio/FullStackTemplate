import { Button, TextField } from '@mui/material';
import React from 'react';

import AuthService from "../../_services/auth";

import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

import './login-menu.css';


const LoginForm = styled('form')(({ theme }) => ({
    backgroundColor:theme.palette.darkbackground.main,
}));


class LoginMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            loginFailed:false,
        }
        this.loginAction = this.props.loginAction;  // Just so we pop an error if we don't pass this
        this.signupAction = this.props.signupAction;
        this.updateString = this.updateString.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event) {
        event.preventDefault();
        AuthService.login(this.state.username, this.state.password).then(
        () => {
            this.loginAction()
        },
        error => {
            this.setState({loginFailed:true});
        });
    }

    updateString(e) { 
        this.setState({[e.target.name]:e.target.value}); 
    }

    render() {
        return (
            <LoginForm onSubmit={this.handleLogin} style={{...this.props.style}} className="login-form">
                <div className="standard-login">
                        <TextField color="lighttext" id="username" name="username" label="Email" variant='filled' value={this.state.username} onChange={this.updateString}    />
                        <TextField color="lighttext" id="password" name="password" label="Password" variant='filled' value={this.state.password} onChange={this.updateString} type="password"/>
                    <div>
                        { 
                            this.state.loginFailed && 
                            <Typography variant="p" color='error'>
                                Incorrect Username or Password!
                            </Typography>
                        }
                    </div>
                </div>
                <hr className="login-ruler"/>
                <div className="submit-section">
                    <Button variant='contained' color='success' type="submit" className="login">Log In</Button>
                    <Button variant='outlined' color='lightbackground' type="button" className="signup" onClick={this.signupAction}>Sign Up</Button>
                </div>
            </LoginForm>
        );
    }
}

export default LoginMenu;
