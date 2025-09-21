<template>
    <form :class="cn('flex flex-col gap-6')" @submit.prevent="onSubmit">
        <div class="flex flex-col items-center gap-2 text-center">
            <h1 class="text-2xl font-bold">
                Create a wallet
            </h1>
            <p class="text-balance text-sm text-muted-foreground">
                Enter your details below to create a wallet
            </p>
        </div>
        <div class="grid gap-6">
            <FormField v-slot="{ componentField }" name="name" :validate-on-blur="!isFieldDirty">
                <FormItem>
                    <FormLabel for="name">Name</FormLabel>
                    <FormControl>
                        <Input :disabled="isLoading" id="name" type="text" placeholder="My Wallet"
                            v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button type="submit" variant="default" class="w-full cursor-pointer" :disabled="isLoading">
                <template v-if="isLoading">
                    <LoaderCircle class="w-4 h-4 animate-spin" />
                </template>
                <template v-else>
                    Create Wallet
                </template>
            </Button>
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
    name: z.string().min(3),
})

const formTypedSchema = toTypedSchema(formSchema)

const { handleSubmit, isFieldDirty } = useForm({
    validationSchema: formTypedSchema,
})

const emit = defineEmits<{
    (e: 'onSubmit', values: {
        name: string
    }): void
}>()

const onSubmit = handleSubmit((values) => emit('onSubmit', values))
</script>