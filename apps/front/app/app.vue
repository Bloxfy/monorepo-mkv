<template>
  <div>
    <h1>Hello World</h1>
    <p>{{ data?.message }}</p>
  </div>
</template>
<script setup lang="ts">
const { data } = await useFetch<{ message: string }>('http://localhost:3001');
</script>
