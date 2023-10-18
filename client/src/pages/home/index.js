import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import './home.css'

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen:false,
            modalText:'',
        };
    }

    render() {
        return (
            <div>
                <Modal display={this.state.modalOpen} closeModal={this.closeModal}>
                    <p>{this.state.modalText}</p>
                </Modal>
                <div style={{ padding: "1em" }} >
                    <Typography variant="h3" color="darktext.main" align="center">
                        Welcome to the home page!
                    </Typography>
                </div>
            </div>
        );
    }
}

export default HomePage;
