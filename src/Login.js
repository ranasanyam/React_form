import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';



function Login() {
    const [{ user, isVerified }, dispatch] = useStateValue();
    const [value, setValue] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(null);


    const loginHandler = () => {
        if(value.length !== 10) {
            setError('Invalid Mobile No!');
            setLoggedIn(false);
        }
        else {
            setLoggedIn(true);
        }
        dispatch({
            type: actionTypes.SET_USER,
            user: value,
            isVerified: loggedIn
        });
        
        console.log('logged in');
        
    };

    return (
        <div className="login">
            <div className="login__container">
                {!isVerified ? (
                  <div>
                    <h1 className="login__text">Login With Mobile</h1>
                      <div className="login__component">
                        <TextField style={{ marginBottom: 12,  width: '80%', marginTop: 10}} id="standard-basic" type="number" fullWidth label="Enter Your Mobile No...." required className="text"   name="mobile" value={value} onChange={(e) => setValue(e.target.value)} />
          
                        <p className="error">{error}</p>
                        <Button className="login__button" onClick={loginHandler}>Login</Button>
                      </div>
                  </div>
                  ) : (
                     <Redirect to="/auth" /> 
                  )
                }        
            </div>
        </div>
        
    )
}

export default Login;
