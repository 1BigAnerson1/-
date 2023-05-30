<script setup>
import RegistrationForm from '@/components/RegistrationForm.vue';
import ROUTES from '@/constants/routes.js';
</script>
<template>
  <div>
    <RegistrationForm />
    <router-link
      :to="ROUTES.SIGNUP"
    >
      SignUp
    </router-link>
  </div>
</template>
