import React from 'react';
import { Link } from 'react-router-dom';
import './signup';


class SignUp extends React.Component {
    render() {
        return (
            <div>
                <SignUpHeader />
                <SignUpForm />
            </div>
        );
    }
}

class SignUpHeader extends React.Component {
    render() {
        return (
            <div className={this.props.className} style={{display:"flex", justifyContent:'center', height:"30vh"}}>
                <h1>Your Project Name Sign Up</h1>
            </div>
        );
    }
}

class SignUpForm extends React.Component {
    render() {
        return (
            <form action="http://backend.localhost/signup" method="post" style={{display:"flex", justifyContent:"center", height:"70vh"}}>
                <div style={{display:"block"}}>
                    <UserNameInput marginTop="1rem"/>
                    <PasswordInput marginTop="1rem"/>
                    <PronounsInput marginTop="1rem" />
                    <SignUpFormFooter marginTop="2rem"/>
                </div>
            </form>
        );
    }
}
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
class PronounsInput extends React.Component {
    render() {
        return (
            <div style={{marginTop:this.props.marginTop}}>
                <label>
                    Pronouns
                    <input type="text" name="pronouns" style={{ display:"block" }} ></input>
                </label>
            </div>
        );
    }
}

class SignUpFormFooter extends React.Component {
    
    render() {
        return (
            <div style={{marginTop:this.props.marginTop}} className="double-col">
                <div className="col1" style={{display:"flex", justifyContent:'center'}}>
                    <input className="buttons" type="submit" value="Sign Up" style={{color:"green"}}/>
                </div>
                <div className="col2" style={{display:"flex", justifyContent:'center'}}>
                    <Link to='/login'>
                        <input className="buttons" type="button" value="Log In" />
                    </Link>
                </div>
                
            </div>
        );
    }
}


export default SignUp;