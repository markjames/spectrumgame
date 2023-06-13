import { createRouter, createMemoryHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RoundStage, useGameStore, type GameState } from '@/stores/game';
import { watch } from 'vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: () => import('../views/LobbyView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue')
    }
  ]
});

export default router
