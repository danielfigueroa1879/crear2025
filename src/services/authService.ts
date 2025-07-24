import axios from 'axios';

const API_URL = 'https://api.example.com/auth'; // Reemplazar con la URL real de la API

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        throw new Error('Error en el inicio de sesión');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

export const getToken = () => {
    return localStorage.getItem('token');
};