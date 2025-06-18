<script setup lang="ts">
import {storeToRefs} from "pinia";
import type {UserResetPasswordDto} from "#shared/types/user";

const user = ref<UserResetPasswordDto>({
  newPassword: "",
  code: "",
  email: "",
})
const {actions: userActions} = useUsersStore()
const {errorMessage} = storeToRefs(useUsersStore())
</script>

<template>
  <div class="h-svh flex justify-center items-center">
    <login-layout title="Сброс пароля" @submit="userActions.handleResetPassword(user)">
      <div class="flex items-center flex-col gap-3">
        <u-input
            class="border-b p-1 w-full border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
            v-model="user.code" placeholder="Введите код" type="number"/>
        <u-input
            class="border-b p-1 w-full border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
            v-model="user.email" placeholder="Введите почту" type="email"/>
        <u-input
            class="border-b p-1 w-full border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
            v-model="user.newPassword" placeholder="Введите новый пароль" type="text"/>
      </div>
      <p class="text-red-500 font-semibold my-3">
        {{ errorMessage }}
      </p>
    </login-layout>
  </div>
</template>

<style scoped lang="scss">

</style>