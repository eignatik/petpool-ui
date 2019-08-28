import React from 'react';
import './App.css';
import {Redirect} from "react-router-dom";
import Login from "../login/Login";
import SignUp from "../signup/SignUp";
import Dashboard from "../dashboard/Dashboard";
import Header from "../layouts/Header";
import {Route} from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    !!localStorage.getItem("accessToken")
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

const App = () => (
  <div>
    <Header/>

    <div className='ui container'>
      <Route path={'/login'} exact component={Login}/>
      <Route path={'/signup'} exact component={SignUp}/>

      <PrivateRoute path={'/'} exact component={Dashboard}/>
    </div>
  </div>
);

export default App;
