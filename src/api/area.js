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
