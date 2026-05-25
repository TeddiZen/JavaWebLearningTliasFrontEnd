<script setup>
import { getEmpList } from '@/api/emp'
import { onMounted, ref, watch } from 'vue'

const emps = ref({
  code: null,
  data: {
    rows: []
  },
  msg: null
})

const formInline = ref({
  name: '',
  sex: '',
  date: [],
  begin: '',
  end: ''
})

const onSubmit = () => {
  console.log('submit!')
}

watch(() => formInline.value.date, (newVal, oldVal) => {
  if (newVal.length > 0) {
    formInline.value.begin = newVal[0]
    formInline.value.end = newVal[1]
  }
}, { deep: true })


onMounted(async () => {
  emps.value = await getEmpList()
  console.log(emps.value)
})
</script>

<template>
  <div id="empIndex">
    <div>
      <h2>员工管理</h2>
    </div>
    <span>
      {{ formInline }}
    </span>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item label="性别">
        <el-select
          v-model="formInline.sex"
          placeholder="请选择性别"
          clearable
        >
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <el-date-picker
          v-model="formInline.date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="onSubmit">清空</el-button>
      </el-form-item>
    </el-form>
    <div v-for="emp in emps.data.rows" :key="emp.id">
      {{ emp.name }}
    </div>
  </div>
</template>

<style scoped>

</style>
