import { createApp } from 'vue';
import './assets/styles/fonts.css';
import './main.css';
import App from './App.vue';
import router from './routes';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const app = createApp(App);
app.use(router);

const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: sessionStorage,
    key: id => `__persisted__${id}`,
  }),
);

app.use(pinia);

app.mount('#app');
