const axios = require("axios");

class HTTPSingleton {
  static config = {
    // baseURL: "http://192.168.1.59:44351/",
    // baseURL: "http://192.168.1.56:8080/",
    // baseURL: "http://192.168.1.149:8080/",
    baseURL: "",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjTmdvVmFuSFRAZ21haWwuY29tIiwiaWF0IjoxNjg3MjMzODc1LCJleHAiOjE2ODczMjAyNzV9.XfgtOiKCxlMMMo2nYWfdk4e3FWgGRaBO4CyLG24idkt-JzseC-3dOPphRJuCAWW56h7fBd9cmCP0xHdxaN-znA",
    },
    timeout: 1000000,
  };

  static instance;
  HTTP;

  constructor() {
    this.HTTP = axios.create(HTTPSingleton.config);
  }

  static getInstance() {
    if (!HTTPSingleton.instance) {
      HTTPSingleton.instance = new HTTPSingleton();
    }
    return HTTPSingleton.instance;
  }

  getHTTP() {
    return this.HTTP;
  }
}

const HTTP = HTTPSingleton.getInstance().getHTTP();

module.exports = {
  HTTP,
};
