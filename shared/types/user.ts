
export interface User {
    id: number | null;
    name: string
    email: string
}

export interface UserLoginDto {
    email: string;
    password: string;
}

export interface UserSignUpDto extends UserLoginDto {
    name: string;
}

export interface UserForgotPasswordDto extends Omit<UserLoginDto, "password"> {}

export interface UserResetPasswordDto {
    code: string
    email: string
    newPassword: string
}