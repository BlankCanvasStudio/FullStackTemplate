import React from 'react';
import { Button } from '@mui/material';
import AuthService from '../../../_services/auth'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


class LogoutPage extends React.Component {
    render() {
        if(AuthService.getCurrentUser() ) {
            AuthService.logout();
        }
        return (
            <Box height="100vh" bgcolor="darkbackground.main">
                <div style={{ display:"flex", justifyContent:"center", height:"100%", alignItems:'center' }}>
                    <div style={{height:"fit-content"}}>
                        <Typography align="center" variant="h3" color="lighttext.main">
                            You're Logged Out!
                        </Typography>
                        <Typography align="center" variant="h4" color="lighttext.main">
                           Hope you come back 
                        </Typography>
                        <br/>
                        <div style={{width:"min(100%, 30em)", display:'grid', gridTemplateColumns:"1fr 1fr", justifyItems:'center'}}>
                            <Link to='/login'>
                                <Button variant='contained' color='success' type="submit" className="login">Log In</Button>
                            </Link>
                            <Link to='/signup'>
                                <Button variant='outlined' color='lighttext' type="button" className="signup">Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Box>
        );
    }
}

export default LogoutPage;
