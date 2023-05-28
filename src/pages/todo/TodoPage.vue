<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import TodoItem from '../../components/TodoItem.vue';
import {parseLocalStorage, saveToLocalStorage} from '../../storageUtils.js';
import {useTodosStore} from '../../store/todosStore.js';
import {storeToRefs} from 'pinia';

const LOCAL_KEY_INPUT_TEXT = 'input_text';

const inputText = ref(parseLocalStorage(LOCAL_KEY_INPUT_TEXT, ''));

const todoStore = useTodosStore();

const { todos, getTodosCount } = storeToRefs(todoStore);

const canAddItemToTheList = computed (() => true);
const getTodoText = computed(()=> inputText.value?.trim());

const onInputEnterKeyUp = () => {
  console.log('>TodosPage -> onInputEnterKeyUp:', getTodoText.value);
  todoStore.createTodo(getTodoText.value);
  inputText.value = '';
};

const onDeleteTodo = (index) => {
  console.log ('>TodoItem -> onDeleteTodo:', index);
  todoStore.deleteTodoByIndex(index);
};

watch(inputText,(value) => saveToLocalStorage(LOCAL_KEY_INPUT_TEXT, value));

</script>
<template>
  <input
    ref="domInput"
    v-model="inputText"
    @keyup.enter="canAddItemToTheList && onInputEnterKeyUp()"
  >
  <div>
    List:
    <span v-if="todos.length">
      ({{ getTodosCount }})
    </span>
    <span v-else>empty</span>
    <template
      v-for="(item, index) in todos"
      :key="item"
    >
      <TodoItem
        :index="index + 1"
        :text="item"
        @delete="onDeleteTodo(index)"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: 'TodosPage'
};
</script>