<script setup>
import { getEmpList, getEmpById, addEmp, delEmp, updateEmp } from '@/api/emp'
import { onMounted, ref, watch,  } from 'vue'

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

// 弹窗
const dialogVisible = ref(false)
const dialogTitle = ref('添加员工')

const employee = ref({
  id: 0,
  username: 'teddi',
  name: '哲迪君',
  gender: '1',
  phone: '1234446666',
  job: '教研主管',
  salary: '12000',
  deptName: '宣传部',
  entryDate: '2026-05-05',
  image: '',
  exprList: [{
    id: 1,
    begin: '2026-05-14',
    end: '2026-06-18',
    company: '12312',
    job: '567yey',
    date: []
  }],
})
watch(
  () => employee.value.exprList,
  (list) => {
    console.log(1)
    list.forEach((newItem) => {
      if (newItem.date && newItem.date.length === 2) {
        // 把 date 数组 → 赋值给 begin 和 end
        newItem.begin = newItem.date[0]
        newItem.end = newItem.date[1]
      }
    })
  },
  { deep: true } // 必须加 deep
)

// 监听查询日期范围变化
const dateChange = ref([])
watch(() => dateChange.value, (newVal, oldVal) => {
  if (newVal.length > 0) {
    employee.value.entryDate = newVal[0]
    employee.value.end = newVal[1]
  }
})

const formLabelWidth = '120px'

// 更新员工信息
const subEmployee = async () => {
  let res = {}
  if (dialogTitle.value === '添加员工') {
    res = await addEmp(employee.value)
  } else {
    res = await updateEmp(employee.value)
  }
  console.log(res)
  dialogVisible.value = false
  onSubmit()
}

// 刷新员工列表
const onSubmit = async () => {
  console.log('submit!')
  const res = await getEmpList(params.value)
  emps.value.data = res.data
  console.log(res)
}

const onClear = () => {
  params.value.name = ''
  params.value.gender = ''
  params.value.begin = ''
  params.value.end = ''
  params.value.date = []
  onSubmit()
}


// 监听日期范围变化
watch(() => params.value.date, (newVal, oldVal) => {
  if (newVal.length > 0) {
    params.value.begin = newVal[0]
    params.value.end = newVal[1]
  }
}, { deep: true })

// 监听工作经历变化
watch(() => employee.value.exprList, (newVal, oldVal) => {
  if (newVal.length > 0) {
    newVal.forEach((item, index) => {
      item.id = index + 1
    })
  }
}, { deep: 1 })// 监听工作经历变化，更新ID

// 分页检查模块
const handleSizeChange = () => {
  onSubmit()
}
const handleCurrentChange = () => {
  onSubmit()
}

// 图片上传模块
const handleAvatarSuccess = (res, file) => {
  console.log('上传成功', res, file)
  employee.value.image = res.data
}
const beforeAvatarUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  // 检查文件大小
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isImage) {
    ElMessage.error('只能上传图片！')
  }
  if (!isLt2M) {
    ElMessage.error('图片不能超过 2MB！')
  }
  
  return isImage && isLt2M
}

// 添加员工
const addEmployee = async () => {
  dialogTitle.value = '添加员工'
  employee.value = {
    username: '',
    name: '',
    gender: '',
    phone: '',
    job: '',
    salary: '',
    deptName: '',
    entryDate: '',
    image: '',
    exprList: []
  }
  dialogVisible.value = true
}

// 批量删除员工
const delEmployee = async (ids) => {
  console.log(ids)
  const res = await delEmp(ids)
  console.log(res)
  onSubmit()
}

// 添加工作经历
const addExperience = () => {
  employee.value.exprList.push({
    id: 0,
    begin: '',
    end: '',
    company: '',
    job: '',
    date: []
  })
}

// 根据ID获取员工详情
const handleEdit = async (id) => {
  console.log(id)
  const res = await getEmpById(id)
  console.log(res)
  employee.value = res.data
  dialogTitle.value = '修改员工'
  dialogVisible.value = true
  employee.value.exprList.forEach((item) => {
    item.date = [item.begin, item.end]
  })
}

