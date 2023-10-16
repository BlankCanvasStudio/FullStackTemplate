import React from 'react';
import Modal from '@mui/material/Modal';

import './admin.css'

class AdminPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen:false,
            modalText:'',
        };
    }
    render() {
        return (
            <>

                <Modal display={this.state.modalOpen} closeModal={this.closeModal}>
                    <p>{this.state.modalText}</p>
                </Modal>
                <h1>Welcome to the admin page!</h1>
            </>
        );
    }
}

export default AdminPage;
