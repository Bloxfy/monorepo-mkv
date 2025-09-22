<template>
  <div>
    <h1 v-if="status === 'success'">Wallet {{ wallet }}</h1>
    <p v-else class="inline-flex items-center">
      <span class="loader mr-2">
        <LoaderCircle class="h-5 w-5 animate-spin" />
      </span>
      Loading...
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { LoaderCircle } from "lucide-vue-next";

const { $api } = useNuxtApp();
const route = useRoute();

const { data: wallet, status } = await useAsyncData(
  `wallets-${route.params.walletId}`,
  () =>
    $api.GET('/wallets/{walletId}', {
      params: {
        path: {
          walletId: route.params.walletId as string
        }
      }
    }),
  {
    watch: [() => route.params.walletId],
  }
);
</script>