//// 删除工作经历
const removeExperience = (index) => {
  employee.value.exprList.splice(index, 1)
}



// 初始化时查询员工列表
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
      表单数据
      {{ params }}
    </span>
    <br>
    <span>
      弹窗数据
      {{ form }}
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

    <!-- 添加员工和删除员工的按钮 -->
    <el-button type="primary" @click="addEmployee">+  添加员工</el-button>
    <el-button type="danger" @click="delEmployee">-  删除员工</el-button>

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
      <el-table-column prop="image" label="头像" width="90" >
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
            @click="handleEdit(scope.row.id)"
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

    <!-- 弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <span>
        {{ employee }}
      </span>
      <el-form :model="employee" label-width="80px">
        <!-- 基本信息 -->
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名">
              <el-input v-model="employee.username" placeholder="请输入员工用户名，2-20个字"></el-input>
            </el-form-item>
          </el-col>
           
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="employee.name" placeholder="请输入员工姓名，2-10个字"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
 
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别">
              <el-select v-model="employee.gender" placeholder="请选择性别" style="width: 100%;">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
 
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="employee.phone" placeholder="请输入员工手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
 
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="职位">
              <el-select v-model="employee.job" placeholder="请选择职位" style="width: 100%;">
                <el-option label="班主任" value="1"></el-option>
                <el-option label="讲师" value="2"></el-option>
                <el-option label="学工主管" value="3"></el-option>
                <el-option label="教研主管" value="4"></el-option>
                <el-option label="咨询师" value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="薪资">
              <el-input v-model="employee.salary" placeholder="请输入员工薪资"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
 
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="所属部门">
              <el-select v-model="employee.deptName" placeholder="请选择部门" style="width: 100%;">
                <el-option label="研发部" value="1"></el-option>
                <el-option label="市场部" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入职日期">
              <el-date-picker v-model="employee.entryDate" type="date" style="width: 100%;" placeholder="选择日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
 
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="/api/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                >
                <img v-if="employee.image && employee.image !== ''" :src="employee.image" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
         
 
        <!-- 工作经历 -->
        <!-- 第六行 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="工作经历">
              <el-button type="success" size="small" @click="addExperience">+ 添加工作经历</el-button>
            </el-form-item>
          </el-col>
        </el-row>
         
        <!-- 第七行 ...  工作经历 -->
        <div v-for="(item, index) in employee.exprList" :key="index">
          <el-row :gutter="3" :key="index">
            <el-col :span="10">
              <el-form-item size="small" label="时间" label-width="80px">
                <el-date-picker type="daterange" v-model="item.date" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="YYYY-MM-DD" value-format="YYYY-MM-DD"  style="width: 100%;" ></el-date-picker>
              </el-form-item>
            </el-col>
  
            <el-col :span="6">
              <el-form-item size="small" label="公司" label-width="60px">
                <el-input v-model="item.company" placeholder="请输入公司名称"></el-input>
              </el-form-item>
            </el-col>
  
            <el-col :span="6">
              <el-form-item  size="small" label="职位" label-width="60px">
                <el-input v-model="item.job"  placeholder="请输入职位"></el-input>
              </el-form-item>
            </el-col>
  
            <el-col :span="2">
              <el-form-item size="small" label-width="0px">
                <el-button type="danger" size="small" @click="removeExperience(index)">- 删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>

        </div>
      </el-form>
       
      <!-- 底部按钮 -->
      <!-- 第八行 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="subEmployee">保存</el-button>
        </span>
      </template>
    
    </el-dialog>
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

.avatar {
  height: 40px;
}
.avatar-uploader .avatar {
  width: 78px;
  height: 78px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
 
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
 
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  text-align: center;
  border-radius: 10px;
  /* 添加灰色的虚线边框 */
  border: 1px dashed var(--el-border-color);
}
</style>