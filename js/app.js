import ConsoleComponent from './components/ConsoleComponent.js';
import JogosComponent from './components/JogosComponent.js';

const { createApp } = Vue;

createApp({
  components: {
    ConsoleComponent,
    JogosComponent
  }
}).mount('#app');