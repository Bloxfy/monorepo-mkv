<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'
import SearchForm from '@/components/SearchForm.vue'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,

  SidebarRail,
} from '@/components/ui/sidebar'

const props = defineProps<SidebarProps & {
  hasWalletdId: boolean
  data: {
    wallets: {
      id: string
      name: string
      url: string
    }[]
    navMain: {
      title: string
      url: string
      items: {
        title: string
        url: string
        isActive: boolean
      }[]
    }[]
  }
}>()
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <WalletSwitcher
        v-if="hasWalletdId"
        :wallets="data.wallets"
        :default-wallet="data.wallets[0] || null"
      />
      <SearchForm />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup v-for="item in data.navMain" :key="item.title">
        <SidebarGroupLabel>{{ item.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="childItem in item.items" :key="childItem.title">
              <SidebarMenuButton as-child :is-active="childItem.isActive">
                <NuxtLink :to="childItem.url">{{ childItem.title }}</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>