import './style.css';
import { createApp } from 'vue';
import {createPinia} from 'pinia';
import PocketBase from 'pocketbase';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import router from './router.js';

import AppComposition from './AppComposition.vue';

const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);
console.log('pb.authStore.isValid:', pb.authStore.isValid);
createApp(AppComposition)
    .use(createPinia().use(piniaPluginPersistedState))
    .use(router)
    .mount('#app');
