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
                <FormSignUp ref="signUpRef" @onSubmit="handleSubmit" :error-validate="errorValidate"
                    :is-loading="isLoading" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import FormSignUp from '~/components/Form/SignUp.vue'

const signUpRef = ref<InstanceType<typeof FormSignUp>>()
const isLoading = ref(false)

const errorValidate = ref({
    email: {
        message: ''
    }
})

const handleSubmit = async (values: {
    email: string
    password: string
    name: string
    lastName: string
}) => {
    isLoading.value = true
    await $fetch('http://localhost:3001/users/signup', {
        method: 'POST',
        body: {
            email: values.email,
            password: values.password,
            name: values.name,
            lastName: values.lastName
        }
    }).then((res) => {
        console.log(res)
    }).catch(async (err) => {
        if (err.status === 409) {
            console.log('error')
            signUpRef.value?.setErrors({ email: 'Email already exists' })
        }
    })
    isLoading.value = false
}
</script>