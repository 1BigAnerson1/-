<script setup>
import {computed, reactive, ref} from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import ROUTES from '@/constants/routes.js';
import AppMenu from '@/pages/AppMenu.vue';
import gql from 'graphql-tag';
import {useQuery} from '@vue/apollo-composable';
import {useRoute} from "vue-router";
import {useUserStore} from "@/store/userStore";
import {storeToRefs} from "pinia";

const userStore = useUserStore();
const {user, hasUser } = storeToRefs(useUserStore);

const { result: usersData, loading: isUserLoading } = useQuery(gql`
  query getUsers {
    user {
      id
      name
    }
  }
`);

const checkRouteIsNotCurrent = (rouutPath: any) => useRoute().path !== rouutPath;

const menuLinks = reactive([
  { name: 'Index', link: ROUTES.INDEX, canRender: computed(() => checkRouteIsNotCurrent(ROUTES.INDEX)) },
  { name: 'Books', link: ROUTES.BOOKS, canRender: computed(() => hasUser.value && checkRouteIsNotCurrent(ROUTES.BOOKS)) },
  { name: 'Sign In', link: ROUTES.SIGNIN, canRender: computed(() => !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNIN)) },
  { name: 'Sign Out', link: ROUTES.INDEX, canRender: computed(() => hasUser.value), onClick: () => {
      console.log('SignOUT');
    },
  }
]);

</script>
<template>
  <AppHeader>
    Todo App
    <div v-if="isUserLoading">
      Users Loading
    </div>
    <div v-else>
      {{ usersData.user }}
    </div>
    <template #sub-header>
      <span v-if="hasUser">created by {{ user.name }}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>
  <AppMenu
    :links="menuLinks"
  />
  <router-view />
</template>