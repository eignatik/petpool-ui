import React, {Component} from 'react';
import {Form, Segment, Button, Divider, Message} from "semantic-ui-react";
import {ValidationUtil} from "../../util/ValidationUtil";
import {Country} from "../../constants/Country";

const USERNAME = "userName";
const EMAIL = "email";
const PASSWORD = "password";
const CONFIRMED_PASSWORD = "confirmedPassword";
const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";

const ERROR_MESSAGES = {
  isEmpty: "Element is empty",
  emailHasError: "Email is not valid",
  lessThanSixLetters: "This userName must be more than 6 symbols",
  moreThanTwentyLetters: "This userName must be less than 20 symbols",
  hasIncorrectUserNameSymbols: "This field must be consisted of english, russian letters, dot or hyphen; First and last symbols must be only letter",
  hasIncorrectPersonNameSymbols: "This field must be consisted of english or russian letters",
  notConfirmed: "Passwords are not the same",
  userNameIsTaken: "This userName is already used",
  emailIsTaken: "This email is already used"
};

class SignUp extends Component {

  constructor(props) {
    super(props);

    let countriesList = Country.getCountriesForDropDownUi();

    let Russia = countriesList.find(x => x.key === "ru");
    let defaultCountry = Russia == null ? countriesList[0].value : Russia.value;

    this.state = {
      countries: countriesList,
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
          lessThanSixLetters: false,
          moreThanTwentyLetters: false,
          hasIncorrectUserNameSymbols: false,
          userNameIsTaken: false
        },
        email: {
          isEmpty: false,
          emailHasError: false,
          emailIsTaken: false
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

  setError(name, value) {
     let errors = this.getInnerErrors();
     switch(name) {
       case USERNAME:
         errors[name].userNameIsTaken = !value;
         break;
       case EMAIL:
         errors[name].emailIsTaken = !value;
         break;
       default: break;
     }
     this.setInnerErrors(errors);
  }

  handleChange(event, formResult) {
    let name = formResult.name;
    let value = formResult.value;

    if(name == null)
      return;

    let updatedObject = {
     ...this.state.person
    };

    updatedObject[name] = value;

    this.setState({person: updatedObject}, () => { this.validateProperty(name, value)});
  }

  validateProperty(name, value) {
    let errors = this.getInnerErrors();
    let isEmpty = ValidationUtil.checkElementIsEmpty(value);
    errors[name].isEmpty = isEmpty;

    switch(name) {
      case USERNAME:
        let lessThanSixLetters = ValidationUtil.checkUserNameIsTooShort(value);
        let moreThanTwentyLetters = ValidationUtil.checkUserNameIsTooLong(value);
        let hasIncorrectUserNameSymbols = ValidationUtil.checkUserNameHasIncorrectSymbols(value);

        errors[name].lessThanSixLetters = lessThanSixLetters;
        errors[name].moreThanTwentyLetters = moreThanTwentyLetters;
        errors[name].hasIncorrectUserNameSymbols = hasIncorrectUserNameSymbols;

        if(!isEmpty && !lessThanSixLetters && !moreThanTwentyLetters && !hasIncorrectUserNameSymbols) {
          ValidationUtil.checkUniqueByUserName(value, result => this.setError(name, result));
        }
        break;
      case EMAIL:
        let emailIsIsValid = ValidationUtil.checkEmailIsValid(value);
        errors[name].emailHasError = emailIsIsValid;

        if(!isEmpty && !emailIsIsValid) {
          ValidationUtil.checkUniqueByEmail(value, result => this.setError(name, result));
        }
        break;
      case PASSWORD:
        errors[PASSWORD].notConfirmed = ValidationUtil.checkElementsIsMatched(value, this.state.person.confirmedPassword);
        errors[CONFIRMED_PASSWORD].notConfirmed = ValidationUtil.checkElementsIsMatched(value, this.state.person.confirmedPassword);
        break;
      case CONFIRMED_PASSWORD:
        errors[PASSWORD].notConfirmed = ValidationUtil.checkElementsIsMatched(value, this.state.person.password);
        errors[CONFIRMED_PASSWORD].notConfirmed = ValidationUtil.checkElementsIsMatched(value, this.state.person.password);
        break;
      case FIRST_NAME:
      case LAST_NAME:
        errors[name].hasIncorrectPersonNameSymbols = ValidationUtil.checkUserNameOnlyAlphabet(value);
        break;
      default: break;
    }
    this.setInnerErrors(errors);
  }

  setInnerErrors(errors) {
    this.setState({errors: errors, isNotValid: Object.values(errors).some(x => Object.values(x).some(y => y)) || this.hasFormError()});
  }

  getInnerErrors() {
    return JSON.parse(JSON.stringify(this.state.errors));
  }

  hasError(name) {
    return Object.values(this.getInnerErrors()[name]).some(x => x);
  }

  hasFormError() {
    let validations = [ValidationUtil.checkElementIsEmpty(this.state.person.userName), ValidationUtil.checkElementIsEmpty(this.state.person.email),
      ValidationUtil.checkElementIsEmpty(this.state.person.firstName), ValidationUtil.checkElementIsEmpty(this.state.person.lastName),
      ValidationUtil.checkElementIsEmpty(this.state.person.city), ValidationUtil.checkEmailIsValid(this.state.person.email),
      ValidationUtil.checkElementIsEmpty(this.state.person.password), ValidationUtil.checkElementIsEmpty(this.state.person.confirmedPassword),
      ValidationUtil.checkElementsIsMatched(this.state.person.password, this.state.person.confirmedPassword),
      ValidationUtil.checkUserNameIsTooShort(this.state.person.userName), ValidationUtil.checkUserNameIsTooLong(this.state.person.userName),
      ValidationUtil.checkUserNameHasIncorrectSymbols(this.state.person.userName),
      ValidationUtil.checkUserNameOnlyAlphabet(this.state.person.firstName), ValidationUtil.checkUserNameOnlyAlphabet(this.state.person.lastName)];
    return validations.some(x => x);
  }

  displayErrorMessageForm(element) {
    for(var prop in element) {
      if(element[prop])
        return (<li>{ERROR_MESSAGES[prop]}</li>);
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
                    options={this.state.countries}
                    value={this.state.person.country}
                    onChange={this.handleChange}
                    error={this.hasError("country")} />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    required
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
