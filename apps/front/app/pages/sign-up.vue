<template>
  <div class="flex flex-col h-screen">
    <div class="flex justify-between items-center gap-2 p-6 md:p-10">
      <a href="#" class="flex items-center gap-2 font-medium">
        <div class="flex h-12 w-auto items-center justify-center rounded-md text-primary-foreground">
          <img src="~/assets/images/logo.png" alt="Mockey Invest" class="h-full w-auto" />
        </div>
        Mockey Invest
      </a>
      <ThemeSwitch />
    </div>
    <div class="flex flex-grow items-center justify-center">
      <div class="w-full max-w-xs">
        <FormSignUp ref="signUpRef" @onSubmit="handleSubmit" :is-loading="isLoading" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FormSignUp from '@/components/Form/SignUp.vue'
import { getApiError } from '@/lib/utils'
definePageMeta({
  layout: 'default-public'
})
const { $api } = useNuxtApp()
const signUpRef = ref<InstanceType<typeof FormSignUp>>()
const isLoading = ref(false)

const handleSubmit = async (values: {
  email: string
  password: string
  name: string
  lastName: string
}) => {
  isLoading.value = true

  try {
    const res = await $api.POST('/users/signup', {
      method: 'POST',
      body: {
        email: values.email,
        password: values.password,
        name: values.name,
        lastName: values.lastName
      }
    })

    const error = getApiError(res)

    if (error && error.statusCode === 409 && signUpRef.value) {
      signUpRef.value.setErrors({
        email: error.message
      })
      return
    }

    if ('data' in res && res.data?.accessToken) {
      useCookie('token').value = res.data.accessToken
      navigateTo('/dashboard')
    }
  } catch (error) {
    console.error(error)
  }
  finally {
    isLoading.value = false
  }
}
</script>