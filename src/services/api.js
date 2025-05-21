import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Cambia si tu backend usa otro puerto

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para agregar token a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (data) => api.post('/login', data);
export const logout = () => api.post('/logout');
export const getProfile = () => api.get('/perfil');

// Usuarios
export const getUsers = () => api.get('/usuario');
export const createUser = (data) => api.post('/usuario', data);
export const updateUser = (id, data) => api.put(`/usuario/${id}`, data);
export const deleteUser = (id) => api.delete(`/usuario/${id}`);

// Roles
export const getRoles = () => api.get('/rol');
export const createRole = (data) => api.post('/rol', data);
export const updateRole = (id, data) => api.put(`/rol/${id}`, data);
export const deleteRole = (id) => api.delete(`/rol/${id}`);

// Permisos por rol
export const getRolePermissions = (rol_id) => api.get(`/roles/${rol_id}/permisos`);
export const updateRolePermissions = (rol_id, data) => api.put(`/roles/${rol_id}/permisos`, data);

export default api; 