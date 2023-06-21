<script setup lang="ts">
import { useRouter } from 'vue-router'

import AvatarSelect from '@/components/AvatarSelect.vue';

// PrimeVue Components
import Button from "primevue/Button"
import InputText from "primevue/InputText"
import { useToast } from 'primevue/usetoast';

import { useGameStore } from '@/stores/game';

import { computed, onMounted, ref, watch } from 'vue';

const router = useRouter();
const toast = useToast();
const game = useGameStore();

// User name
const name = ref('');

// TODO: Move to bundler
const avatarImages = [
  '/public/avatars/0.png',
  '/public/avatars/1.png',
  '/public/avatars/3.png',
  '/public/avatars/4.png',
  '/public/avatars/5.png',
  '/public/avatars/6.png',
  '/public/avatars/7.png',
  '/public/avatars/8.png',
  '/public/avatars/9.png',
  '/public/avatars/10.png'
];

// Avatar ID
const avatarId = ref(Math.floor(Math.random()*avatarImages.length));

// 4-digit game code
const gameCode = ref('');

const onStartNewGame = () => {

  // Quick validation on name
  if( !game.localUser.name || game.localUser.name.length > 20 ) {
    toast.add({ severity: 'info', summary: 'Enter your name before you join!' });
    return;
  }

  router.push({name:'lobby'});
}

onMounted(() => {
  name.value = game.localUser.name;
  avatarId.value = game.localUser.avatar;
})

const onEnterGameCode = async () => {

  // Quick validation on name
  if( !game.localUser.name || game.localUser.name.length > 20 ) {
    toast.add({ severity: 'info', summary: 'Enter your name before you join!' });
    return;
  }

  try {
    await game.joinGame(gameCode.value);
    router.push({name:'lobby'});
    toast.removeAllGroups();
  } catch( error ) {
    toast.add({ severity: 'info', summary: 'Could not join game', detail: error });
  }
}

const isGameCodeValidFormat = computed(() => {
  return gameCode.value.length == 4;
});

watch( name, () => {
  console.log('[HomeView] Name changed', name.value );
  game.localUser.name = name.value;
});

watch( avatarId, () => {
  console.log('[HomeView] Avatar ID changed', avatarId.value );
  game.localUser.avatar = avatarId.value;
});

</script>


<template>
  <main>

    <!-- Player customises their appearance -->
    <div class="view view--customise-player">
      <label for="input--name">Name</label>
      <InputText id="input--name" class="input input--name" v-model="name" placeholder="Your name" maxlength="10" />

      <label>Avatar</label>
      <AvatarSelect v-model="avatarId" :images="avatarImages" />
      
    </div>

    <!-- Start a new game lobby -->
    <div class="view view--join-game">
        <h2>Create</h2>
        <Button label="Start a new game" @click="onStartNewGame" />
    </div>

    <!-- Join an existing game (in-progress or in-lobby) -->
    <div class="view view--join-game">
        <h2>Join game</h2>

        <label for="input--join-code">Enter game code</label>
        <InputText id="input--join-code" class="input input--join-code" v-model="gameCode" placeholder="ABCD" maxlength="4" />

        <Button label="Join a game" @click="onEnterGameCode" :disabled="!isGameCodeValidFormat" />
    </div>
  </main>
</template>
