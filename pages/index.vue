<script setup lang="ts">
import type {UserLoginDto} from "~/shared/types/user";
import {useUsersStore} from "~/stores/users.store";
import {storeToRefs} from "pinia";

const user = ref<UserLoginDto>({
  email: "",
  password: "",
})
const {actions: userActions} = useUsersStore()
const {errorMessage} = storeToRefs(useUsersStore())

</script>

<template>
  <div class="h-svh flex items-center">
    <login-layout title="Авторизация" @submit="userActions.handleLogin(user)">
      <div class="flex flex-col gap-3">
        <u-input
            v-model="user.email"
            type="email"
            placeholder="Email"
            class="border-b p-1 border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
        />

        <u-input
            v-model="user.password"
            type="password"
            placeholder="Password"
            class="border-b p-1 border-gray-400 focus:border-black focus:ring-0 focus:outline-none"
        />
      </div>
      <p class="text-red-500 my-2 font-semibold">
        {{ errorMessage }}
      </p>
    </login-layout>
  </div>
</template>

<style scoped lang="scss">

</style>