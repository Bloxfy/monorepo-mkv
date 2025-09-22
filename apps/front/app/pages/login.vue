<template>
  <div class="grid min-h-svh lg:grid-cols-2">
    <div class="flex flex-col gap-4 p-6 md:p-10">
      <div class="flex justify-between items-center gap-2">
        <a href="#" class="flex items-center gap-2 font-medium">
          <div class="flex h-12 w-auto items-center justify-center rounded-md text-primary-foreground">
            <img src="~/assets/images/logo.png" alt="Mockey Invest" class="h-full w-auto" />
          </div>
          Mockey Invest
        </a>
        <ThemeSwitch />
      </div>
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-xs">
          <FormLogin ref="loginRef" @submit="handleSubmit" :is-loading="isLoading" />
        </div>
      </div>
    </div>
    <div class="relative hidden bg-muted lg:block">
      <img src="" alt="Image" class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
    </div>
  </div>
</template>
<script setup lang="ts">
import FormLogin from '~/components/Form/Login.vue'
import { getApiError } from '~/lib/utils'

definePageMeta({
  layout: 'default-public'
})

const { $api } = useNuxtApp()
const loginRef = ref<InstanceType<typeof FormLogin>>()
const isLoading = ref(false)

const handleSubmit = async (values: { email: string; password: string }) => {
  isLoading.value = true

  try {
    const res = await $api.POST('/users/login', {
      method: 'POST',
      body: {
        username: values.email,
        password: values.password,
      },
      credentials: 'include',
    })

    const error = getApiError(res)

    if (error && error.statusCode === 401 && loginRef.value) {
      loginRef.value.setErrors({
        email: error.message,
        password: error.message,
      })
      return
    }

    // se não houve erro, é sucesso
    if ('data' in res && res.data?.accessToken) {
      useCookie('token').value = res.data.accessToken
      navigateTo('/dashboard')
    }
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>