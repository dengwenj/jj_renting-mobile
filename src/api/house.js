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
