// plugins/api.client.ts
import axios from 'axios'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const api = axios.create({
        baseURL: config.public.API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    api.interceptors.request.use(config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    })

    api.interceptors.response.use(
        response => response,
        error => {
            console.error('[axios error]', error.response?.status, error.response?.data)
            if (error.response?.status === 401) {
                const token = useCookie('auth_token')
                token.value = null
            }
            return Promise.reject(error)
        }
    )

    // делаем доступным как $api
    nuxtApp.provide('api', api)
})
