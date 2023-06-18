import {defineStore} from 'pinia';

interface IUserState {
    user?: IUser
}

export const useUserStore = defineStore('user', {
    state: (): IUserState => ({ }),
    getters: {
        hasUser: (state) => !!state.user?.name,
        // getTodosCount: (state) => state.todos.length,
    },
    actions: {
        // createTodo(todoText) {
        //     console.log('> useTodosStore -> createTodo: ', { todoText });
        //     this.todos.push(todoText);
        // },
    },
    persist: true
});
