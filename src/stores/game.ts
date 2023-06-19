import { reactive } from 'vue'
import { defineStore } from 'pinia'
import {
  firebaseGet,
  firebaseRef,
  firebaseDb,
  type NullableDatabaseReference,
  firebaseUpdate
} from '@/firebase'
import { useQuestionsStore } from '@/stores/questions'
import { onValue, type DataSnapshot, type DatabaseReference } from 'firebase/database'
import { useStorage } from '@vueuse/core'
import { v4 as uuidv4 } from 'uuid'

export const enum RoundStage {
  Start,
  Lobby,
  QuestionBeingAsked,
  GuessersMakeGuess,
  Reveal
}

export interface Player {
  id: string
  name: string
  lastSeen: Date
  points: number
  avatar: number
}

export interface GameState {
  currentUserId: string
  id: string
  gameCode: string
  isLobbyCreator: boolean
  players: Map<string, Player>
  roundStage: RoundStage
  roundNumber: number
}

export const useGameStore = defineStore('game', () => {
  // Persist user information locally (for if they rejoin)
  const localStorage = useStorage('spectrum', { userId: uuidv4(), name: '', avatar: 0 })

  // Main game state
  const state: GameState = reactive({
    currentUserId: localStorage.value.userId,
    id: '',
    isLobbyCreator: false,
    gameCode: '',
    roundStage: RoundStage.Start,
    roundNumber: 0,
    players: new Map()
  })

  const questionsStore = useQuestionsStore();

  const questions = async () => {
    return questionsStore.questions;
  }

  /**
   * The firebase game object reference (once it has been found and loaded)
   */
  let gameRef:NullableDatabaseReference = null;

  /*
   * Load a game lobby based on provided game ID
   */
  const loadByGameCode = async (gameCode: string) => {
    try {
      // Find game by gamecode
      // We do this by iterating through all active game lobbies
      // Can be moved into Firestore instead or RealtimeDB for performance
      // when needed (getting a full lobby list is not ideal when we could query)
      // but would need a bunch of clud functions to sync
      const gameListSnapshot = await firebaseGet(firebaseRef(firebaseDb, 'games'))
      if (!gameListSnapshot.exists()) {
        throw new Error('Could not load list of lobbies')
      }
      const gameList = gameListSnapshot.val()

      // Iterate to find gamecode
      let gameId: string = ''
      for (const gameIndex in gameList) {
        if (gameList[gameIndex].gameCode == gameCode) {
          gameId = gameIndex
          break
        }
      }
      if (gameId === '') {
        throw new Error('Could not find game for that game code')
      }

      // Store a ref to the firebase object and watch it for updates
      // We can look to abstract this to a use function
      //gameRef.value = firebaseRef(firebaseDb, 'games/' + gameId)
      gameRef = firebaseRef(firebaseDb, 'games/' + gameId);
      state.id = gameId;
      onValue(gameRef, onFirebaseGameStateUpdated)

      addSelfToGameAsPlayer()
    } catch (error) {
      throw new Error('Could not load game lobby')
    }
  }

  /**
   * When the Firebase object updates, syncronise the pinia store state to the best same
   */
  const onFirebaseGameStateUpdated = async (snapshot: DataSnapshot) => {

    // TODO: Do a diff for changes

    const snapshotValue = snapshot.val();
    state.id = snapshotValue.id;
    state.gameCode = snapshotValue.gameCode;
    state.roundStage = snapshotValue.roundStage;
    state.roundNumber = snapshotValue.roundNumber;

    const playerSnapshot:Array<Record<string,string>> = Object.values(snapshotValue.players);

    for( const playerData of playerSnapshot ) {
      const player:Player = {
        id: playerData.id,
        name: playerData.name,
        avatar: parseInt(playerData.avatar),
        lastSeen: new Date(playerData.lastSeen),
        points: parseInt(playerData.points)
      }
      state.players.set( player.id, player );
    }


  }

  /**
   *  Add yourself to the game
   */
  const addSelfToGameAsPlayer = async () => {
    if (gameRef === null) {
      //throw new Error('Cannot join game (no game found)')
    }
    firebaseUpdate(gameRef as DatabaseReference, {
      [`players/${state.currentUserId}/id`]: state.currentUserId,
      [`players/${state.currentUserId}/name`]: 'Mark',
      [`players/${state.currentUserId}/lastSeen`]: new Date().toUTCString(),
      [`players/${state.currentUserId}/points`]: 0,
      [`players/${state.currentUserId}/avatar`]: 0
    })
  }

  /*
   * Create a new game
   */
  const createNewGame = () => {
    state.gameCode = 'TEST'
    state.isLobbyCreator = true
  }

  /**
   * Start the game
   * Requires Lobby state, and at least 2 players
   */
  const start = () => {
    if (state.roundStage == RoundStage.Lobby) {
      firebaseUpdate(gameRef as DatabaseReference, {
        [`roundStage`]: RoundStage.QuestionBeingAsked
      })
    }
  }

  return { state, questions, createNewGame, loadByGameCode, start }
})
