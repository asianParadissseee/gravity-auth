import type { AxiosError } from 'axios'

const fieldMap: Record<string, string> = {
    email: 'Email',
    password: 'Пароль',
    auth: 'Ошибка авторизации'
}

const humanizeFieldName = (key: string): string => {
    return fieldMap[key] || key
}

export const parseApiError = (error: unknown): string => {
    if (error && typeof error === 'object' && 'isAxiosError' in error) {
        const err = error as AxiosError<any>
        const data = err.response?.data

        if (data?.errors && typeof data.errors === 'object') {
            const messages: string[] = []

            for (const [field, value] of Object.entries(data.errors)) {
                if (Array.isArray(value)) {
                    const unique = [...new Set(value)]
                    unique.forEach((msg) => {
                        messages.push(`${humanizeFieldName(field)}: ${msg}`)
                    })
                } else if (typeof value === 'string') {
                    messages.push(`${humanizeFieldName(field)}: ${value}`)
                }
            }

            return messages.join('\n')
        }

        if (data?.message) return data.message

        return err.message
    }

    if (error instanceof Error) {
        return error.message
    }

    return 'Неизвестная ошибка'
}
