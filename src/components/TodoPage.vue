<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import TodoItem from './TodoItem.vue';
import {parseLocalStorage, saveToLocalStorage} from '../storageUtils.js';
import {todos} from '../store/todosStore.js';

const LOCAL_KEY_TODOS = 'todo';
const LOCAL_KEY_INPUT_TEXT = 'input_text';

const user = ref( {name: 'Anderson' });
const inputText = ref(parseLocalStorage(LOCAL_KEY_INPUT_TEXT, ''));

const canAddItemToTheList = computed (() => true);
const getTodoText = computed(()=> inputText.value?.trim());

const onInputEnterKeyUp = () => {
  console.log('>TodoItem -> onInputEnterKeyUp:', getTodoText.value);
  todos.value.push(getTodoText.value);
  inputText.value = '';
};

const onDeleteTodo = (index) => {
  console.log ('>TodoItem -> onDeleteTodo:', index);
  todos.value.splice(index, 1);
};

watch(inputText,(value) => saveToLocalStorage(LOCAL_KEY_INPUT_TEXT, value));
watch(todos, (value) => saveToLocalStorage(LOCAL_KEY_TODOS, value), {deep: true});

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
      ({{ todos.length }})
    </span>
    <span v-else> empty</span>
    <TodoItem
      v-for="(item, index) in todos"
      :key="item"
      :index="index + 1"
      :text="item"
      @delete="onDeleteTodo(index)"
    />
  </div>
</template>

