<template>
    <div class="flex flex-col h-screen">
        <div class="flex justify-between items-center gap-2 p-6 md:p-10">
            <a href="#" class="flex items-center gap-2 font-medium">
                <div class="flex h-12 w-auto items-center justify-center rounded-md text-primary-foreground">
                    <img src="~/assets/images/logo.png" alt="Mockey Invest" class="h-full w-auto" />
                </div>
                Mockey Invest
            </a>
            <Switch :model-value="isDark" @update:model-value="toggleTheme" />
        </div>
        <div class="flex flex-grow items-center justify-center">
            <div class="w-full max-w-xs">
                <FormSignUp ref="signUpRef" @onSubmit="handleSubmit" :error-validate="errorValidate" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import FormSignUp from '~/components/Form/SignUp.vue'

const signUpRef = ref<InstanceType<typeof FormSignUp>>()
const isDark = ref(false)
const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
}
const errorValidate = ref({
    email: {
        message: ''
    }
})

const handleSubmit = (values: {
    email: string
    password: string
    name: string
    lastName: string
}) => {
    $fetch('http://localhost:3001/users/signup', {
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
}
</script>