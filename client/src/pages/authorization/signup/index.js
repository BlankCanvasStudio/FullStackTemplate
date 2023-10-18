import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import SignUpMenu from '../../../_menus/signup';
import AuthServices from '../../../_services/auth';

import withRouter from '../../../_templates/withRouter';

import { ScrollRestoration } from 'react-router-dom';


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal:false,
            modalMessage:''
        }
        this.closeModal = this.closeModal.bind(this);
        this.validation_failed = this.validation_failed.bind(this);
        this.signupAction = this.signupAction.bind(this);
    }
    closeModal() { this.setState({openModal:false}) }
    validation_failed(message) {
        this.setState({modalMessage:message, openModal:true});
    }
    signupAction(res) { 
        AuthServices.saveLoginResponse(res.data);
        this.props.navigate('/home')
    }

    render() {
        return (
            <React.Fragment>
                <ScrollRestoration />
                <Dialog
                    open={this.state.openModal}
                    onClose={this.closeModal}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Submission Error"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.state.modalMessage}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} autoFocus>Close</Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{minHeight:"100vh", height:"fit-content"}} bgcolor="darkbackground.main">
                    <Typography align="center" variant="h3" color="lighttext.main" sx={{padding:"1em"}} >
                        FS Template Sign Up
                    </Typography>
                    <Box sx={{width:"30em", maxWidth:"100%", margin:"auto"}} bgcolor="lightbackground.main">
                        <SignUpMenu 
                            validation_failed={this.validation_failed} 
                            signupAction={this.signupAction}
                            />
                    </Box>
                </Box>
            </React.Fragment>
        );
    }
}

export default withRouter(SignUp);
