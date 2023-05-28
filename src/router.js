import {createRouter, createWebHashHistory} from 'vue-router';
import ROUTES from './constants/routes.js';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: ROUTES.INDEX,
            component: () => import('./pages/IndexPage.vue')
        },
        {
            path: ROUTES.TODOS,
            component: () => import('./pages/todo/TodoPage.vue')
        },
        {
            path: ROUTES.TODOS_ID,
            component: () => import('./pages/todo/TodoEditPage.vue')
        },
        {
            name: 'Signin',
            path: ROUTES.SIGNIN,
            component: () => import('./pages/SigninPage.vue')
        },
    ],
});

router.beforeEach((to, from, next) => {
    console.log('> router -> beforeEach', to.path);
    const publicPages = ['/', '/signin'];
    const notAllowedNavigation = publicPages.indexOf(to.path) < 0 && !useUserStore().hasUser;
    if (notAllowedNavigation) next({path: '/signin'});
    else next();
});

export default router;