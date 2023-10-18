import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// import axios from "axios";
import AuthServices from '../../_services/auth'
import { useNavigate } from 'react-router-dom';

import './admin.css'


function AdminPage(props) {
    const [ modalOpen, changeModalDisplay ] = React.useState(false)
    const [ modalText, changeModalText ] = React.useState('')

    const navigate = useNavigate();

    if (AuthServices.verifyLogin()) { navigate('/login') }
    AuthServices.verifyAdmin(() => {navigate('/access-denied')})

    return (
        <>
            <Modal display={modalOpen} closeModal={() =>{changeModalDisplay(false)}}>
                <p>{modalText}</p>
            </Modal>
            <div style={{ padding: "1em" }} >
                <Typography variant="h3" color="darktext.main" align="center">
                    Welcome to the admin page!
                </Typography>
            </div>
        </>
    );
}

export default AdminPage;
