import request from '../utils/request'

// 获取轮播图
export const getSwiper = () => {
  return request({
    method: 'GET',
    url: '/home/swiper',
  })
}
