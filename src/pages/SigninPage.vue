<script setup lang="ts">
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';
import {useQuery} from "@vue/apollo-composable";
import {ref} from 'vue';
import {useLazyQuery} from "@vue/apollo-composable";
import gql from 'graphql-tag';

const isSuccess = ref(false);

const { onError, load } = useLazyQuery (gql query GetUserWithCredentials($username: String, $password: String) {
  user(where: {name: {_eq: $username}, password: {_eq: $password}}) {
    name
    password
    id
  }
}
);

onResult((result) => {
  console.log('result', result);
  if (!result.loading) {
    if (result.data.user.length === 1) {
      userStore.setupUser(result.data.user[0]);
      isSuccess.value = true;
    }
  }
});
onError((error) => {
  console.log(error);
});

const onLogin = (dto: any) => {
  load(null, dto);
};

const onLogin = (dto: any) => {
  // pb.collection('users').authWithPassword(
  //     dto.username,
  //     dto.password,
  // ).then(() => {
  //   isSuccess.value = true;
  // });
};

</script>
<template>
  <div v-if="!isSuccess">
    <RegistrationForm @login="onLogin" />
    <router-link :to="ROUTES.SIGNUP">
      SignUp
    </router-link>
  </div>
  <div v-else>
    <div>You have been successfully login</div>
    <router-link to="ROUTES.INDEX">
      Home
    </router-link>
  </div>
</template>
