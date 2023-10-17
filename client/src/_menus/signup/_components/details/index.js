import * as React from 'react';
import TextField from '@mui/material/TextField';

import Ruler from '../ruler'

import './details.css'

class DetailsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.updateName = this.updateName.bind(this);
        this.updatePronouns = this.updatePronouns.bind(this);
    }
    

    updateName(e) {
        if(e.target.value.length > 50) { return }
        this.props.updateString(e)
    }
    updatePronouns(e) {
        if(e.target.value.length > 15) { return }
        this.props.updateString(e)
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{...this.props.style}} className="signup-form">
                <div className="single-line-text">
                    <div style={{gridRow:1}}>
                        <TextField sx={{width:"100%"}} id="first_name" name="first_name" label="First Name" variant='filled' value={this.props.first_name} onChange={this.updateName} />
                    </div>
                </div>
                <br/>
                <div className="single-line-text">
                    <div style={{gridRow:1}}>
                        <TextField sx={{width:"100%"}} id="last_name" name="last_name" label="Last Name" variant='filled' value={this.props.last_name} onChange={this.updateName} />
                    </div>
                </div>
                <Ruler />
                <div className="single-line-text">
                    <TextField type="text" id="pronouns" name="pronouns" label="Pronouns" variant='filled' value={this.props.pronouns} onChange={this.updatePronouns} />
                </div>
            </form>
        )
    }
}

export default DetailsMenu
