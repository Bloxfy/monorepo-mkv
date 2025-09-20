<template>
    <form :class="cn('flex flex-col gap-6')" @submit.prevent="onSubmit">
        <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-2xl font-bold">
                Forgot your password?
            </h1>
            <p class="text-balance text-sm text-muted-foreground">
                Enter your email below to send a link to reset your password
            </p>
        </div>
        <div class="grid gap-6">
            <FormField v-slot="{ componentField }" name="email" :validate-on-blur="!isFieldDirty">
                <FormItem class="grid gap-2">
                    <FormLabel for="email">Email</FormLabel>
                    <FormControl>
                        <Input :disabled="isLoading" id="email" type="email" placeholder="m@example.com"
                            v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit" class="w-full" :disabled="isLoading">
                <template v-if="isLoading">
                    <LoaderCircle class="w-4 h-4 animate-spin" />
                </template>
                <template v-else>
                    Send
                </template>
            </Button>
        </div>
        <div class="text-center text-sm">
            Don't have an account?
            <NuxtLink to="/sign-up" class="underline underline-offset-4">
                Sign up
            </NuxtLink>
        </div>
    </form>
</template>
<script setup lang="ts">
import { cn } from '~/lib/utils'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { LoaderCircle } from 'lucide-vue-next'

defineProps<{
    isLoading: boolean
}>()

const formSchema = z.object({
    email: z.email(),
})

const formTypedSchema = toTypedSchema(formSchema)

const { handleSubmit, isFieldDirty, setErrors } = useForm({
    validationSchema: formTypedSchema,
})

const emit = defineEmits<{
    (e: 'submit', values: {
        email: string
    }): void
}>()

defineExpose({ setErrors })

const onSubmit = handleSubmit((values) => emit('submit', values))

</script>