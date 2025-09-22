<template>
  <Accordion
    type="single"
    class="w-full"
    collapsible
  >
    <AccordionItem
      v-for="item in accordionItems"
      :key="item.id"
      :value="item.id"
    >
      <AccordionTrigger>{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
<script setup lang="ts">
import { API_ROUTES } from "~/constants/api-routes";

const { $api } = useNuxtApp();
const { data:accordionItems } = await useAsyncData(API_ROUTES.WALLET.LIST, () =>
  $api.GET('/wallets'),
  {
    transform: (res) => {
      if (!('data' in res) || !res.data) {
        return []
      }
      return res.data.items.map((wallet) => (
        {
          id: wallet.id,
          title: wallet.name,
          content: {
            id: wallet.id,
            name: wallet.name,
            createdAt: wallet.createdAt,
            updatedAt: wallet.updatedAt,
          },
        })) || []}
}
);
console.log(accordionItems)

</script>
