import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.127.130.197:8080', // Your backend URL
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
