import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://65.0.199.218:8080', // Your backend URL
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
