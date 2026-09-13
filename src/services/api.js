import axios from 'axios'
import { API_CONFIG } from '../config/api.js'

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export const authAPI = {
    login: async (email, password) => {
        const response = await api.post(
            API_CONFIG.ENDPOINTS.LOGIN,
            {
                email,
                password
            }
        )

        return response.data
    }
}

export const productsAPI = {
    getAll: async () => {
        const response = await api.get(
            API_CONFIG.ENDPOINTS.PRODUCTS
        )

        return response.data
    }
}

export default api