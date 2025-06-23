import api from './api';

const login = (username, password) => {
    return api
        .post('/auth/login', {
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
