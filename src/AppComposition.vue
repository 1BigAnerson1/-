<template>
  <AppHeader>
    Todo App
    <template #sub-header>
      <span v-if="user">created by {{ user.name }}}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>
  <input
    ref="domInput"
    v-model="inputText"
    @keyup.enter="canAddItemToTheList && onInputEnterKeyUp()"
  >
  <div>
    List:
    <span v-if="todos.length"> ({{ todos.length }})</span>
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

<script>
import TodoItem from './components/Todoitem.vue';
import AppHeader from './AppHeader.vue';

const LOCAL_KEY_TODOS = 'todo';
const LOCAL_KEY_INPUT_TEXT = 'input_text';

let todoStopWatch;

export default {
  components: {AppHeader, TodoItem},
  data: () => ({
    inputText: '',
    todos: []
  }),
  computed: {
    canAddItemToTheList () {
      return this.inputText?.length > 0;
    },
    getTodoCount() {return this.todos.length > 3 ? 'many': this.todos.length;},
    todoText() { return this.inputText?.trim(); }
  },
  created() {
    const rawTodos = localStorage.getItem(LOCAL_KEY_TODOS);
    console.log ('created', this.todos);
    if (rawTodos){
      this.todos = JSON.parse(rawTodos);
    }
    this.inputText = JSON.parse(localStorage.getItem(LOCAL_KEY_INPUT_TEXT) || '""');

    todoStopWatch = this.$watch ( () => this.todos, (value) => {
      console.log('> App -> watch: todos=', value);
      localStorage.setItem(LOCAL_KEY_TODOS, JSON.stringify(value));
    },  {deep: true});
    this.$watch ( () =>this.inputText, (value) => {
      console.log('> App -> watch: inputText =', value);
      localStorage.setItem(LOCAL_KEY_INPUT_TEXT, JSON.stringify(value));
    });
  },
  unmounted() {
    todoStopWatch();
    todoStopWatch = null;
  },
  mounted() {
    console.log('> App -> mounted', this.$refs.domInput);
  },
  methods: {
    onInputEnterKeyUp() {
      console.log('> App -> onInputEnterKeyUp:', this.inputText);
      this.todos.push(this.inputText);
      this.inputText ='';
    },
    onDeleteTodo(index){
      console.log ('> App -> onDeleteTodo: index = ', index);
      this.todos.splice(index,1);
    }
  },
};
</script>

