import React from "react"
import Typography from '@mui/material/Typography';



// This is meant to display a location, not fill out the field
function LocationDisplay(props) {

    return (
        <>
            <Typography variant={props.variant} color={props.color + '.main'} display="block">
                {props.addressLineOne}
            </Typography>
            <Typography variant={props.variant} color={props.color + '.main'} display="block">
                {props.addressLineTwo}
            </Typography>
            <Typography variant={props.variant} color={props.color + '.main'} display="block">
                {props.city} {props.state}, {props.zip}
            </Typography>
        </>
    );
}

export default LocationDisplay;
