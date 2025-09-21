import createClient from "openapi-fetch";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const api = createClient({
      baseUrl: config.public.apiBase,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useCookie('token').value}`,
      },
    })
  
    return {
      provide: {
        api,
      },
    }
  })
  