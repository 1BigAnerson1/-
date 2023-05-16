<script setup>
import  {onMounted} from 'vue';


const props = defineProps( {
  index: {
 type:Number,
  default: 0
   },
 text: {
 type: String,
 default: '-'
 }
});
defineEmits(['delete']);
onMounted (() => {
  console.log ('> TodoItem -> props.text =', props.text);
});
</script>
<template>
  <div>
    ({{ index }}) {{ text }}
    <button @click="$emit('delete')">
      x
    </button>
  </div>
</template>

<!--<script>-->
<!--export default {-->
<!--  name: 'TodoItem',-->
<!--  props: {-->
<!--    index: {-->
<!--      type:Number,-->
<!--      default: 0-->
<!--    },-->
<!--    text: {-->
<!--      type: String,-->
<!--      default: '-'-->
<!--    }-->
<!--  },-->
<!--  emits: ['delete']-->
<!--};-->

<!--</script>-->
<style scoped>

</style>