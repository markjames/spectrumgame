<script setup lang="ts">
import QuestionCard from '@/components/QuestionCard.vue';
import PlayerAvatar from '@/components/PlayerAvatar.vue';
import { useGameStore } from '@/stores/game';

const game = useGameStore();

</script>

<template>
  <div class="view view--game">
    <h1>Game</h1>

    <div v-for="question in game.questions" :key="question">
      <QuestionCard :question="question"></QuestionCard>
    </div>


    <h3>Players</h3>
    <ul v-for="(player, playerIndex) in game.state.players.values()" v-bind:key="playerIndex">
      <li><PlayerAvatar :id="player.avatar"></PlayerAvatar> {{ player.name }} ({{ player.id }})</li>
    </ul>

  </div>
</template>

<style scoped>
  img {
    max-width: 24px;
  }
</style>