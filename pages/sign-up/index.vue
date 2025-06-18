<script setup lang="ts">
import {storeToRefs} from "pinia";

const user = ref({
  email: '',
  name: "",
  password: ''
})
const {actions: userActions} = useUsersStore()
const {errorMessage} = storeToRefs(useUsersStore())
</script>

<template>
  <div class="h-svh flex items-center">
    <login-layout title="Регистрация" @submit="userActions.handleSignUp(user)">
      <div class="flex flex-col gap-2">
        <u-input
            class="border-b p-1 border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
            v-model="user.email" type="email" placeholder="Email"/>
        <u-input
            class="border-b p-1 border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
            v-model="user.name" type="name" placeholder="Name"/>
        <u-input
            class="border-b p-1 border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
            v-model="user.password" type="password" placeholder="Password"/>
      </div>
      <p class="text-red-500 my-2 font-semibold">
        {{ errorMessage }}
      </p>
    </login-layout>
  </div>
</template>

<style scoped lang="scss">

</style>