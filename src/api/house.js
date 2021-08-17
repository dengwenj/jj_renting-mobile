import request from '@utils/request'

// 根据条件查询房屋
export const getHousesList = (params) => {
  return request({
    method: 'GET',
    url: '/houses',
    params,
  })
}

// 获取房屋查询条件
export const getHouseFind = (id) => {
  return request({
    method: 'GET',
    url: '/houses/condition',
    params: {
      id,
    },
  })
}
