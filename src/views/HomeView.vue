<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from "primevue/Button"
import InputMask from "primevue/InputMask"

import { useGameStore } from '@/stores/game';
import { ref } from 'vue';

const gameStore = useGameStore();
const router = useRouter();
const gameCode = ref('');

const onStartNewGame = () => {
  router.push({name:'lobby'});
}

const onEnterGameCode = () => {
  console.log(gameCode.value);
  gameStore.loadByGameCode( gameCode.value );
  router.push({name:'lobby'});
}

</script>


<template>
  <main>
    <div class="view view--join-game">
        <h2>Create</h2>
        <Button label="Start a new game" @click="onStartNewGame" />
    </div>

    <div class="view view--join-game">
        <h2>Join game</h2>

        <label for="input--join-code">Enter game code</label>
        <InputMask id="input--join-code" class="input input--join-code" mask="****" v-model="gameCode" placeholder="" />

        <Button label="Join a game" @click="onEnterGameCode" />
    </div>
  </main>
</template>
