<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

// PrimeVue components
import Breadcrumb from "primevue/Breadcrumb"
import Toast from 'primevue/toast';

import { onMounted, ref } from 'vue';
import { useQuestionsStore } from './stores/questions';

const router = useRouter();

const gameProgressQuicklinks = ref([
  { label: 'Home', command: () => { router.push({ name: 'home' }) } },
  { label: 'Lobby', command: () => { router.push({ name: 'lobby' }) } },
  { label: 'Game', command: () => { router.push({ name: 'game' }) } }
]);

const questionsStore = useQuestionsStore();
onMounted( () => {
  questionsStore.load();
});

</script>

<template>
  <header>
    <div class="wrapper">
      <Breadcrumb :model="gameProgressQuicklinks" />
      <Toast position="bottom-center" />
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>