<script setup lang="ts">


onMounted(() => {
  document.body.style.background = 'radial-gradient(circle at top left, #e0d4ff, #fbe5e6, #ffffff)'
})
</script>

<template>
  <div class="h-svh flex justify-center items-center">
    <div class="flex justify-center flex-col items-center">
      <h1 class="text-6xl font-semibold">
        Добро пожаловать
      </h1>
      <p class="text-center mt-3 font-normal text-gray-700">
        Вы успешно вошли в систему. Теперь у вас есть доступ к <br> защищённым ресурсам и персонализированным настройкам.
        Ваши <br> данные надёжно защищены, а сеанс авторизации позволяет работать <br> с контентом без повторного ввода логина и пароля.
      </p>
      <div class="inline-flex items-center gap-2 mt-10">
        <UButton class="bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer">Начать работу</UButton>
        <UButton variant="link" class="px-4 py-2 cursor-pointer" trailing-icon="i-lucide-arrow-right" >Документация</UButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>