import './style.css';
import { createApp } from 'vue';
import router from './router.js';

import AppComposition from './AppComposition.vue';

createApp(AppComposition)
    .use(router)
    .mount('#app');
