import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationDisplay from '../../_components/location'
import axios from "axios";
import { authHeader } from '../../_services/auth';

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
        this.closeModal = this.closeModal.bind(this)
    }

    updateString(e) { 
        this.setState({[e.target.name]:e.target.value}); 
    }

    componentDidMount() {
        axios({
          method: "get",
          url: "/api/user/profile/info",
          data: {},
          headers: Object.assign(authHeader(), {"Content-Type": "application/json"}),
        }).then((response) => {
            this.setState({
                first_name:response.data.first_name, 
                last_name:response.data.last_name,
                pronouns:response.data.pronouns,
                birthday:response.data.birthday,
                email:response.data.email,
                addressLineOne:response.data.addresslineone,
                addressLineTwo:response.data.addresslinetwo,
                city:response.data.city,
                state:response.data.state,
                zip:response.data.zip,
            })
        }).catch((err) => {
            console.log(err);
            this.setState({modalOpen:true, modalText:err.response.data.message})
        });

    }


    closeModal() { this.setState({modalOpen: false}) }

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
                            Birthday: { this.state.birthday ? this.state.birthday : "None listed" }
                        </Typography>
                    </div>
                </div>
            </Box>
        );
    }
}

export default ProfilePage;
