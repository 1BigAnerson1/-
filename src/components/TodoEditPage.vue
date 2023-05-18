<script setup>
import  {onMounted, ref} from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute ();

const status = ref(null);

const onSelectChange = ({ target }) => {
  console.log('> TodoEditPage -> onSelectChange: ', target.value);
  status.value = target.value;
};

onMounted( () => {
  console.log('route.params.id -> onSelectChange:', route.params.id);
});

</script>
<template>
  <div>
    <div>Todo Edit Page {{ route.params.id }}</div>
    <select
      name="status"
      @change="onSelectChange"
    >
      <option
        v-if="!status"
        value="unselected"
        selected
      >
        Unselected
      </option>
      <option
        v-for="item in ['Ready', 'Start', 'Stop']"
        :key="item"
        :value="item"
        :selected="item === status"
      >
        {{ item }}
      </option>
      <div />
    </select>
  </div>
</template>
