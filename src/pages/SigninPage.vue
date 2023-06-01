<script setup>
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';
import PROVIDE from '@/constants/provides.js';
import {inject, ref} from 'vue';

const pb = inject (PROVIDE.PB);
const isSuccess = ref(false);

const onLogin = (dto) => {
  pb.collection('users').authWithPassword(
      dto.username,
      dto.password,
  ).then(() => {
    isSuccess.value = true;
  });
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
