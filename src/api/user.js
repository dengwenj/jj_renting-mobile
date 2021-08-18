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

// 获取用户的信息资料
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/user',
  })
}

// 用户退出
export const userLogout = () => {
  return request({
    method: 'POST',
    url: '/user/logout',
  })
}
