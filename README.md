# Spectrum

A multiplayer web version of the social game "Wavelength".

* Players join a lobby
* One player is secretly shown a slider with a randomised position (from 0 to 100) and a card representing the two extremes (e.g. "Cold ↔ Hot")
* That player then picks a single word that they think best represents the slider's position (e.g. if the position was 10%, the player might enter the word "Ice")
* The other players then try to guess where on the slider that word represents
* The closer they get to the correct position, the more points they score.
* Play then passes to the next player.

## Tech Stack

* Vue.js 3 + Typescript
* Pinia (Store) w/ Composition API
* Firebase Realtime Database (Database) w/ Security Rules
* Primevue (Component Library)
* Vite (Bundler)
* Vitest/Playwright (Test)
