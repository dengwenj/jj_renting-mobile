import request from '@utils/request'

// 根据城市名称查询该城市信息
export const cityInfo = (params) => {
  return request({
    method: 'GET',
    url: '/area/info',
    params,
  })
}

// 获取城市列表数据
export const getCityList = () => {
  return request({
    method: 'GET',
    url: '/area/city',
    params: {
      level: 1,
    },
  })
}

// 获取热门城市数据
export const getHotCity = () => {
  return request({
    method: 'GET',
    url: '/area/hot',
  })
}

// 查询房源数据
export const getHouseData = (id) => {
  return request({
    method: 'GET',
    url: '/area/map',
    params: {
      id,
    },
  })
}

// 小区关键词查询 /area/community
export const communitySearch = (name, id) => {
  return request({
    method: 'GET',
    url: '/area/community',
    params: {
      name,
      id,
    },
  })
}
