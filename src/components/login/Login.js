import React, {Component} from 'react';
import {
  Button,
  Divider,
  Form,
  Grid, Header,
  Icon,
  Input, Message,
  Segment
} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {RestUtil} from "../../util/RestUtil";
import {ValidationUtil} from "../../util/ValidationUtil";

class Login extends Component {

  constructor() {
    super();
    this.state = {
      isEmail: false,
      error: {}
    };
    this.logIn = this.logIn.bind(this);
    this.getProcessedFieldData = this.getProcessedFieldData.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
  }

  handleLoginChange(event) {
      let value = event.target.value;
      this.setState({isEmail: ValidationUtil.checkEmailIsValid(value)});
  }

  getError() {
    console.log(this.state.error);
    if (this.state.error["message"]) {
      let type = this.state.error["type"];
      let details;
      switch (type) {
        case RestUtil.ERROR_TYPE.ACCESS_DENIED:
          details = `Given credentials are not correct. Please try to enter correct credentials.`;
          break;
        default:
          details = `Authorization just didn't work, we are sorry. Probably something went wrong. Try again or contact a support`;
      }
      return (
          <Message negative>
            <Message.Header>{this.state.error["message"]}</Message.Header>
            <p>{details}</p>
          </Message>
      );
    }
    return null;
  }

  getProcessedFieldData(login, password) {
      if(ValidationUtil.checkEmailIsValid(login)) {
          return {
              email: login,
              name: '',
              password: password
          }
      } else {
          return {
              email: '',
              name: login,
              password: password
          }
      }
  }

  logIn(e) {
    e.preventDefault();

    fetch(RestUtil.url("token/request"), {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.getProcessedFieldData(e.currentTarget[0].value, e.currentTarget[1].value))
    }).then(response => response.json())
    .then(responseJson => {
      localStorage.setItem("accessToken",
          responseJson["payload"]["accessToken"]);
      localStorage.setItem("expired", responseJson["payload"]["expired"]);
      localStorage.setItem("refreshToken",
          responseJson["payload"]["refreshToken"]);
      return responseJson["error"];
    })
    .then((errorPresent) => {
      console.log(errorPresent);
      if (!errorPresent) {
        RestUtil.redirect("/dashboard");
      } else {
        this.setState({
          error: errorPresent
        })
      }
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
        <Segment placeholder>

          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Form onSubmit={this.logIn} method={'POST'}>
                  <Form.Group widths={'equal'}>
                    <Form.Field required='true'>
                      <Input iconPosition='left' placeholder='Email or login'>
                        <Icon name={this.state.isEmail ? 'at' : 'user'} />
                        <input onChange={this.handleLoginChange}/>
                      </Input>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <Form.Field required='true'>
                      <Input iconPosition='left' type='password'
                             placeholder='****' value={'123'}>
                        <Icon name='key'/>
                        <input/>
                      </Input>
                    </Form.Field>
                  </Form.Group>
                  <Button primary type='submit'>Log In</Button>
                  {this.getError()}
                </Form>
              </Grid.Column>

              <Grid.Column>
                <Header icon>
                  <Icon name='user plus'/>
                  Don't have an account?
                </Header>
                <Link to={'/signup'}>
                  <Button default>Sign up</Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    );
  }
}

export default Login;
