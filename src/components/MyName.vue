<template>
  <h1>Enter you name</h1>
  <div>
    {{ firstName }} <span
      style="color: red;"
      class="card"
    > {{ lastName }} </span>
  </div>
</template>  

<script>
export default {
  name: 'MyName',
  data: () => ({
    firstName: 'Andrey',
    lastName: 'Kizya'
  })
};
</script>

<style scoped>

</style>