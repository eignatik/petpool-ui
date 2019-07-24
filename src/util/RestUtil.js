import axios from 'axios';

export class RestUtil {

  static BASE_URL = "http://localhost:3000/";

  static health() {
    axios.get("/health")
    .then((res) => {
      return res.status === 200;
    });
  }

  static url(endpoint) {
    return this.BASE_URL + endpoint;
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
