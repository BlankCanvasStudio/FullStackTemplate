import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import AuthService from "../../_services/auth";
import Validation from "../../_services/validation";
import BasicInfoMenu from './_components/basic';
import DetailsMenu from './_components/details';

import './signupMenu.css';
import ReviewPane from './_components/review';


const steps = ['Basic Info', 'Create Profile', 'Review'];

class SignUpMenu extends React.Component {

    constructor(props) {
        super(props)
        let skipped = new Set();
        this.state = {
            activeStep:0,
            skipped:skipped,
            email:'',
            confirmed_email:'',
            password:'',
            confirmed_password:'',
            birthday:'',
            country:'USA',
            username:'',
            pronouns:'',
            first_name:'',
            last_name:'',
            bio:'',
        }

        this.steps = ['Basic Info', 'Create Profile', 'Review'];
        this.isStepSkipped = this.isStepSkipped.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleReset = this.handleReset.bind(this);

        this.updateString = this.updateString.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.verifyEmail = this.verifyEmail.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
        this.verifyBirthday = this.verifyBirthday.bind(this);
        this.verifySubmission = this.verifySubmission.bind(this);

    }
  
    isStepOptional(step) { return step === 1; }

    isStepSkipped(step) { return this.state.skipped.has(step); }

    handleNext() {
        let newSkipped = this.state.skipped;
        if (this.isStepSkipped(this.state.activeStep)) {
            newSkipped = new Set(newSkipped.values())
            newSkipped.delete(this.state.activeStep)
        }
        if (this.state.activeStep < this.steps.length - 1 ) {
            this.setState({activeStep:this.state.activeStep + 1, skipped:newSkipped});
        }
        else { // Finish is clicked
            this.handleSubmit()
        }
    }
    handleBack() {
        if (this.state.activeStep) {
            if(this.isStepSkipped(this.state.activeStep)) { 
                let newSkipped = new Set(this.state.skipped.values());
                newSkipped.delete(this.state.activeStep);
                this.setState({activeStep: this.state.activeStep - 1, skipped:newSkipped}); 
            }
            else { this.setState({activeStep: this.state.activeStep - 1}); }
        }
    }
    handleSkip() {
        if(!this.isStepOptional(this.state.activeStep)) { return; } // Illegal so prevent
        this.setState({ activeStep:this.state.activeStep + 1, skipped: (new Set(this.state.skipped.values())).add(this.state.activeStep) })   // ;-)
    }
    handleReset() { this.setState({activeStep:0}); }


    updateString(e) { 
        this.setState({[e.target.name]:e.target.value}, () =>{console.log(this.state)}); 
    }


    verifyEmail() {
        if(!(this.state.email.length && this.state.confirmed_email.length)) { return false; }
        if (this.state.email !== this.state.confirmed_email) { return false; }
        return Validation.email(this.state.email)
    }
    verifyPassword() {
        if (this.state.password !== this.state.confirmed_password) { return false; }
        return Validation.password(this.state.password)
    }
    verifyBirthday() {
        if(!this.state.birthday || !this.state.birthday.length) { return true; }
        return Validation.date(this.state.birthday)
    }
    verifySubmission() {
        if(!this.verifyEmail()) { return false; }
        if(!this.verifyPassword()) { return false; }
        if(!this.verifyBirthday()) { return false; }
        return true;
    }


    handleSubmit() {
        if (!this.verifySubmission()) { this.props.validation_failed('Invalid information submitted. Please fix and try again'); return }
        AuthService.register(
            this.state.email, this.state.username, 
            this.state.pronouns, this.state.password, 
            this.state.birthday, this.state.country, 
            this.state.first_name, this.state.last_name
            ).then((res)=>{
                this.props.signupAction(res)
            }).catch(
                error => {
                    console.log(error)
                    console.log(error.response.data)
                    this.props.validation_failed(error.response.data.message)
                });
    }

    render() {
        return (
            <div className="signup-menu-wrapper">
                <Box style={{backgroundColor:"#505378", maxWidth:"100vw"}}>
                    <Stepper activeStep={this.state.activeStep} sx={{ paddingLeft:"5%", paddingRight:"5%", marginBottom:"2em", backgroundColor:"#505378"}}>
                        {this.steps.map((label, index) => {
                            const stepProps = this.isStepSkipped(index) ? {completed: false} : {};
                            const labelProps = this.isStepOptional(index) ? { optional:<Typography variant="caption" ><p style={{color:"white"}}>Optional</p></Typography> } : {};
                            return (
                                <Step key={label} {...stepProps} sx={{color:"white"}}>
                                    <StepLabel {...labelProps}><p style={{color:"white"}}>{label}</p></StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
                
                
                <React.Fragment>
                    
                    <div style={{flexGrow:"1", maxWidth:"100vw"}}>
                        {
                            this.state.activeStep === 0 &&
                                <BasicInfoMenu 
                                    email={this.state.email}
                                    confirmed_email={this.state.confirmed_email}
                                    password={this.state.password}
                                    confirmed_password={this.state.confirmed_password}
                                    birthday={this.state.birthday}
                                    updateString={this.updateString}
                                    matching_emails={this.state.email === this.state.confirmed_email}
                                    matching_passwords={this.state.password === this.state.confirmed_password}
                                    />
                        }

                        {
                            this.state.activeStep === 1 &&
                                <DetailsMenu 
                                    first_name={this.state.first_name}
                                    last_name={this.state.last_name}
                                    pronouns={this.state.pronouns}
                                    updateString={this.updateString}
                                    />
                        }
                        {
                            this.state.activeStep === 2 && 
                                <ReviewPane
                                    email={this.state.email}
                                    birthday={this.state.birthday}
                                    first_name={this.state.first_name}
                                    last_name={this.state.last_name}
                                    pronouns={this.state.pronouns}
                                    />
                        }
                    </div>


                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, backgroundColor:"#1E1E1E", paddingBottom:"1em", maxWidth:"100vw" }}>
                        <Button
                            color="inherit"
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
                            sx={{ color:"white", backgroundColor:"#E26989", marginLeft:"10%" }}
                            variant="filled"
                            >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        { this.isStepOptional(this.state.activeStep) && (
                            <Button color="inherit" onClick={this.handleSkip} sx={{ mr: 1, color:"white", backgroundColor:"#B083EC" }} variant="filled">
                                Skip
                            </Button>
                        )}
            
                        <Button onClick={this.handleNext} variant="filled" style={{color:"white", backgroundColor:"#00B69A",  marginRight:"10%"}}>
                            {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>

                </React.Fragment>
            </div>
        )
    }
}

export default SignUpMenu;
