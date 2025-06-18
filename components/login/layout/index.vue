<script setup lang="ts">


const rememberMe = ref(true);
</script>

<template>
  <div class="max-w-md w-full mx-auto">
    <h1 class="text-center text-3xl font-semibold ">
      Gravity
    </h1>
    <p class="text-center">
      Авторизация
    </p>
    <div class="mt-5">
      <slot></slot>
    </div>
    <div class="mt-3 flex items-center justify-between">
      <label class="flex items-center space-x-2 cursor-pointer">
        <u-checkbox v-model="rememberMe" />
        <span class="text-sm text-gray-700">Запомнить</span>
      </label>
      <nuxt-link to="/forgot-password" class="text-indigo-400">
        Забыли пароль ?
      </nuxt-link>
    </div>
    <div class="mt-5 flex flex-col items-center gap-4">
      <u-button class="bg-black/80 rounded flex justify-center items-center text-center py-2 text-white w-full">Войти
      </u-button>
      <p class="text-gray-500/40">или</p>
      <nuxt-link to="/sign-up" class="text-indigo-400">Пройти регистрацию</nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>