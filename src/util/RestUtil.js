import axios from 'axios';

export class RestUtil {

  static BASE_URL = "http://localhost:3000/";
  static ERROR_TYPE = {
    BAD_REQUEST: "BAD_REQUEST",
    NOT_AUTHORIZED: "NOT_AUTHORIZED",
    SERVER_ERROR: "SERVER_ERROR",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    BAD_TOKEN: "BAD_TOKEN",
    OTHER_AUTH_ERROR: "OTHER_AUTH_ERROR",
    BANNED: "BANNED",
    ACCESS_DENIED: "ACCESS_DENIED"
  };

  static health() {
    axios.get("/health")
    .then((res) => {
      return res.status === 200;
    });
  }

  static url(endpoint) {
    return this.BASE_URL + endpoint;
  }

  static redirect(endPoint) {
    window.location.href = endPoint;
  }

  static getUser() {
    return {
      "name": "jdoe",
      "firstName": "John",
      "lastName": "Doe",
      "city": "Saint Petersburg",
      "country": "RU",
    }
  }

}
