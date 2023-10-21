import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationDisplay from '../../../_components/location'
import axios from "axios";
import { authHeader } from '../../../_services/auth';
import GenericProfilePage from '../generic'

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
            first_name:'', 
            last_name:'',
            pronouns:'',
            birthday:'',
            email:'',
            addressLineOne:'',
            addressLineTwo:'',
            city:'',
            state:'',
            zip:'',
        };
        this.updateString = this.updateString.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    updateString(e) { 
        this.setState({[e.target.name]:e.target.value}); 
    }

    componentDidMount() {
        const currentURL = window.location.href;
        const parts = currentURL.split('/');
        const u_id = parts[parts.length - 1];

        axios({
          method: "post",
          url: "/api/user/profile/view/" + u_id,
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
            <GenericProfilePage
                modalOpen={this.state.modalOpen}
                modalClose={this.state.modalClose}
                modalText={this.state.modalText}
                addressLineOne={this.state.addressLineOne}
                addressLineTwo={this.state.addressLineTwo}
                city={this.state.city}
                state={this.state.state}
                zip={this.state.zip}

                first_name={this.state.first_name}
                last_name={this.state.last_name}
                pronouns={this.state.pronouns}
                birthday={this.state.birthday}
                email={this.state.email}
                />
        );
    }
}

export default ProfilePage;
