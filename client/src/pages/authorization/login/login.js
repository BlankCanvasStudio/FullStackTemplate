import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../../../_services/auth";
import './login.css';


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(event) {
        event.preventDefault();
        let username = event.target[0].value;
        let password = event.target[1].value;
        
        AuthService.login(username, password).then(
        () => {
            window.location.href = '/profile';
        },
        error => {
            const resMessage =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
            console.log(resMessage);
            /*
            this.setState({
                loading: false,
                message: resMessage
            });
            */
        });
    }
    render() {
        return (
            <div>
                <LogInHeader />
                <form onSubmit={this.handleLogin} style={{display:"flex", justifyContent:"center", height:"70vh"}}>
                    <div style={{display:"block"}}>
                        <UserNameInput marginTop="1rem"/>
                        <PasswordInput marginTop="1rem"/>
                        <LogInFormFooter marginTop="1rem"/>
                    </div>
                </form>
            </div>
        );
    }
}

class LogInHeader extends React.Component {
    render() {
        return (
            <div className={this.props.className} style={{display:"flex", justifyContent:'center', height:"30vh"}}>
                <h1>Your Project Name Log In</h1>
            </div>
        );
    }
}
/*
class LogInForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            
        );
    }
}
*/
class UserNameInput extends React.Component {
    render() {
        return (
            <div style={{marginTop:this.props.marginTop}}>
                <label>
                    Username
                    <input type="text" name="username" style={{ display:"block" }} />
                </label>
            </div>
        );
    }
}

class PasswordInput extends React.Component {
    render() {
        return (
            <div style={{marginTop:this.props.marginTop}}>
                <label>
                    Password
                    <input type="password" name="password" style={{ display:"block" }} ></input>
                </label>
            </div>
        );
    }
}

class LogInFormFooter extends React.Component {
    
    render() {
        return (
            <div style={{marginTop:this.props.marginTop}} className="double-col">
                <div className="col1" style={{display:"flex", justifyContent:'center'}}>
                    <input className="buttons" type="submit" value="Log In" style={{color:"green"}}/>
                </div>
                <div className="col2" style={{display:"flex", justifyContent:'center'}}>
                    <Link to='/signup'>
                        <input className="buttons" type="button" value="Sign Up" />
                    </Link>
                </div>
                
            </div>
        );
    }
}


export default LogIn;