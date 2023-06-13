import { reactive, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import {
  firebaseGet,
  firebaseRef,
  firebaseDb,
  type NullableDatabaseReference,
  firebaseUpdate
} from '@/firebase'
//import { useQuestionsStore } from '@/stores/questions'
import { onValue, type DataSnapshot, type DatabaseReference } from 'firebase/database'

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
  players: Player[]
  roundStage: RoundStage
  roundNumber: number
}

export const useGameStore = defineStore('game', () => {
  //const questions = useQuestionsStore()

  const state: GameState = reactive({
    currentUserId: '12345678',
    id: '',
    isLobbyCreator: false,
    gameCode: '',
    roundStage: RoundStage.Start,
    roundNumber: 0,
    players: [] as Player[]
  })

  /**
   * The firebase game object reference (once it has been found and loaded)
   */
  const gameRef: Ref<NullableDatabaseReference> = ref(null)

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
      gameRef.value = firebaseRef(firebaseDb, 'games/' + gameId)
      state.id = gameId
      onValue(gameRef.value, onFirebaseGameStateUpdated)

      addSelfToGameAsPlayer()
    } catch (error) {
      console.error(error)
      throw new Error('Could not load game lobby')
    }
  }

  /**
   * When the Firebase object updates, syncronise the pinia store state to the best same
   */
  const onFirebaseGameStateUpdated = async (snapshot: DataSnapshot) => {
    Object.assign(state, snapshot.val())
  }

  /**
   *  Add yourself to the game
   */
  const addSelfToGameAsPlayer = async () => {
    if (gameRef.value === null) {
      throw new Error('Cannot join game (no game found)')
    }
    firebaseUpdate(gameRef.value as DatabaseReference, {
      [`players/${state.currentUserId}/name`]: 'Mark'
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
      firebaseUpdate(gameRef.value as DatabaseReference, {
        [`roundStage`]: RoundStage.QuestionBeingAsked
      })
    }
  }

  return { state, createNewGame, loadByGameCode, start }
})
