import {RestUtil} from "./RestUtil";

const LOGIN = "login";
const EMAIL = "email";
const UNIQUE_USERNAME = "uniqueUserName";
const UNIQUE_EMAIL = "uniqueEmail";
const MIN_LENGTH_USERNAME = 6;
const MAX_LENGTH_USERNAME = 20;

export class ValidationUtil {

  static checkElementIsEmpty(value) {
    return !value;
  }

  static checkUserNameIsTooShort(value) {
     return !!value && value.length < MIN_LENGTH_USERNAME;
  }

  static checkUserNameIsTooLong(value, len) {
     return !!value && value.length > MAX_LENGTH_USERNAME;
  }

  static checkUserNameOnlyAlphabet(value) {
     return !/^[A-Za-zА-Яа-я]+$/.test(value);
  }

  static checkUserNameHasIncorrectSymbols(value) {
    return !!value && value.length >= MIN_LENGTH_USERNAME
      && !/^([A-Za-z0-9])([A-Za-z0-9_\.]+)([A-Za-z0-9])$/.test(value);
  }

  static checkEmailIsValid(value) {
    return !/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/.test(value);
  }

  static checkElementsIsMatched(value, original) {
     return value !== original;
  }

  static checkUniqueByUserName(value, func) {
    RestUtil.getUniqueBeforeSignUp(LOGIN, UNIQUE_USERNAME, value, func);
  }

  static checkUniqueByEmail(value, func) {
    RestUtil.getUniqueBeforeSignUp(EMAIL, UNIQUE_EMAIL, value, func);
  }
}