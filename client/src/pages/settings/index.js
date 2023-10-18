import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import LocationEntry from '../../_menus/location'
import Button from '@mui/material/Button';

import './settings.css'

const ModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


class SettingsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen:false,
            modalText:'',
            first_name:'', 
            last_name:'',
            pronouns:'',
            email:'',
            addressLineOne:'',
            addressLineTwo:'',
            city:'',
            state:'',
            zip:'',
            birthday:'',
        };
        this.updateString = this.updateString.bind(this)
        this.submit = this.submit.bind(this)
        this.closeModal = this.closeModal.bind(this);
    }

    updateString(e) { 
        this.setState({[e.target.name]:e.target.value}); 
    }

    closeModal() { this.setState({modalOpen:false}); }

    submit(e) {
        this.setState({
            modalOpen:true,
            modalText:"Saved your information!",
        });
    }

    render() {
        return (
            <Box bgcolor="lightbackground.main" sx={{minHeight:"100vh"}} >
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}
                    aria-labelledby="saved-modal"
                    aria-describedby="saved-modal-modal"
                    >
                    <Box sx={ModalStyle}>
                        <Typography id="saved-modal-description" sx={{ mt: 2 }}>
                            {this.state.modalText}
                        </Typography>
                    </Box>
                </Modal>
                <div style={{ padding: "1em" }} >
                    <Typography variant="h3" color="darktext.main" align="center">
                        Profile
                    </Typography>
                </div>
                <div className='profile-halves' >
                    <div style={{margin:"1em"}}>
                        <Typography variant="h4" color="darktext.main" align="center">
                            Your location
                        </Typography>
                        <LocationEntry 
                            lineOne={this.state.addressLineOne}
                            lineTwo={this.state.addressLineTwo}
                            city={this.state.city}
                            state={this.state.state}
                            zip={this.state.zip}
                            updateString={this.updateString}
                            />
                    </div>

                    <div style={{margin:"1em"}}>
                        <Typography variant="h4" color="darktext.main" align="center">
                            Other Info
                        </Typography>
                        <div className="other-info-spacing" >
                            <TextField
                                label="First Name"
                                id="first_name"
                                sx={{width:"100%", color:"white", borderColor:"white"}}
                                name='first_name'
                                value={this.state.first_name} onChange={this.updateString}
                                size="small"
                                variant="filled"
                                />
                            <TextField
                                label="Last Name"
                                id="last_name"
                                sx={{width:"100%", color:"white", borderColor:"white"}}
                                name='last_name'
                                value={this.state.last_name} onChange={this.updateString}
                                size="small"
                                variant="filled"
                                />
                            <TextField
                                label="Pronouns"
                                id="pronouns"
                                sx={{width:"100%", color:"white", borderColor:"white"}}
                                name='pronouns'
                                value={this.state.pronouns} onChange={this.updateString}
                                size="small"
                                variant="filled"
                                />
                            <TextField
                                label="Email"
                                id="email"
                                sx={{width:"100%", color:"white", borderColor:"white"}}
                                name='email'
                                value={this.state.email} onChange={this.updateString}
                                size="small"
                                variant="filled"
                                />
                        </div>
                    </div>
                </div>
                <div style={{marginRight:"1em", marginLeft:"auto", width:'fit-content'}} >
                    <Button size="large" variant="contained" color="success" onClick={this.submit}>Save</Button>
                </div>
            </Box>
        );
    }
}

export default SettingsPage;
