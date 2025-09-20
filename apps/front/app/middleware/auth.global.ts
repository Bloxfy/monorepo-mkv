export default defineNuxtRouteMiddleware((to, from) => {
    const allowedRoutes = ['/login', '/sign-up', '/forgot-password']
    
    const token = useCookie('token')
    const isAuthenticated = !!token.value
    const isAllowedRoute = allowedRoutes.includes(to.path)

    if(isAuthenticated && isAllowedRoute) {
        return navigateTo('/dashboard')
    }

    if(!isAuthenticated && !isAllowedRoute) {
        return navigateTo('/login')
    }

  })
  