<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from "primevue/Button"
import PlayerAvatar from '@/components/PlayerAvatar.vue';

import { useGameStore, RoundStage } from '@/stores/game';
import { watch } from 'vue';
import type { GameState } from '@/stores/game';

const game = useGameStore();
const router = useRouter();

const startGame = () => {
    game.start();
};

// If the game updates to 'playable' game state, then move to game
watch(game.state, async (newState:GameState) => {
    if (newState.roundStage == RoundStage.QuestionBeingAsked ) {
        router.push({ name: 'game' });
    }
});

</script>

<template>
    <main class="view view--lobby">
        <h2>Game Lobby</h2>

        <h3>Game Code</h3>
        <samp>{{ game.state.gameCode }}</samp>

        <h3>Players</h3>
        <ul v-for="(player,playerIndex) in game.state.players.values()" v-bind:key="playerIndex">
            <li><PlayerAvatar :id="player.avatar"></PlayerAvatar> {{ player.name }} ({{ player.id }})</li>
        </ul>

        <Button label="Start Game" @click="startGame"></Button>
    </main>
</template>

<style></style>
