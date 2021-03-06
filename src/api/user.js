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

// 房屋是否收藏 /user/favorites/{id}
export const houseFavorites = (id) => {
  return request({
    method: 'GET',
    url: `/user/favorites/${id}`,
  })
}

// 添加收藏
export const addFavorites = (id) => {
  return request({
    method: 'POST',
    url: `/user/favorites/${id}`,
  })
}

// 删除收藏
export const removeFavorites = (id) => {
  return request({
    method: 'DELETE',
    url: `/user/favorites/${id}`,
  })
}

// 查看已发布房源列表
export const fabuHouse = () => {
  return request({
    method: 'GET',
    url: '/user/houses',
  })
}

// 发布房源
export const releaseHouse = (data) => {
  return request({
    method: 'POST',
    url: '/user/houses',
    data,
  })
}
