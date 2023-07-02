<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';

onMounted(() => {
  document.querySelector('html')?.classList.add('dark');
});
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
