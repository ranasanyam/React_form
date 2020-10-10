import React, { useState } from 'react'
import './Auth.css';
import {  useHistory, Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import OtpInput from 'react-otp-input';
import { Button } from '@material-ui/core';

function Auth() {
    const history = useHistory();
    const [{ user, isVerified }] = useStateValue();
    const [otp, setOtp] = useState('');
    const [validOtp, setValidOtp] = useState(false);
    const [otpError, setOtpError] = useState('');

    const handleChange = (otp) => {
        setOtpError('');
        setOtp(otp);
    }
    const handleSubmit = () => {
        if (otp.length !== 4 && !validOtp) {
            setOtp('');
            setOtpError('Invalid OTP');
            history.push('/auth');
        }
        else {
            setValidOtp(true);
            history.push('/signup');
        }
    }
    return (
        <div className="auth">
            <div className="auth__container">
                {!isVerified ? (
                   <div>
                       <h2 style={{ marginBottom: 20 }}>You are not authenticated!<br></br>Contact your organization!</h2>
                       <Button className="auth__button"><Link style={{ textDecoration: 'none', color: 'white'}} to="/" >Login With Mobile</Link></Button>
                   </div>       
                  ) : (
                    <div className="auth__body">
                        <h1 className="auth__text">Enter Your OTP</h1>
                        <div  className="auth__otpContainer" >
                          <OtpInput
                            value={otp}
                            onChange={handleChange}
                            numInputs={4}
                            separator={<span> - </span>}
                          />
                          <p className="auth__error">{otpError}</p>
                        </div>
                        <Button className="auth__button" onClick={handleSubmit}>Submit</Button>
                        
                    </div>
                   )
                }
            </div>
        </div>
    )
}

 

export default Auth;
