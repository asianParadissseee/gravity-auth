import {useNuxtApp} from '#app'
import type {User, UserForgotPasswordDto, UserLoginDto, UserResetPasswordDto, UserSignUpDto} from "#shared/types/user";

export class UserApi {
    static async getUser(): Promise<{ data: User }> {
        const {$api} = useNuxtApp()
        const response = await $api.get("/user")
        return response.data
    }

    static async login(data: UserLoginDto): Promise<any> {
        const {$api} = useNuxtApp()
        const response = await $api.post('/login', data)
        return response.data
    }

    static async signUp(data: UserSignUpDto): Promise<any> {
        const {$api} = useNuxtApp()
        const response = await $api.post('/register', data)
        return response.data
    }

    static async forgotPassword(data: UserForgotPasswordDto): Promise<any> {
        const {$api} = useNuxtApp()
        const response = await $api.post('/forgot-password', data)
        return response.data
    }

    static async resetPassword(data: UserResetPasswordDto): Promise<any> {
        const {$api} = useNuxtApp()
        const response = await $api.post('/reset-password', data)
        return response.data
    }
}
