import React from 'react';
import './App.css';
import {Link} from "react-router-dom";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import Dashboard from "../dashboard/Dashboard";
import {Route} from "react-router";

const App = () => (
    <div className='ui container'>
      <Route path={'/login'} exact component={Login}/>
      <Route path={'/signup'} exact component={SignUp}/>
      <Route path={'/dashboard'} exact component={Dashboard}/>

      <Link to={'/login'}>LogIn</Link> <br/>
      <Link to={'/signup'}>Sign Up</Link> <br/>
      <Link to={'/dashboard'}>User Info</Link>
    </div>
);

export default App;
