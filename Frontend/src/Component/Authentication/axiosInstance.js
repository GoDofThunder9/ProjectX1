import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://aaditgroups.com/api', // Your backend URL
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
