<script setup lang="ts">
import { useRouter } from 'vue-router'

// PrimeVue Components
import Button from "primevue/Button"
import InputMask from "primevue/InputMask"
import { useToast } from 'primevue/usetoast';

import { useGameStore } from '@/stores/game';
import { ref } from 'vue';

const router = useRouter();
const toast = useToast();
const gameStore = useGameStore();
const gameCode = ref('');

const onStartNewGame = () => {
  router.push({name:'lobby'});
}

const onEnterGameCode = async () => {
  try {
    await gameStore.loadByGameCode( gameCode.value );
    router.push({name:'lobby'});
    toast.removeAllGroups();
  } catch( error ) {
    toast.add({ severity: 'info', summary: 'Could not join game', detail: error });
  }
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
