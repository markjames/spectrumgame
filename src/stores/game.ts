import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { firebaseGet, firebaseRef, firebaseDb } from '@/firebase'
//import type { NullableDatabaseReference } from '@/firebase'

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

  //let gameRef:NullableDatabaseReference = null;

  const state = reactive({
      gameCode: '',
      isStarted: false,
      players: [] as Player[]
  } as GameState);

  /*
  * Load a game lobby based on provided game ID
  */
  const loadByGameCode = async (gameCode:string) => {
    try {

      // Find game by gamecode
      // We do this by iterating through all active game lobbies
      // Can be moved into Firestore instead or RealtimeDB for performance
      // when needed (getting a full lobby list is not ideal when we could query)
      // but would need a bunch of clud functions to sync
      const gameListSnapshot = await firebaseGet(firebaseRef(firebaseDb, 'games'));
      if( !gameListSnapshot.exists() ) {
        throw new Error('Could not load list of lobbies');
      }
      const gameList = gameListSnapshot.val();

      // Iterate to find gamecode
      let gameId:string = "";
      for( const gameIndex in gameList ) {
        if( gameList[gameIndex].gameCode == gameCode ) {
          gameId = gameIndex;
          break;
        }
      }
      if( gameId === "" ) {
        throw new Error('Could not find game for that game code');
      }

      // We have the game ID now
      const snapshot = await firebaseGet(firebaseRef(firebaseDb, 'games/0'));
      if( snapshot.exists() ) {
        const value = snapshot.val();
        console.log( value );
      }
      
    } catch (error) {
      console.error(error);
      throw new Error('Could not load game lobby')
    }
  }

  const createGameCode = () => {
    state.gameCode = 'TEST';
  }

  const isJoinable = computed(() => {
    return false;
  })

  const start = () => {

  }

  return { state, createGameCode, loadByGameCode, isJoinable, start }

});