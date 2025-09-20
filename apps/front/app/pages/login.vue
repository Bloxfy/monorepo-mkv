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
                <Switch :model-value="isDark" @update:model-value="toggleTheme" />
            </div>
            <div class="flex flex-1 items-center justify-center">
                <div class="w-full max-w-xs">
                    <FormLogin ref="loginRef" @submit="handleSubmit" />
                </div>
            </div>
        </div>
        <div class="relative hidden bg-muted lg:block">
            <img src="" alt="Image"
                class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale">
        </div>
    </div>
</template>
<script setup lang="ts">
import FormLogin from '~/components/Form/Login.vue'

const isDark = ref(false)
const loginRef = ref<InstanceType<typeof FormLogin>>()
const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
}
const handleSubmit = (values: { email: string, password: string }) => {
    $fetch('http://localhost:3001/users/login', {
        method: 'POST',
        body: {
            username: values.email,
            password: values.password
        },
        credentials: 'include'
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
        if (loginRef.value && err.statusCode === 401) {
            loginRef.value.setErrors({
                email: err.data.message,
                password: err.data.message
            })
        }
    })
}
</script>