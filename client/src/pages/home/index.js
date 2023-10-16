import React from 'react';
import Modal from '@mui/material/Modal';

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
            <>

                <Modal display={this.state.modalOpen} closeModal={this.closeModal}>
                    <p>{this.state.modalText}</p>
                </Modal>
                <h1>Welcome to the home page!</h1>               

            </>
        );
    }
}

export default HomePage;
