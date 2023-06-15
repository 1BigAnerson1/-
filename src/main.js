import './style.css';
import { createApp } from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';

import router from './router.js';

import AppComposition from './App.vue';
import PROVIDE from '@/constants/provides.js';
import {DefaultApolloClient} from '@vue/apollo-composable';
import apolloClient from '@/apollo.js';

const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);
console.log('pb.authStore.isValid:', pb.authStore.isValid);

let db = new PouchDB(`${import.meta.env.VITE_SERVER_DB_PATH}/books`);

createApp(AppComposition)
    .use(createPinia().use(piniaPluginPersistedState))
    .provide(PROVIDE.PB, pb)
    .provide(PROVIDE.DB, db)
    .provide(DefaultApolloClient, apolloClient)
    .use(router)
    .mount('#app');
