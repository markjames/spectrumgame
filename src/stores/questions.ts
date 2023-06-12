import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { firebaseGet, questionsRef } from '@/firebase'

export interface Question {
  left: string
  right: string
  leftColor: string
  rightColor: string
}

export interface QuestionsState {
  questions: Question[]
  isLoaded: boolean
}

export const useQuestionsStore = defineStore('questions', () => {
  const state = reactive({
    questions: [] as Question[],
    isLoaded: false
  } as QuestionsState)

  /*
  * Getter for list of questions
  */
  const questions = computed(():Question[] => {
    if( state.isLoaded ) {
        return state.questions;
    } else {
        return [] as Question[];
    }
  })

  /*
  * Getter for loaded state
  */
  const isLoaded = computed(():boolean => {
    return state.isLoaded;
  })

  /*
  * Load the full list of questions from the firebase questions collection
  */
  const load = async () => {
    try {
      const snapshot = await firebaseGet(questionsRef)
      if (snapshot.exists()) {
        console.log(snapshot.val())
        // Can't use a $patch mutation here because its a setup-style pinia store
        state.questions = snapshot.val();
        state.isLoaded = true;
      } else {
        console.log('No data available')
      }
    } catch (error) {
      throw new Error('Could not load list of questions')
    }
  }

  return { state, load, questions, isLoaded }
})
