import React, {Component} from 'react';
import {Form, Segment, Input, Icon, Button} from "semantic-ui-react";

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  signUp() {

  }

  render() {
    return (
        <Segment>
          <h1>SignUp page</h1>
          <Segment>
            <Form onSubmit={this.signUp}>
              <Form.Group widths={'equal'}>
                <Form.Field
                    control={Input}
                    label='Username'
                    placeholder='Enter username'
                    required='true'
                />
              </Form.Group>
              <Form.Group widths={'equal'}>
                <Form.Field required='true'>
                  <label>Enter your email</label>
                  <Input iconPosition='left' type='email' placeholder='Email'>
                    <Icon name='at'/>
                    <input/>
                  </Input>
                </Form.Field>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <Form.Field required='true'>
                  <label>Enter a password</label>
                  <Input iconPosition='left' type='password'
                         placeholder='Enter your password'>
                    <Icon name='key'/>
                    <input/>
                  </Input>
                </Form.Field>
                <Form.Field required='true'>
                  <label>Repeat the password</label>
                  <Input iconPosition='left' type='password'
                         placeholder='Repeat your password' required='true'>
                    <Icon name='key'/>
                    <input/>
                  </Input>
                </Form.Field>
              </Form.Group>
              <Button primary type='submit'>Sign up</Button>
            </Form>
          </Segment>
        </Segment>
    );
  }

}

export default SignUp;
