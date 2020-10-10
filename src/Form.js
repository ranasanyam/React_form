import React, { useState } from 'react';
import './Form.css';
import { makeStyles } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, TextField, Button } from '@material-ui/core';
import { useStateValue } from './StateProvider';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
}));
function Form() {
  const [{ user }] = useStateValue();

    const classes = useStyles();

    const [error, setError] = useState({
        mobileError: ''
    });
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        gender: '',
        purpose: '',
        location: '',
        is_available: ''
    });
    const changeHandler = (event) => {
        event.preventDefault();
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
        setError({
          mobileError: ''
        });
      }
      const inputHandler = (e) => {
        e.preventDefault();
        if(formData.mobile.length !== 10) {
          setError({
            ...error,
            mobileError: 'Please enter a valid mobile no'
          });
        }

    
        console.log(formData);

        if(error.mobileError === '') {
          fetch('http://madebygorilla.com/api/v01/visitor/', {
          method: 'POST', // or 'PUT'
          headers: {
           'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*',
           'Access-Control-Allow-Headers': 'Origin',
           'Authorization':'token 9a39cc8d17dfc5eae96bad00c45859b208796615'
          },
          body: JSON.stringify(formData),
          })
          .then(response => response.json())
          .then(data => {
          console.log('Success:', data);
          })
          .catch((error) => {
          console.error('Error:', error);
          });
        }
        setFormData({
          name: '',
          mobile: '',
          gender: '',
          purpose: '',
          location: '',
          is_available: '',
        });
      }
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({
          ...formData,
          [name]: value
        });
        setError({
          mobileError: ''
        });
    }

    return (
        <div className="form">
          <div>
            <form className={classes.root} onSubmit={inputHandler}>
            <div className="component textfield">
              
             
              <TextField id="standard-basic" type="text" label="Your Name...." required className="text" value={formData.name} onChange={changeHandler} name="name" />
            </div>
            <div className="component textfield">
              <TextField id="standard-basic" type="number" fullWidth label="Your Mobile No...." required className="text" value={formData.mobile} onChange={changeHandler} name="mobile" />
             
              <p className="error">{error.mobileError}</p>
            </div>
            <div className="component">
            <FormControl component="fieldset" >
              <FormLabel component="legend" style={{ fontSize: 20, fontWeight: 'bold'}}>Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender">
                  <div>
                  <FormControlLabel value="f" checked={formData.gender==='f'} name="gender"  control={<Radio color="primary" />} onChange={handleChange} label="Female" />
                  <FormControlLabel value="m" control={<Radio color="primary" />} label="Male" onChange={handleChange} name="gender" checked={formData.gender==="m"} />
                  </div>
                </RadioGroup>
            </FormControl>
            </div>
            <div className="component">
            <FormControl component="fieldset" >
              <FormLabel component="legend" style={{ fontSize: 20, fontWeight: 'bold'}}>Purpose</FormLabel>
              <RadioGroup aria-label="purpose" name="purpose">
                <div>
                
                <FormControlLabel  control={<Radio color="primary" />}  value="Meeting" checked={formData.purpose==="Meeting"} name="purpose" onChange={handleChange} label="Meeting" />
                <FormControlLabel  control={<Radio color="primary" />}  value="Personal" checked={formData.purpose==="Personal"} name="purpose" onChange={handleChange} label="Personal" />
                <FormControlLabel  control={<Radio color="primary" />}  value="Office" checked={formData.purpose==="Office"} name="purpose" onChange={handleChange} label="Office" />
                </div>

              </RadioGroup>
            </FormControl>
            </div>
            <div className="component">
            <FormControl component="fieldset" >
              <FormLabel component="legend" style={{ fontSize: 20, fontWeight: 'bold'}}>Is Available</FormLabel>
                <RadioGroup aria-label="is_available" name="is_available">
                  <div>
                  <FormControlLabel value="ava" checked={formData.is_available==='ava'} name="is_available"  control={<Radio color="primary" />} onChange={handleChange} label="Available" />
                  <FormControlLabel value="unava" control={<Radio color="primary" />} label="Unavailable" onChange={handleChange} name="is_available" checked={formData.is_available==="unava"} />
                  <FormControlLabel value="unk" checked={formData.is_available==='unk'} name="is_available"  control={<Radio color="primary" />} onChange={handleChange} label="Unavailable" />
                  </div>
                </RadioGroup>
            </FormControl>
            </div>

            <div className="component">
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ fontSize: 20, fontWeight: 'bold'}}>Location</FormLabel>
                <RadioGroup aria-label="state" name="state">
                  <div>
                  <FormControlLabel value="pb" checked={formData.location==='pb'} name="location"  control={<Radio color="primary" />} onChange={handleChange} label="PB" />
                  <FormControlLabel value="uk" control={<Radio color="primary" />} label="UK" onChange={handleChange} name="location" checked={formData.location==="uk"} />
                  </div>
                </RadioGroup>
            </FormControl>
            </div>
            <div className="component">
              <Button type="submit" className='form__button' >Submit</Button>
            </div>
          </form>

          </div>
        </div>
    )
}
export default Form;