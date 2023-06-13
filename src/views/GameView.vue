<template>
  <div class="view view--game">
    <h1>Game</h1>

    <p>Is loaded? {{ isLoaded }}</p>

    <div v-for="(question,idx) in questions" :key="idx">
      <QuestionCard :question="question"></QuestionCard>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import QuestionCard from '@/components/QuestionCard.vue';
import { useQuestionsStore } from '@/stores/questions';
import { storeToRefs } from 'pinia';

const questionStore = useQuestionsStore();
const { questions, isLoaded } = storeToRefs(questionStore);
</script>
  
<style scoped></style>