import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import SignUpMenu from '../../../_menus/signup';
import AuthServices from '../../../_services/auth';

import withRouter from '../../../_templates/withRouter';

import { ScrollRestoration } from 'react-router-dom';

import '.';


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
        this.props.navigate('/hub')
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
                <div style={{minHeight:"100vh", height:"fit-content", backgroundColor:"#505378"}}>
                    <div className={this.props.className} style={{display:"flex", justifyContent:'center'}}>
                        <h1 style={{color:"white"}}>FS Template Sign Up</h1>
                    </div>
                    <div style={{minHeight:"42em", width:"30em", maxWidth:"100%", marginLeft:"auto", marginRight:"auto", paddingBottom:'4em'}}>
                        <SignUpMenu 
                            validation_failed={this.validation_failed} 
                            signupAction={this.signupAction}
                            />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(SignUp);
