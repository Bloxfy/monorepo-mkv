<template>
  <FormWallet :is-loading="isLoading" @on-submit="onSubmit" />
</template>
<script setup lang="ts">
import { FRONT_ROUTES } from '@/constants/front-routes'
import { getApiError } from '@/lib/utils'

const { $api } = useNuxtApp()
const isLoading = ref(false)

const onSubmit = async (values: { name: string }) => {
  isLoading.value = true

  try {
    const res = await $api.POST('/wallets', {
      body: values,
    })

    const error = getApiError(res)

    if (error) {
      console.error(error)
      return
    }
    if ('data' in res && res.data) {
      navigateTo(FRONT_ROUTES.WALLET.GET(res.data.id))
    }
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>