export const API_ROUTES = {
    USER: {
        ME: `/users/me`,
        LOGIN: `/users/login`,
        SIGNUP: `/users/signup`,
    },
    WALLET: {
        CREATE: `/wallets`,
        LIST: `/wallets`,
        GET: (id: string) => `/wallets/${id}`,
    },
}