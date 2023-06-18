<script setup lang="ts">
defineProps({
  links: {
    type: Array,
    default: () => [],
    required: true
  }
  });
</script>
<template>
  <div style="margin: 2rem 0;">
    <template
      v-for="menuItem in links"
      :key="menuItem.name"
    >
      <router-link
        v-if="menuItem.canRender"
        :to="menuItem.link"
        @click="menuItem.onClick"
      >
        {{ menuItem.name }}
      </router-link>
    </template>
  </div>
</template>
