import axios from "axios";

export const Instance = axios.create({
    baseURL: 'http://127.0.0.1:8003',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });