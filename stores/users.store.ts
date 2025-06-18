import {defineStore} from "pinia";
import {UserApi} from "~/api/repositories/user.api";
import {parseApiError} from "~/shared/utils/parse-error";
import type {User, UserForgotPasswordDto, UserLoginDto, UserResetPasswordDto, UserSignUpDto} from "~/shared/types/user";

export const useUsersStore = defineStore("users", () => {
    const errorMessage = ref("")
    const router = useRouter();
    const forgotPasswordData = ref({})
    const user = ref<User>({
        id: null,
        name: "",
        email: ""
    })


    function validateLogin(data: UserLoginDto | UserSignUpDto): boolean {
        if (!data.email || !data.password || ('name' in data && !data.name)) {
            errorMessage.value = 'Заполните все поля'
            return false
        }
        if (data.password.length < 6) {
            errorMessage.value = 'Пароль должен быть не менее 6 символов'
            return false
        }
        errorMessage.value = ''
        return true
    }

    const getUser = async () => {
        try {
            user.value = (await UserApi.getUser())?.data
        } catch (error) {
            errorMessage.value = parseApiError(error)
        }
    }

    const handleLogin = async (user: UserLoginDto) => {
        if (!validateLogin(user)) return

        try {
            const res = await UserApi.login(user)
            localStorage.setItem("token", res.data)
            errorMessage.value = ""
            await router.push('/profile')
        } catch (error) {
            errorMessage.value = parseApiError(error)
        }
    }
    const handleSignUp = async (user: UserSignUpDto) => {
        if (!validateLogin(user)) return
        try {
            const res = await UserApi.signUp(user)
            localStorage.setItem("token", res?.data)
            errorMessage.value = ""
            await router.push('/profile')
        } catch (error) {
            errorMessage.value = parseApiError(error)
        }
    }
    const handleForgotPassword = async (user: UserForgotPasswordDto) => {
        try {
            const res = await UserApi.forgotPassword(user);
            errorMessage.value = ""
            if (res?.data?.code) {
                await router.push('/reset-password')
            }
        } catch (error) {
            errorMessage.value = parseApiError(error)
        }
    }

    const handleResetPassword = async (user: UserResetPasswordDto) => {
        try {
            const res = await UserApi.resetPassword(user)
            errorMessage.value = ""
            if (res.status_code === 200) {
                await router.push('/')
            }
        } catch (error) {
            errorMessage.value = parseApiError(error)
        }
    }

    return {
        errorMessage,
        user,
        actions: {
            handleLogin,
            handleSignUp,
            handleForgotPassword,
            getUser,
            handleResetPassword
        }
    }
})