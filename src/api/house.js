import request from '@utils/request'

// 根据条件查询房屋
export const getHousesList = (cityId) => {
  return request({
    method: 'GET',
    url: '/houses',
    params: {
      cityId,
    },
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
