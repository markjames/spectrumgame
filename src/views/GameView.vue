<script setup lang="ts">
import QuestionCard from '@/components/QuestionCard.vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
console.log(gameStore.questions);

</script>

<template>
  <div class="view view--game">
    <h1>Game</h1>

    <div v-for="question in gameStore.questions" :key="question">
      <QuestionCard :question="question"></QuestionCard>
    </div>

  </div>
</template>

<style scoped></style>