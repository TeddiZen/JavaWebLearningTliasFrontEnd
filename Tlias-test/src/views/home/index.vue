<script setup>
import { ref } from 'vue'

const title = ref('首页')

</script>

<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
  h1 {
    color: red;
  }
</style>