import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationDisplay from '../../../_components/location'

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

/*
    requires:
        modalOpen
        modalClose
        modalText

        addressLineOne
        addressLineTwo
        city
        state
        zip

        first_name
        last_name
        email
        pronouns
        birthday        
*/

function ProfilePage(props) {

    return (
        <Box bgcolor="lightbackground.main" sx={{minHeight:"100vh"}} >
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
            <div style={{ padding: "1em" }} >
                <Typography variant="h3" color="darktext.main" align="center">
                    Profile
                </Typography>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
                <div style={{gridColumn:1}}>
                    <Typography variant="h3" color="darktext.main" align="center">
                        Location
                    </Typography>
                    <div style={{marginRight:'auto', marginLeft:'auto', width:'fit-content'}}>
                        <LocationDisplay
                            addressLineOne={props.addressLineOne}
                            addressLineTwo={props.addressLineTwo}
                            city={props.city}
                            state={props.state}
                            zip={props.zip}
                            variant='p'
                            color='darktext'
                            />
                    </div>
                </div>
                <div style={{ gridColumn:2 }}>
                    <Typography variant="h3" color="darktext.main" align="center" display='block'>
                        Personal Info
                    </Typography>
                    <Typography variant="p" color="darktext.main" align="center" display='block'>
                        Name: {props.first_name + ' ' + props.last_name}
                    </Typography>
                    <Typography variant="p" color="darktext.main" align="center" display='block'>
                        Email: {props.email}
                    </Typography>
                    <Typography variant="p" color="darktext.main" align="center" display='block'>
                        Pronouns: { props.pronouns ? props.pronouns : "None listed" }
                    </Typography>
                    <Typography variant="p" color="darktext.main" align="center" display='block'>
                        Birthday: { props.birthday ? props.birthday : "None listed" }
                    </Typography>
                </div>
            </div>
        </Box>
    );
}

export default ProfilePage;
