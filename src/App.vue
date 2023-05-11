<script setup>
import MyName from './components/MyName.vue';
</script>

<template>
  <h3>Todo List</h3>
  <input
    v-model="inputText"
    @keyup.enter="canAddItemToTheList && onInputEnterKeyUp()"
  >
  <div>
    List:
    <div
      v-for="(item, index) in todos"
      :key="item"
    >
      ({{ index + 1 }}) {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    inputText: '',
    todos: []
  }),
  computed: {
    canAddItemToTheList () {
      return this.inputText?.length > 0;
    },
    todoText() { return this.inputText.trim();}
  },
  methods: {
    onInputEnterKeyUp() {
      console.log('> App -> onInputEnterKeyUp:', this.inputText),
      this.todos.push(this.inputText);
      this.inputText ='';
      }
    }
 };
</script>

<style scoped>
</style>
