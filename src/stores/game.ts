import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export interface Player {
    id: string,
    name: string,
    lastSeen: Date,
    points: number
};

export interface GameState {
    gameCode: string,
    isStarted: boolean,
    players: Player[],
};

export const useGameStore = defineStore('game', () => {

 const state = reactive({
      gameCode: '',
      isStarted: false,
      players: [] as Player[]
  } as GameState);

  const createGameCode = () => {
    state.gameCode = 'TEST';
  }

  const isJoinable = computed(() => {
    return false;
  })

  const start = () => {

  }

  return { state, createGameCode, isJoinable, start }

});