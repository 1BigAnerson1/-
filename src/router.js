import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./components/IndexPage.vue')
        },
        {
            path:'/todos',
            component: () => import('./components/TodoPage.vue')
        },
        {
            path: '/todos/:id',
            component: () => import('./components/TodoEditPage.vue')
        },
        {
            path: '/signin',
            component: () => import('./components/SigninPage.vue')
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