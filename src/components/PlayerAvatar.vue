<script setup lang="ts">
/*
* A component that displays a single avatar
*/

import { computed } from 'vue';

// TODO: Move to bundler
const avatarImages = [
  '/public/avatars/0.png',
  '/public/avatars/1.png',
  '/public/avatars/3.png',
  '/public/avatars/4.png',
  '/public/avatars/5.png',
  '/public/avatars/6.png',
  '/public/avatars/7.png',
  '/public/avatars/8.png',
  '/public/avatars/9.png',
  '/public/avatars/10.png'
];

const props = defineProps<{
  id: number
}>()

const avatarImage = computed(() => {
    return avatarImages[props.id] || avatarImages[0]
})

</script>

<template>
    <img class="avatar" :src="avatarImage" />
</template>

<style scoped>
  img {
    max-width: 24px;
  }
</style>