import './style.css';
import { createApp } from 'vue';
import {createPinia} from 'pinia';
import router from './router.js';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import AppComposition from './AppComposition.vue';

createApp(AppComposition)
    .use(createPinia().use(piniaPluginPersistedState))
    .use(router)
    .mount('#app');
