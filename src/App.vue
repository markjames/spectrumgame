<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Breadcrumb from "primevue/Breadcrumb"
import { ref } from 'vue';

const router = useRouter();

const gameProgressQuicklinks = ref([
  { label: 'Home', command: () => { router.push({ name: 'home' }) } },
  { label: 'Lobby', command: () => { router.push({ name: 'lobby' }) } },
  { label: 'Game', command: () => { router.push({ name: 'game' }) } }
]);
console.log(router);

</script>

<template>
  <header>
    <div class="wrapper">
      <Breadcrumb :model="gameProgressQuicklinks" />
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>