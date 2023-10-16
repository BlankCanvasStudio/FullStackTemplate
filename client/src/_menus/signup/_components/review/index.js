import * as React from 'react';

import './review.css'
import Ruler from '../ruler';

function ReviewPane(props) {
    // email, birthday, username, real name, pronouns, bio
    return (
        <div style={{background:"#1E1E1E", height:"100%", padding:'1em'}}>
            <div style={{textAlign:"center"}}>
                <h1 style={{color:"white", marginTop:"0"}}>Review</h1>
            </div>
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:'grid', gridTemplateColumns:"1fr 1fr", width:"100%"}}>
                    <div style={{display:"flex", justifyContent:"center", textAlign:'center'}}>
                        <p style={{color:"white"}}>Email</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"center", textAlign:'center'}}>
                        <p style={{color:"white"}}>{props.email || 'No Email'}</p>
                    </div>
                </div>
            </div>
            <Ruler />
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:'grid', gridTemplateColumns:"1fr 1fr", width:"100%"}}>
                    <div style={{display:"flex", justifyContent:"center", textAlign:'center'}}>
                        <p style={{color:"white"}}>Birthday</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"center", textAlign:'center'}}>
                        <p style={{color:"white"}}>{props.birthday || 'No Birthday'}</p>
                    </div>
                </div>
            </div>
            <Ruler />
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:'grid', gridTemplateColumns:"1fr 1fr", width:"100%"}}>
                    <div style={{display:"flex", justifyContent:"center", textAlign:'center'}}>
                        <p style={{color:"white"}}>Name</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"center", textAlign:'center'}}>
                        <p style={{color:"white"}}>{props.first_name || props.last_name ? (props.first_name + ' ' + props.last_name) : 'No Name Given'}</p>
                    </div>
                </div>
            </div>
            <Ruler />
            <div style={{display:"flex", justifyContent:"center"}}>
                <div style={{display:'grid', gridTemplateColumns:"1fr 1fr", width:"100%"}}>
                    <div style={{display:"flex", justifyContent:"center", textAlign:'center'}}>
                        <p style={{color:"white"}}>Pronouns</p>
                    </div>
                    <div style={{display:"flex", justifyContent:"center", textAlign:'center'}}>
                        <p style={{color:"white"}}>{props.pronouns || 'No Pronouns Given'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 


export default ReviewPane;
