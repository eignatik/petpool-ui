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
    fetch(RestUtil.url("health"))
    .then(result => {
      console.log(result);
      return result.json();
    }).then(data => {
      const status = data && data["status"];
      let applicationUp = data && data["applicationStatus"];
      let result;
      if (status === 401) {
        result = "Server responded with unauthorized error: " + status;
      } else {
        result = applicationUp? "Server is up & running" : "Server isn't"
            + " responsing";
      }

    console.log(data);
      this.setState({serverStatus: result});

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
