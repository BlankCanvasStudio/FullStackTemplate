import React from "react"
import { TextField } from '@mui/material';
import './location_entry.css'


function updateStringNumOnly(e, props) {
    if(isNaN(e.target.value) || e.target.value.length > 9) { return }
    props.updateString(e)
}


function LocationEntry(props) {

    return (
        <div className="LocationInput">
            <TextField
                label="Address Line One"
                id="addresLineOne"
                sx={{width:"100%", color:"white", borderColor:"white"}}
                name='addressLineOne' className="addressLineOne"
                value={props.addressLineOne} onChange={props.updateString}
                size="small"
                variant="filled"
                />
            <TextField
                label="Address Line Two"
                id="addresLineTwo"
                sx={{width:"100%", color:"white", borderColor:"white"}}
                name='addressLineTwo' className="addressLineTwo"
                value={props.addressLineTwo} onChange={props.updateString}
                size="small"
                variant="filled"
                />
            <TextField
                label="City"
                id="city"
                sx={{width:"100%", color:"white", borderColor:"white"}}
                name='city' className="city"
                value={props.city} onChange={props.updateString}
                size="small"
                variant="filled"
                />
            <TextField
                label="State"
                id="state"
                sx={{width:"100%", color:"white", borderColor:"white"}}
                name='state' className="state"
                value={props.state} onChange={props.updateString}
                size="small"
                variant="filled"
                />
            <TextField
                label="Zip"
                id="zip"
                sx={{width:"100%", color:"white", borderColor:"white", padding:0}}
                name='zip' className="zip"
                value={props.zip} 
                onChange={(e) => { updateStringNumOnly(e, props) } }
                size="small"
                variant="filled"
                />
        </div>
    );
}

export default LocationEntry;
