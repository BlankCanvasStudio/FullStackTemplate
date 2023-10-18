import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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
                <div style={{ padding: "1em" }} >
                    <Typography variant="h3" color="darktext.main" align="center">
                        Welcome to the admin page!
                    </Typography>
                </div>
            </>
        );
    }
}

export default AdminPage;
