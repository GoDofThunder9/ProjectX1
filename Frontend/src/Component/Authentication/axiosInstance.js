import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Your backend URL
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
