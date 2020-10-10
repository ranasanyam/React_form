
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import axios from 'axios';
import Login from './Login';
import Form from './Form';
import Auth from './Auth';


function App() {

  return (
    <div className="app">   
      <div className="app__body">
          <Router>
            <Switch>
              <Route exact path='/'>
                  <Login />
              </Route>
              <Route exact path="/auth">
                  <Auth />
              </Route>               
              <Route path="/signup" exact>
                <Form />   
              </Route>
              </Switch>
            </Router>
      </div>
 
    </div>
  );
}

export default App;
