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

  static checkUniqueByUserName(func) {
    func(false); //fake
  }

  static checkUniqueByEmail(func) {
    func(false); //fake
  }

}