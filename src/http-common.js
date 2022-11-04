import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4080",
  headers: {
    "Content-type": "application/json"
  },
  auth: {
    username: 'admin',
    password: 'Complexpass#4321'
  }
});