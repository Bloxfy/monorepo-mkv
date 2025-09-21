<script setup lang="ts">
import { Check, ChevronsUpDown, Plus, Wallet } from "lucide-vue-next"

import { ref } from "vue"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { FRONT_ROUTES } from '~/constants/front-routes'

interface Wallet {
  id: string;
  name: string;
  url: string;
}

const props = defineProps<{
  wallets: Wallet[];
  defaultWallet: Wallet | null;
}>()

const selectedWallet = ref<Wallet | null>(props.defaultWallet)
const route = useRoute()
const router = useRouter()

if(selectedWallet.value === null && props.wallets.length > 0 && props.wallets[0]) {
  selectedWallet.value = props.wallets[0]
}

const handleSelectedWallet = (wallet: Wallet) => {
  if(route.params.walletId) {
    router.push({
      name: route.name,
      params: { ...route.params, walletId: wallet.id } 
    })
  }
  selectedWallet.value = wallet;
}

</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
            <div
              class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Wallet class="size-4" />
            </div>
            <div class="flex flex-col gap-0.5 leading-none">
              <template v-if="!selectedWallet">
                <span class="font-medium">No Wallet</span>
                <span class="text-xs text-muted-foreground">Please create one</span>
              </template>
              <template v-else>
                <span class="font-medium">Wallet</span>
                <span>{{ selectedWallet.name }}</span>
              </template>
            </div>
            <ChevronsUpDown class="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-(--reka-dropdown-menu-trigger-width)" align="start">
          <DropdownMenuItem v-for="wallet in wallets" :key="wallet.id" @select="handleSelectedWallet(wallet)">
            {{ wallet.name }}
            <Check v-if="wallet === selectedWallet" class="ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem class="group cursor-pointer">
            <NuxtLink :to="FRONT_ROUTES.WALLET.CREATE"
              class="w-full inline-flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground">
              <Plus class="size-4 group-hover:text-foreground" />
              New Wallet
            </NuxtLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
