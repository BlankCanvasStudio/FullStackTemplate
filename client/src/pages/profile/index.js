import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationDisplay from '../../_components/location'

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen:false,
            modalText:'',
            first_name:'firstN', 
            last_name:'lastN',
            pronouns:'',
            birthday:'',
            email:'test@email.com',
            addressLineOne:'Line One',
            addressLineTwo:'Line Two',
            city:'City',
            state:'State',
            zip:'Zip',
        };
        this.updateString = this.updateString.bind(this)
    }

    updateString(e) { 
        this.setState({[e.target.name]:e.target.value}); 
    }

    render() {
        return (
            <Box bgcolor="lightbackground.main" sx={{minHeight:"100vh"}} >
                <Modal display={this.state.modalOpen} closeModal={this.closeModal}>
                    <p>{this.state.modalText}</p>
                </Modal>
                <div style={{ padding: "1em" }} >
                    <Typography variant="h3" color="darktext.main" align="center">
                        Profile
                    </Typography>
                </div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                    <div style={{gridColumn:1}}>
                        <Typography variant="h3" color="darktext.main" align="center">
                            Your Location
                        </Typography>
                        <div style={{marginRight:'auto', marginLeft:'auto', width:'fit-content'}}>
                            <LocationDisplay
                                addressLineOne={this.state.addressLineOne}
                                addressLineTwo={this.state.addressLineTwo}
                                city={this.state.city}
                                state={this.state.state}
                                zip={this.state.zip}
                                variant='p'
                                color='darktext'
                                />
                        </div>
                    </div>
                    <div style={{ gridColumn:2 }}>
                        <Typography variant="h3" color="darktext.main" align="center" display='block'>
                            Your Personal Info
                        </Typography>
                        <Typography variant="p" color="darktext.main" align="center" display='block'>
                            Name: {this.state.first_name + ' ' + this.state.last_name}
                        </Typography>
                        <Typography variant="p" color="darktext.main" align="center" display='block'>
                            Email: {this.state.email}
                        </Typography>
                        <Typography variant="p" color="darktext.main" align="center" display='block'>
                            Pronouns: { this.state.pronouns ? this.state.pronouns : "None listed" }
                        </Typography>
                        <Typography variant="p" color="darktext.main" align="center" display='block'>
                            Birthday: { this.state.birthday ? new Date(this.state.birtday).toLocaleString() : "None listed" }
                        </Typography>
                    </div>
                </div>
            </Box>
        );
    }
}

export default ProfilePage;
