<script setup>
import HelloWorld from './components/HelloWorld.vue'

console.log("[App.vue] 👋  Benvenuto dal frontend Wabu Platform");

// Importa le funzioni reattive di Vue
import { ref, onMounted } from 'vue'
// Crea una variabile reattiva per mostrare il messaggio ricevuto dal backend
const backendMessage = ref('Caricamento...')
// Crea una variabile reattiva per il test di MongoDB
// Questa variabile verrà aggiornata quando si testerà la rotta Mongo
// e mostrerà il risultato del test
const mongoTestMessage = ref('')

// Quando il componente viene montato, esegue la chiamata al backend
onMounted(async () => {
  try {
    // Effettua una richiesta HTTP GET al backend
    // Se il frontend gira in Docker Compose, 'backend' è il nome del servizio
    // Se accedi da browser locale, usa 'http://localhost:3000/'
    console.log("[App.vue] Chiamata al backend in corso...");
    //const res = await fetch('http://backend:3000/')
    //const res = await fetch('http://localhost:3000/')
    const res = await fetch('/api/') //Con questa riga, il proxy di Vite inoltra la richiesta al backend
    // Se il backend è esposto su un URL specifico, ad esempio su GitHub
    //const res = await fetch('https://humble-space-broccoli-r559xppgpgwh5p55-5173.app.github.dev:3000/') 
    // Legge la risposta come testo e la assegna alla variabile reattiva
    backendMessage.value = await res.text()
    console.log("[App.vue] Risposta dal backend:", backendMessage.value);
  } catch (e) {
    // In caso di errore, mostra un messaggio di errore
    backendMessage.value = '[App.vue] Errore di comunicazione col backend'
    console.error("[App.vue] Errore durante la chiamata al backend:\n", e);
  }
})

// Funzione per testare la rotta Mongo
async function testMongo() {
  mongoTestMessage.value = 'Test in corso...'
  try {
    const res = await fetch('/api/test-mongo')
    mongoTestMessage.value = await res.text()
    console.log("[App.vue] Risposta da /test-mongo:", mongoTestMessage.value)
  } catch (e) {
    mongoTestMessage.value = '[App.vue] Errore nella chiamata a /test-mongo'
    console.error("[App.vue] Errore durante la chiamata a /test-mongo:\n", e)
  }
}

</script>

<template>
  <div class="centered">
    
    <!--  Aggiunto -->
    <h1>👋 Benvenuto su Wabu Platform (Frontend)</h1>
    <p>Risposta dal backend: [{{ backendMessage }}]</p>
    <button @click="testMongo">Test MongoDB</button>
    <p v-if="mongoTestMessage">{{ mongoTestMessage }}</p>
    
    <!-- Default -->
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
