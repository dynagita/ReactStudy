import axios from "axios";
import { getToken } from "./Auth";

const Api = axios.create({
  baseURL: "https://my-work-time-dev.herokuapp.com/api/",
  headers:{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000"
  }
});

Api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }  
  return config;
});

export default Api;