import request from '@/utils/axios'

// 获取员工列表
export function getEmpList() {
  return request.get('/emps')
}


