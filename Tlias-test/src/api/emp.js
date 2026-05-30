import request from '@/utils/axios'

// 获取员工列表
export function getEmpList(params) {
  console.log(params)
  return request.get('/emps' ,
    {params : params}
  )
}

export function getEmpById(id) {
  console.log(id)
  return request.get('/emps/' + id)
}
