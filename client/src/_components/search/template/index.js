import React from 'react';

// import axios from "axios";
// import { authHeader } from '../../_services/auth';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import SearchBar from './_components/search_bar'
import ResultSpace from './_components/results'


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


function enterPressed(event, Search) {
    var code = event.keyCode || event.which;
    if(code === 13) { //13 is the enter keycode
        //Do stuff in here
        Search()
    } 
}


function SearchTemplate(props) {
    return (
        <>
            <Modal
                open={props.modalOpen}
                onClose={props.closeModal}
                aria-labelledby="saved-modal"
                aria-describedby="saved-modal-modal"
                >
                <Box sx={ModalStyle}>
                    <Typography id="saved-modal-description" sx={{ mt: 2 }}>
                        {props.modalText}
                    </Typography>
                </Box>
            </Modal>
            <div style={{position:"relative"}}>
                <SearchBar 
                    Search={props.Search}
                    search_content={props.search_content}
                    changeSearchTerms={props.changeSearchTerms}
                    enterPressed={enterPressed}
                    />
                <div style={{position:'absolute', zIndex:99, width:"100%"}}>
                    <ResultSpace>
                        {props.children}
                    </ResultSpace>
                </div>
            </div>
        </>
    );
}

export default SearchTemplate;
