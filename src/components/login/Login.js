import React, {Component} from 'react';
import {
  Button,
  Divider,
  Form,
  Grid, Header,
  Icon,
  Input,
  Segment
} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {RestUtil} from "../../util/RestUtil";

class Login extends Component {

  logIn(e) {
    // TODO: implement login
    // Should also implement handlers: success and error
    e.preventDefault();

    const data = {
      email: e.currentTarget[0].value,
      password: e.currentTarget[1].value
    };

    fetch(RestUtil.url("token/request"), {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(responseJson => {
      localStorage.setItem("accessToken", responseJson["accessToken"]);
      localStorage.setItem("expired", responseJson["expired"]);
      localStorage.setItem("refreshToken", responseJson["refreshToken"]);
    })
    .then(() => {
      console.log(window.location.href);
      window.location.href = "/dashboard";
      console.log(window.location.href);
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
                      <Input iconPosition='left' placeholder='Email or login' value={'user@test.test'}>
                        <Icon name='at'/>
                        <input/>
                      </Input>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths={'equal'}>
                    <Form.Field required='true'>
                      <Input iconPosition='left' type='password' placeholder='****' value={'123'}>
                        <Icon name='key'/>
                        <input/>
                      </Input>
                    </Form.Field>
                  </Form.Group>
                  <Button primary type='submit'>Log In</Button>
                </Form>
              </Grid.Column>

              <Grid.Column>
                <Header icon>
                  <Icon name='user plus' />
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
