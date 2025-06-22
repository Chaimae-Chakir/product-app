import axios from 'axios';
import AuthService from './AuthService';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(config => {
    const user = AuthService.getCurrentUser();
    if (user && user.accessToken) {
        config.headers['Authorization'] = 'Bearer ' + user.accessToken;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api; 