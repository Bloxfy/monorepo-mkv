<template>
    <form :class="cn('flex flex-col gap-6')" @submit.prevent="onSubmit">
        <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-2xl font-bold">
                Sign up to your account
            </h1>
            <p class="text-balance text-sm text-muted-foreground">
                Enter your details below to sign up to your account
            </p>
        </div>
        <div class="grid gap-6">
            <div class="grid grid-cols-2 gap-2">
                <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
                    <FormItem class="grid gap-2">
                        <FormLabel for="name">Name</FormLabel>
                        <FormControl>
                            <Input :disabled="isLoading" id="name" type="text" placeholder="John Doe"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="lastName" :validate-on-blur="!isFieldDirty">
                    <FormItem class="grid gap-2">
                        <FormLabel for="lastName">Last Name</FormLabel>
                        <FormControl>
                            <Input :disabled="isLoading" id="lastName" type="text" placeholder="John Doe"
                                v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
            </div>
            <FormField class="grid gap-2" v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
                <FormItem class="grid gap-2">
                    <FormLabel for="email">Email</FormLabel>
                    <FormControl>
                        <Input :disabled="isLoading" id="email" type="email" placeholder="m@example.com"
                            v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField class="grid gap-2" v-slot="{ componentField }" name="password" :validate-on-blur="!isFieldDirty">
                <FormItem class="grid gap-2">
                    <FormLabel for="password">Password</FormLabel>
                    <FormControl>
                        <Input :disabled="isLoading" id="password" type="password" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit" class="w-full" :disabled="isLoading">
                <template v-if="isLoading">
                    <LoaderCircle class="w-4 h-4 animate-spin" />
                </template>
                <template v-else>
                    Sign Up
                </template>
            </Button>
        </div>
        <div class="text-center text-sm">
            Already have an account?
            <NuxtLink to="/login" class="underline underline-offset-4">
                Login
            </NuxtLink>
        </div>
    </form>
</template>
<script setup lang="ts">
import { cn } from '~/lib/utils'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { LoaderCircle } from 'lucide-vue-next'

defineProps<{
    isLoading: boolean
}>()

const formSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
    name: z.string().min(3),
    lastName: z.string().min(3)
})

const formTypedSchema = toTypedSchema(formSchema)

const { handleSubmit, isFieldDirty, setErrors } = useForm({
    validationSchema: formTypedSchema,
})

const emit = defineEmits<{
    (e: 'onSubmit', values: {
        email: string
        password: string
        name: string
        lastName: string
    }): void
}>()
defineExpose({ setErrors })

const onSubmit = handleSubmit((values) => emit('onSubmit', values))
</script>