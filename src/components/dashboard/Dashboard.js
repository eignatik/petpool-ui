import React, {Component} from 'react';
import {Message, Segment} from "semantic-ui-react";
import {RestUtil} from "../../util/RestUtil";

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      serverStatusResult: "",
      serverStatusMessage: "Wait, please..."
    }
  }

  checkUser() {
    let accessKey = localStorage.getItem("accessToken");
    let refreshKey = localStorage.getItem("refreshToken");
    if (!!refreshKey && !!accessKey) {
      return 'Welcome back!';

    }
    return "";
  }

  componentDidMount() {
    fetch(RestUtil.url("health"))
    .then(result => {
      console.log(result);

      let status = result.status;
      let isSuccessful = /^2/.test(status);
      this.setState({
        serverStatusMessage: `Response ${(isSuccessful ? "" : "ERROR")} code is ${status} (${result.statusText}). `
      });

      return result.json();
    }).then(data => {
      let applicationUp = data && data["payload"] && data["payload"]["applicationStatus"];
      let result = `Server is${(applicationUp? " up & running" : "n't responsing")}`;

      let messageForUser = this.checkUser();

      console.log(data);
      this.setState({
        serverStatusResult: result,
        userMessage: messageForUser
      });
    })
  }

  render() {
    return (
        <Segment>
          {this.state.userMessage}
          <h1>Dashboard page</h1>
          <h2>Test user name: {RestUtil.getUser()["name"]}</h2>
          <h2>Checking connection to server: {this.state.serverStatusMessage} {this.state.serverStatusResult}</h2>
        </Segment>
        );
  }
}

export default Dashboard;
