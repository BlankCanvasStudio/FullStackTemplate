import * as React from 'react';

import './review.css'
import Ruler from '../ruler';
import Typography from '@mui/material/Typography';

function ReviewPane(props) {
    // email, birthday, username, real name, pronouns, bio
    return (
        <div style={{height:"100%", padding:'1em'}}>
            <Typography align='center' variant='h4' color='darktext'>
                Review
            </Typography>
            <div style={{padding:"1em"}} />
            <div style={{display:'grid', gridTemplateColumns:"1fr 1fr", width:"100%"}}>
                <Typography align='center' color='darktext' variant='p'>
                    Email
                </Typography>
                <Typography align='center' color='darktext' variant='p'>
                    {props.email || 'No Email'}
                </Typography>
            </div>
            <Ruler />
            <div style={{display:'grid', gridTemplateColumns:"1fr 1fr", width:"100%"}}>
                <Typography align='center' color='darktext' variant='p'>
                    Birthday
                </Typography>
                <Typography align='center' color='darktext' variant='p'>
                    {props.birthday || 'No Birthday'}
                </Typography>
            </div>
            <Ruler />
            <div style={{display:'grid', gridTemplateColumns:"1fr 1fr", width:"100%"}}>
                <Typography align='center' color='darktext' variant='p'>
                    Name
                </Typography>
                <Typography align='center' color='darktext' variant='p'>
                    {props.first_name || props.last_name ? (props.first_name + ' ' + props.last_name) : 'No Name Given'}
                </Typography>
            </div>
            <Ruler />
            <div style={{display:'grid', gridTemplateColumns:"1fr 1fr", width:"100%"}}>
                <Typography align='center' color='darktext' variant='p'>
                    Pronouns
                </Typography>
                <Typography align='center' color='darktext' variant='p'>
                    {props.pronouns || 'No Pronouns Given'}
                </Typography>
            </div>
        </div>
    );
} 


export default ReviewPane;
