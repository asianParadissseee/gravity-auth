<script setup lang="ts">
import {storeToRefs} from "pinia";

const email = ref("")
const {actions: userActions} = useUsersStore()
const {errorMessage} = storeToRefs(useUsersStore())

</script>

<template>
  <div class="h-svh flex justify-center items-center">
    <login-layout title="Забыли пароль ?" @submit="userActions.handleForgotPassword({email})">
      <div>
        <u-input
            class="border-b p-1 w-full border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
            v-model="email" type="email" placeholder="Email"/>
      </div>
      <p class="text-red-500 font-semibold my-3">
        {{ errorMessage }}
      </p>
    </login-layout>
  </div>
</template>

<style scoped lang="scss">

</style>