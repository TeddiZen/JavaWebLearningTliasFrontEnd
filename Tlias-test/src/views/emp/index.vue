<script setup>
import { getEmpList } from '@/api/emp'
import { onMounted, ref, watch } from 'vue'

const params = ref({
  page: 1,
  pageSize: 10,
  name: '',
  gender: '',
  begin: '',
  end: '',
  date: []
})

const emps = ref({
  data: {
    rows: []
  }
})

const onSubmit = async () => {
  console.log('submit!')
  emps.value = await getEmpList(params.value)
  console.log(emps.value)
}

const onClear = () => {
  params.value.name = ''
  params.value.gender = ''
  params.value.begin = ''
  params.value.end = ''
  params.value.date = []
  onSubmit()
}



watch(() => params.value.date, (newVal, oldVal) => {
  if (newVal.length > 0) {
    params.value.begin = newVal[0]
    params.value.end = newVal[1]
  }
}, { deep: true })

watch(() => params.value.page, () => {
  onSubmit()
})

watch(() => params.value.pageSize, () => {
  onSubmit()
})

onMounted(async () => {
  onSubmit()
})

</script>

<template>
  <div id="empIndex">
    <div>
      <h2>员工管理</h2>
    </div>
    <span>
      {{ params }}
    </span>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item style="width: 200px;" label="姓名">
        <el-input v-model="params.name" placeholder="请输入姓名" clearable />
      </el-form-item>
      <el-form-item style="width: 200px;" label="性别" width="300">
        <el-select
          v-model="params.gender"
          placeholder="请选择性别"
          clearable
        >
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <el-date-picker
          v-model="params.date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          :default-time="defaultTime"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      ref="multipleTableRef"
      :data="emps.data.rows"
      row-key="id"
      class="emp-table"
      @selection-change="handleSelectionChange"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <el-table-column type="selection" :selectable="selectable" width="55" />
      <!-- @vue-generic {User} -->
      <el-table-column prop="id" label="ID" width="50" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="image" label="头像" width="80" >
        <template #default="scope">
          <img v-if="scope.row.image" :src="scope.row.image" alt="" style="width: 40px; height: 40px; border-radius: 10%;" />
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="80" >
        <template #default="scope">
          {{ scope.row.gender === 1 ? '男' : '女' }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120" />
      <el-table-column prop="job" label="职务" width="120" />
      <el-table-column prop="salary" label="工资" width="100" />
      <el-table-column prop="deptName" label="部门" width="120" />
      <el-table-column prop="entryDate" label="入职日期"  />
      <el-table-column prop="updateTime" label="最后操作日期" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button 
            size="small"
            type="primary"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="danger"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="params.page"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="emps.data.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    
  </div>
</template>

<style lang="less" scoped>
.emp-table {
  margin-top: 20px;
  border: 1px solid #ccc;
}

.pagination {
  margin-top: 20px;
}
</style>
