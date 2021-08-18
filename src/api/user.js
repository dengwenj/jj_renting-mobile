import request from '@utils/request'

// 用户登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data,
  })
}

// 用户注册
export const registe = (data) => {
  return request({
    method: 'POST',
    url: '/user/registered',
    data,
  })
}
