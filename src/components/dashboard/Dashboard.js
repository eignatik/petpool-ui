import React, {Component} from 'react';
import {Segment} from "semantic-ui-react";
import {RestUtil} from "../../util/RestUtil";

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      serverStatus: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/health")
    .then(result => {
      console.log(result);
      return result.json();
    }).then(data => {
      let applicationUp = data && data["applicationStatus"];
    console.log(data);
      this.setState({serverStatus: applicationUp ?
            "Server is up and running" : "Server isn't responding"});

    })
  }

  render() {
    return (
        <Segment>
          <h1>Dashboard page</h1>
          <h2>Test user name: {RestUtil.getUser()["name"]}</h2>
          <h2>Checking connection to server: {this.state.serverStatus} </h2>
        </Segment>
        );
  }
}

export default Dashboard;
