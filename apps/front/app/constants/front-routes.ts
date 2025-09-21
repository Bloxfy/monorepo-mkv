export const FRONT_ROUTES = {
    LOGIN: `/login`,
    SIGNUP: `/signup`,
    LOGOUT: `/logout`,
    FORGOT_PASSWORD: `/forgot-password`,
    DASHBOARD: `/dashboard`,
    WALLET: {
        LIST: `/wallets`,
        CREATE: `/wallets/create`,
        GET: (id: string) => `/wallets/${id}`,
        EDIT: (id: string) => `/wallets/${id}/edit`,
        DELETE: (id: string) => `/wallets/${id}/delete`,
    },
}