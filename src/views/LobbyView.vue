<template>
    <main class="view view--lobby">
        <h2>Game Lobby</h2>

        <h3>Game Code</h3>
        <samp>{{game.state.gameCode}}</samp>

        <h3>Players</h3>
        <ul>
            <li>Player One</li>
            <li>Player Two</li>
            <li>Player Three</li>
        </ul>
    </main>
</template>

<script setup lang="ts">
    import { useGameStore } from '@/stores/game'
    const game = useGameStore();
    console.log(game.state.gameCode);
</script>

<style></style>
