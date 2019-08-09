import React, {Component} from 'react';
import {Form, Segment, Input, Icon, Button, Divider, Dropdown, Message} from "semantic-ui-react";
import {RestUtil} from "../../util/RestUtil";
import {COUNTRIES} from '../../constants';

const ERROR_TYPE = {
  isEmpty: "Element is empty",
  lessThanThreeLetters: "This userName must be more than 3 symbols",
  moreThanTwentyLetters: "This userName must be less than 20 symbols",
  hasIncorrectUserNameSymbols: "This field must be consisted of english, russian letters, dot or hyphen; First and last symbols must be only letter",
  hasIncorrectPersonNameSymbols: "This field must be consisted of english or russian letters",
  notConfirmed: "Passwords are not the same",
  userNameNotUnique: "This userName is already used",
  emailNotUnique: "This email is already used"
};

class SignUp extends Component {

  constructor(props) {
    super(props);

    let Russia = COUNTRIES.find(x => x.key === 'ru');
    let defaultCountry = Russia == null ? COUNTRIES[0].value : Russia.value;

    this.state = {
      person: {
        userName: '',
        email: '',
        password: '',
        confirmedPassword: '',
        firstName: '',
        lastName: '',
        country: defaultCountry,
        city: '',
      },
      errors: {
        userName: {
          isEmpty: false,
          lessThanThreeLetters: false,
          moreThanTwentyLetters: false,
          hasIncorrectUserNameSymbols: false,
          userNameNotUnique: false
        },
        email: {
          isEmpty: false,
          emailNotUnique: false
        },
        password: {
          isEmpty: false,
          notConfirmed: false
        },
        confirmedPassword: {
          isEmpty: false,
          notConfirmed: false
        },
        firstName: {
          isEmpty: false,
          hasIncorrectPersonNameSymbols: false
        },
        lastName: {
          isEmpty: false,
          hasIncorrectPersonNameSymbols: false
        },
        country: {
          isEmpty: false
        },
        city: {
          isEmpty: false
        }
      },
      loading: false,
      isNotValid: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  handleChange(e, d) {
    let name = d.name;
    let value = d.value;

    if(name == null)
      return;

    let updatedObject = {
     ...this.state.person
    };

    let updatedProperty = {
      ...updatedObject[name]
    };

    updatedProperty = value;
    updatedObject[name] = updatedProperty;

    this.setState({person: updatedObject}, () => { this.validateProperty(name, value)});
  }

  validateProperty(name, value) {
    let updatedObject = this.getInnerErrors();
    updatedObject[name].isEmpty = this.checkElementIsEmpty(value);

    switch(name) {
      case 'userName':
        updatedObject[name].lessThanThreeLetters = this.checkElementIsTooShort(value, 3);
        updatedObject[name].moreThanTwentyLetters = this.checkElementIsTooLong(value, 20);
        updatedObject[name].hasIncorrectUserNameSymbols = this.checkUserNameHasIncorrectSymbols(value);
        break;
      case 'password':
        updatedObject['password'].notConfirmed = this.checkPasswordNotConfirmed(value, this.state.person.confirmedPassword);
        updatedObject['confirmedPassword'].notConfirmed = this.checkPasswordNotConfirmed(value, this.state.person.confirmedPassword);
        break;
      case 'confirmedPassword':
        updatedObject['password'].notConfirmed = this.checkPasswordNotConfirmed(value, this.state.person.password);
        updatedObject['confirmedPassword'].notConfirmed = this.checkPasswordNotConfirmed(value, this.state.person.password);
        break;
      case 'firstName':
      case 'lastName':
        updatedObject[name].hasIncorrectPersonNameSymbols = this.checkElementIsNotOnlyAlphabet(value);
        break;
    }
    this.setState({errors: updatedObject, isNotValid: Object.values(updatedObject).some(x => Object.values(x).some(y => y)) || this.hasFormError()});
  }

  checkElementIsEmpty(value) {
    return value == null || value.length === 0;
  }

  checkElementIsTooShort(value, len) {
     return value == null || value.length < len;
  }

  checkElementIsTooLong(value, len) {
     return value == null || value.length > len;
  }

  checkElementIsNotOnlyAlphabet(value) {
     return !/^[A-Za-zА-Яа-я]+$/.test(value);
  }

  checkUserNameHasIncorrectSymbols(value) {
    return value != null && value.length > 2
      && !/^([A-Za-zА-Яа-я0-9])([A-Za-zА-Яа-я0-9_\.]+)([A-Za-zА-Яа-я0-9])$/.test(value);
  }

  checkPasswordNotConfirmed(value, original) {console.log(value + " " + original)
     return value != original;
  }

  getInnerErrors() {
    return JSON.parse(JSON.stringify(this.state.errors));
  }

  hasError(name) {
    return Object.values(this.getInnerErrors()[name]).some(x => x);
  }

  hasFormError() {
    let t = [this.checkElementIsEmpty(this.state.person.userName), this.checkElementIsEmpty(this.state.person.email),
      this.checkElementIsEmpty(this.state.person.firstName), this.checkElementIsEmpty(this.state.person.lastName),
      this.checkElementIsEmpty(this.state.person.city),
      this.checkElementIsEmpty(this.state.person.password), this.checkElementIsEmpty(this.state.person.confirmedPassword),
      this.checkPasswordNotConfirmed(this.state.person.password, this.state.person.confirmedPassword),
      this.checkElementIsTooShort(this.state.person.userName, 3), this.checkElementIsTooLong(this.state.person.userName, 20),
      this.checkUserNameHasIncorrectSymbols(this.state.person.userName),
      this.checkElementIsNotOnlyAlphabet(this.state.person.firstName), this.checkElementIsNotOnlyAlphabet(this.state.person.lastName)];
      return t.some(x => x);
  }

  displayErrorMessageForm(element) {
    for(var prop in element) {
      if(element[prop])
        return (<li>{ERROR_TYPE[prop]}</li>);
    }
  }

  displayErrorMessage(name) {
    let errors = this.getInnerErrors()[name];
    const values = Object.values(errors).filter(x => x);

    if(values.length > 0)
     return (<Message negative><ul>{ this.displayErrorMessageForm(errors) }</ul></Message>);
  }

  signUp(e) {
    e.preventDefault();
    this.setState({ loading: true});

    //todo: add fetch. Now this is fake
    setTimeout(() => this.setState({ loading: false}), 2000)
  }

  render() {
    return (
        <Segment>
          <h1>SignUp page</h1>
          <Segment>
            <Form onSubmit={this.signUp} method={'GET'}>
              <Form.Group widths={'equal'}>
                <Form.Input
                  required
                  label="Username"
                  type="text"
                  placeholder='Enter your username'
                  name="userName"
                  value={this.state.person.userName}
                  onChange={this.handleChange}
                  error={this.hasError("userName")} />
              </Form.Group>
              {this.displayErrorMessage("userName")}
              <Form.Group widths={'equal'}>
                <Form.Input iconPosition='left' icon='at'
                  required
                  label="Email"
                  type="text"
                  placeholder='Enter your email'
                  name="email"
                  value={this.state.person.email}
                  onChange={this.handleChange}
                  error={this.hasError("email")} />
              </Form.Group>
              {this.displayErrorMessage("email")}
              <Form.Group widths={'equal'}>
                <Form.Field>
                  <Form.Input iconPosition='left' icon='key'
                    required
                    label="Password"
                    type="password"
                    placeholder='Enter your password'
                    name="password"
                    value={this.state.person.password}
                    onChange={this.handleChange}
                    error={this.hasError("password") || this.hasError("confirmedPassword")} />
                </Form.Field>
                <Form.Field>
                  <Form.Input iconPosition='left' icon='key'
                    required
                    label="Repeat your password"
                    type="password"
                    placeholder='Repeat your password'
                    name="confirmedPassword"
                    value={this.state.person.confirmedPassword}
                    onChange={this.handleChange}
                    error={this.hasError("password") || this.hasError("confirmedPassword")} />
                  </Form.Field>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <Form.Field>{this.displayErrorMessage("password")}</Form.Field>
              </Form.Group>
              <Divider horizontal>Personal Information</Divider>
              <Form.Group widths={'equal'}>
                <Form.Field>
                  <Form.Input
                    required
                    label="First Name"
                    type="text"
                    placeholder='Enter your first name'
                    name="firstName"
                    value={this.state.person.firstName}
                    onChange={this.handleChange}
                    error={this.hasError("firstName")} />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    required
                    label="Last Name"
                    type="text"
                    placeholder='Enter your last name'
                    name="lastName"
                    value={this.state.person.lastName}
                    onChange={this.handleChange}
                    error={this.hasError("lastName")} />
                </Form.Field>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <Form.Field width={2}>{this.displayErrorMessage("firstName")}</Form.Field>
                <Form.Field width={2}>{this.displayErrorMessage("lastName")}</Form.Field>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <Form.Field>
                  <Form.Dropdown
                    label="Country"
                    type="select"
                    placeholder='Select your country'
                    name="country"
                    search
                    selection
                    options={COUNTRIES}
                    value={this.state.person.country}
                    onChange={this.handleChange}
                    error={this.hasError("country")} />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    required error={true}
                    label="City"
                    type="text"
                    placeholder='Enter your city'
                    name="city"
                    value={this.state.person.city}
                    onChange={this.handleChange}
                    error={this.hasError("city")} />
                </Form.Field>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <Form.Field width={2}>{this.displayErrorMessage("country")}</Form.Field>
                <Form.Field width={2}>{this.displayErrorMessage("city")}</Form.Field>
              </Form.Group>
              <Button primary type='submit'
                className={`${this.state.loading || this.state.isNotValid ? 'disabled': ''}`}>Sign up</Button>
            </Form>
          </Segment>
        </Segment>
    );
  }

}

export default SignUp;
