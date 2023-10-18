import * as React from 'react';
import TextField from '@mui/material/TextField';
import Validation from "../../../../_services/validation";
import Ruler from '../ruler';

import './basic.css'

class BasicInfoMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid_email:Validation.email(this.props.email),
            valid_password:Validation.password(this.props.password),
        }
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }



    updateEmail(e) {
        this.props.updateString(e)
        this.setState({valid_email:Validation.email(e.target.value)})
    }
    updatePassword(e) {
        this.props.updateString(e);
        this.setState({valid_password:Validation.password(e.target.value)})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} style={{...this.props.style}} className="signup-form">
                <div className="single-line-text">
                    <div style={{gridRow:1}}>
                        <TextField sx={{width:"100%", border: (this.state.valid_email) ? '' : '1px solid red', borderRadius:1}} id="email" name="email" label="Email" variant='filled' value={this.props.email} onChange={this.updateEmail} />
                    </div>
                    <div style={{gridRow:2}}>
                        <TextField sx={{width:"100%", border: (this.props.matching_emails && this.state.valid_email) ? '' : '1px solid red', borderRadius:1}} id="confirmed_email" name="confirmed_email" label=" Confirm Email" variant='filled' value={this.props.confirmed_email} onChange={this.props.updateString} />
                        { !this.props.matching_emails && <p style={{color:"red"}}>Emails must match</p> }
                    </div>
                </div>
                <Ruler />
                <div className="single-line-text">
                    <TextField sx={{border: (this.state.valid_password && this.props.matching_passwords) ? '' : '1px solid red', borderRadius:1}}
                        type="password" id="password" name="password" label="Password" variant='filled' value={this.props.password} onChange={this.updatePassword} />
                    <TextField sx={{border: (this.state.valid_password && this.props.matching_passwords) ? '' : '1px solid red', borderRadius:1}}
                        type="password" id="confirmed_password" name="confirmed_password" label=" Confirm Password" variant='filled' value={this.props.confirmed_password} onChange={this.updatePassword} />
                    { !this.props.matching_passwords && <p style={{color:"red"}}>Passwords must match</p> }
                </div>
                <Ruler />
                <div className="single-line-text">
                    <TextField
                        id="birthday"
                        label="Birthday"
                        name='birthday'
                        type="date"
                        value={this.props.birthday}
                        onChange={this.props.updateString}
                        InputLabelProps={{ shrink: true, }}
                        variant="filled"
                        />
                </div>
            </form>
        )
    }
}

export default BasicInfoMenu
