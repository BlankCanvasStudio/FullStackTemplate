import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import Button from '@mui/material/Button'

import './search-bar.css'

function SearchBar(props) {
    return (
        <div className="generic-search-bar">
            <TextField id="filled-basic" label="Search Users" variant="filled" 
                name="search" value={props.search_content} 
                sx={{width:"100%"}}
                onKeyDown={(e) => { props.enterPressed(e, props.Search) } }
                onChange={(e) => {props.changeSearchTerms(e.target.value)}}
                />
            <div className="generic-search-bar-button">
                <Button color="inherit" size="small" onClick={props.Search}>
                    <TravelExploreIcon />
                </Button>
            </div>
        </div>
    );
}
export default SearchBar;
