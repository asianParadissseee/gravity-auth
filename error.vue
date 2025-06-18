<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div>
    Sorry bro error, please try again later.
    <p>
      {{props.error}}
    </p>
  </div>
</template>



<style lang="scss" scoped>

</style>