import axios from 'axios';

export class RestUtil {

  static health() {
    axios.get("/health")
    .then((res) => {
      return res.status === 200;
    });
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
