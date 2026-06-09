import request from '@/utils/axios'

// 获取员工列表
export function getEmpList(params) {
  console.log(params)
  return request.get('/emps' ,
    {params : params}
  )
}

// 根据ID获取员工详情
export function getEmpById(id) {
  console.log(id)
  return request.get('/emps/' + id)
}

export function updateEmp(employee) {
  console.log(employee)
  return request.put('/emps', employee)
}

// 删除员工
export function delEmp(ids) {
  console.log(ids)
  return request.delete('/emps', {
    params : {
      ids : ids
    }
  })
}

export function addEmp(employee) {
  console.log(employee)
  return request.post('/emps', employee)
}

// 登录
export function login(loginForm) {
  console.log(loginForm)
  return request.post('/login', loginForm)
} 
