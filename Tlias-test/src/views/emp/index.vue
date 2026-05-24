<script setup>
import { getEmpList } from '@/api/emp'
import { onMounted, ref } from 'vue'

const emps = ref({
  code: null,
  data: {
    rows: []
  },
  msg: null
})


onMounted(async () => {
  emps.value = await getEmpList()
  console.log(emps.value)
})
</script>

<template>
  <div>
    <div v-for="emp in emps.data.rows" :key="emp.id">
      {{ emp.name }}
    </div>
  </div>
</template>

<style scoped>

</style>
