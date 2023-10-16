import React from 'react';
import { Button } from '@mui/material';
import AuthService from '../../../_services/auth'
import { Link } from 'react-router-dom';

class LogoutPage extends React.Component {
    render() {
        if(AuthService.getCurrentUser() ) {
            AuthService.logout();
        }
        return (
            <div style={{width:"100%", height:"100vh", backgroundColor:"#505378"}}>
                <div style={{ display:"flex", justifyContent:"center", height:"100%", alignItems:'center' }}>
                    <div style={{height:"fit-content"}}>
                        <div style={{ display:"flex", justifyContent:"center", color:'white' }} >
                            <h1 style={{margin:0}}>You're Logged Out!</h1>
                        </div>
                        <div style={{ display:"flex", justifyContent:"center", color:"white" }} >
                            <h2 style={{margin:0}}>Hope you come back</h2>
                        </div>
                        <br/>
                        <div style={{width:"min(100%, 30em)", display:'grid', gridTemplateColumns:"1fr 1fr", justifyItems:'center'}}>
                            <Link to='/login'>
                                <Button variant='contained' color='success' type="submit" className="login">Log In</Button>
                            </Link>
                            <Link to='/signup'>
                                <Button variant='outlined' type="button" className="signup">Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LogoutPage;
