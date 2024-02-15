import axios from "axios";

export const Instance = axios.create({
    baseURL: 'https://campus-life-961c225b9b16.herokuapp.com/api/v1/student/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });