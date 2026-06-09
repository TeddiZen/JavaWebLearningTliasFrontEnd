<script setup>
import { Promotion, User, Setting, HelpFilled } from '@element-plus/icons-vue'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { useCounterStore } from '@/stores/counter'

//export const useCounterStore = defineStore('counter', () => {
//  let userName = ref('')
//  return { userName }
// })
// 以上为我定义的pinia store，帮我联动到userName的显示
const counterStore = useCounterStore()

const logout = () => {
  console.log(localStorage.getItem('loginToken'))
  localStorage.removeItem('loginToken')
  ElMessage.success('退出登录成功')
  router.push('/login')
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- Header 区域 -->
      <el-header class="header">
        <span class="title">Tlias智能学习辅助系统</span>
        <span class="right_tool">
          <a href="">
            <el-icon><EditPen /></el-icon> 修改密码 &nbsp;&nbsp;&nbsp; |  &nbsp;&nbsp;&nbsp;
          </a>
          <a @click="logout">
            <el-icon><SwitchButton /></el-icon> 退出登录 【{{ counterStore.userName }}】
          </a>
        </span>
      </el-header>
      
      <el-container>
        <!-- 左侧菜单 -->
        <el-aside width="200px" class="aside">
          <el-menu
            class="el-menu-vertical-demo"
            router
          >
            <!-- 首页 -->
            <el-menu-item index="index">
              <el-icon><Promotion /></el-icon>
              <span>首页</span>
            </el-menu-item>
            
            <!-- 班级学员管理 -->
            <el-sub-menu index="classstu">
              <template #title>
                <el-icon><Users /></el-icon>
                <span>班级学员管理</span>
              </template>
              <el-menu-item index="clazz">
                <el-icon><HelpFilled /></el-icon>
                <span>班级管理</span>
              </el-menu-item>
              <el-menu-item index="stu">
                <el-icon><HelpFilled /></el-icon>
                <span>学员管理</span>
              </el-menu-item>
            </el-sub-menu>
            
            <!-- 系统信息管理 -->
            <el-sub-menu index="system">
              <template #title>
                <el-icon><Setting /></el-icon>
                <span>系统信息管理</span>
              </template>
              <el-menu-item index="dept">
                <el-icon><HelpFilled /></el-icon>
                <span>部门管理</span>
              </el-menu-item>
              <el-menu-item index="emp">
                <el-icon><HelpFilled /></el-icon>
                <span>员工管理</span>
              </el-menu-item>
            </el-sub-menu>
            
            <!-- 数据统计管理 -->
            <el-sub-menu index="report">
              <template #title>
                <el-icon><HelpFilled /></el-icon>
                <span>数据统计管理</span>
              </template>
              <el-menu-item index="empReport">
                <el-icon><HelpFilled /></el-icon>
                <span>员工信息统计</span>
              </el-menu-item>
              <el-menu-item index="stuReport">
                <el-icon><HelpFilled /></el-icon>
                <span>学员信息统计</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      
    </el-container>
  </div>
</template>

<style scoped>
.header {
  background-image: linear-gradient(to right, #00547d, #007fa4, #00aaa0, #00d072, #a8eb12);
}

.title {
  color: white;
  font-size: 40px;
  font-family: 楷体;
  line-height: 60px;
  font-weight: bolder;
}

.right_tool{
  float: right;
  line-height: 60px;
}

a {
  color: white;
  text-decoration: none;
}

.aside {
  width: 220px;
  border-right: 1px solid #ccc;
  height: 730px;
}
</style>