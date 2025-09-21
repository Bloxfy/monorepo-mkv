<template>
  <SidebarProvider>
    <AppSidebar v-if="status === 'success' && data" 
      :data="data"
      :hasWalletdId="hasWalletdId" />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger v-if="status === 'success'" class="-ml-1" />
        <LoaderCircle v-else class="w-7 h-7 animate-spin -ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
<script setup lang="ts">
import { LoaderCircle } from 'lucide-vue-next'
import { FRONT_ROUTES } from '~/constants/front-routes'

const { $api } = useNuxtApp()

const route = useRoute()

const hasWalletdId = route.params.walletId !== undefined && route.params.walletId !== null

const { data, status } = await useAsyncData(
  'wallets-sidebar',
  async () => {
    const walletId = route.params.walletId as string | undefined
    
    if (!walletId) return null
    
    return $api.GET('/wallets')
  },
  {
    server: false,
    transform: (responses) => {
      const wallets = []
      if (responses) {
        const { response, data } = responses
        if (response.status !== 200 || !data) return;
        
        if (data.items && data.items.length > 0) {
          for (const wallet of data.items) {
            const { id, name } = wallet
            wallets.push({
              id,
              name,
              url: `${FRONT_ROUTES.WALLET}/${wallet.id}`
            })
          }
        }
      }
      return {
        wallets,
        navMain: [{
          title: 'string',
          url: 'string',
          items: [{
            title: 'string',
            url: 'string',
            isActive: false,
          }]
        }]
      }
    }
  }
)
</script>