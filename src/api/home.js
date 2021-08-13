import request from '../utils/request'

// 获取轮播图
export const getSwiper = () => {
  return request({
    method: 'GET',
    url: '/home/swiper',
  })
}

// 租房小组
export const rentingGroups = () => {
  return request({
    method: 'GET',
    url: '/home/groups',
    params: {
      area: 'AREA%7C88cff55c-aaa4-e2e0',
    },
  })
}

// 最新资讯
export const newNews = () => {
  return request({
    method: 'GET',
    url: '/home/news',
    params: {
      area: 'AREA|88cff55c-aaa4-e2e0',
    },
  })
}
