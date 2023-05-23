import {defineStore} from 'pinia';


export const useUserStore = defineStore('user', {
    state: () => ({ user: { name: 'Anderson'}, }),
    getters: {
        hasUser: (state) => !!state.user.name,
        },

    actions: {

    },
    persist: true
});
