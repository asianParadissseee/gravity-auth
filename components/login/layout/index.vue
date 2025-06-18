<script setup lang="ts">


const rememberMe = ref(false);

interface Emits {
  (event: "submit"): void;
}

interface Props {
  title: string;
}

const {title} = defineProps<Props>()
const route = useRoute()


const isSignUp = computed(() => route.path.includes('sign-up'))

const labels = computed(() => ({
  action: isSignUp.value ? 'Пройти авторизацию' : 'Пройти регистрацию',
  actionPath: isSignUp.value ? '/' : '/sign-up',
  forgotPath: isSignUp.value ? '/sign-up' : '/',
}))
const emits = defineEmits<Emits>()
const isHiddenForgotPassword = computed(() =>
    route.path.includes('forgot-password') || route.path.includes('reset-password')
)
</script>

<template>
  <div class="max-w-md w-full mx-auto">
    <h1 class="text-center text-3xl tracking-[5px] font-semibold ">
      Gravity
    </h1>
    <div class="flex items-center w-full gap-4 text-gray-500/40 text-sm">
      <div class="flex-1 h-px bg-gray-300"></div>
      <span class="whitespace-nowrap">{{title}}</span>
      <div class="flex-1 h-px bg-gray-300"></div>
    </div>
    <form @submit.prevent="emits('submit')" class="mt-5">
      <div>
        <slot></slot>
      </div>
      <div v-if="!isHiddenForgotPassword" class="mt-3 flex items-center justify-between">
        <label class="flex items-center space-x-2 cursor-pointer">
          <u-checkbox class="border w-5 h-5" v-model="rememberMe"/>
          <span class="text-sm text-gray-700">Запомнить</span>
        </label>
        <nuxt-link to="/forgot-password" class="text-indigo-400">
          Забыли пароль ?
        </nuxt-link>
      </div>
      <div class="mt-5 flex flex-col items-center gap-4">
        <u-button :disabled="!rememberMe && !isHiddenForgotPassword" type="submit"
                  class="bg-black/80 disabled:opacity-60 cursor-pointer rounded flex justify-center items-center text-center py-2 text-white w-full">
          Войти
        </u-button>
        <div class="flex items-center w-full gap-4 text-gray-500/40 text-sm">
          <div class="flex-1 h-px bg-gray-300"></div>
          <span class="whitespace-nowrap">или</span>
          <div class="flex-1 h-px bg-gray-300"></div>
        </div>
        <nuxt-link :to="labels.actionPath" class="text-indigo-400">{{ labels.action }}</nuxt-link>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">

</style>