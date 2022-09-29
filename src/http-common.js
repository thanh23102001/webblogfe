import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    // "Content-type": "application/json",
    // enctype:"multipart/form-data",
    "Content-type":'application/json',
    // processData: false,
  }
});