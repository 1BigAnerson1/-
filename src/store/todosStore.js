import {ref} from 'vue';
import {parseLocalStorage} from '../storageUtils.js';

const LOCAL_KEY_TODOS = 'todos';

const todos = ref(parseLocalStorage(LOCAL_KEY_TODOS, []));

export { todos };