import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Your backend URL
  withCredentials: true, // Include cookies in requests
});

export default axiosInstance;
