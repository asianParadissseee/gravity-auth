// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},
    modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/icon', '@nuxt/fonts', '@pinia/nuxt'],
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ]
    },
    pinia: {
        storesDirs: ['./stores/**', './custom-folder/stores/**'],
    },
    runtimeConfig: {
        public: {
            API_URL: process.env.VITE_API_URL,
        }
    }
})