import React from "react"
import Typography from '@mui/material/Typography';



// This is meant to display a  not fill out the field
function LocationDisplay(props) {
    let last_address_line = props.city ? 
        props.city + ', ' + props.state + ' ' + props.zip
        : props.state ?
            props.state + ' ' + props.zip
            : props.zip > 0 ?
                "Zip Code: " + props.zip
                : undefined;

    return (
        <>
            <Typography variant={props.variant} color={props.color + '.main'} display="block">
                {props.addressLineOne}
            </Typography>
            <Typography variant={props.variant} color={props.color + '.main'} display="block">
                {props.addressLineTwo}
            </Typography>
            <Typography variant={props.variant} color={props.color + '.main'} display="block">
                {last_address_line}
            </Typography>

            {
                !props.addressLineOne && 
                !props.addressLineTwo && 
                !last_address_line    
                ?
                <Typography variant={props.variant} color={props.color + '.main'} display="block">
                    No address listed
                </Typography>
                :
                undefined
            }
        </>
    );
}

export default LocationDisplay;
