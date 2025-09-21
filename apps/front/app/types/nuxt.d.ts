import type { Client } from 'openapi-fetch';
import type { paths } from '@/types/api';

declare module '#app' {
  interface NuxtApp {
    $api: Client<paths, `${string}/${string}`>;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: Client<paths, `${string}/${string}`>;
  }
}