import {RestUtil} from "./RestUtil";

const LOGIN = "login";
const EMAIL = "email";
const UNIQUE_USERNAME = "uniqueUserName";
const UNIQUE_EMAIL = "uniqueEmail";

export class ValidationUtil {

  static checkElementIsEmpty(value) {
    return value == null || value.length === 0;
  }

  static checkElementIsTooShort(value, len) {
     return value == null || value.length < len;
  }

  static checkElementIsTooLong(value, len) {
     return value == null || value.length > len;
  }

  static checkUserNameOnlyAlphabet(value) {
     return !/^[A-Za-zА-Яа-я]+$/.test(value);
  }

  static checkUserNameHasIncorrectSymbols(value) {
    return value != null && value.length > 2
      && !/^([A-Za-z0-9])([A-Za-z0-9_\.]+)([A-Za-z0-9])$/.test(value);
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